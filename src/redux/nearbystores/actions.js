import firestore from '../../config/firebase';
import { isEmpty } from 'lodash';
import { setNearbyProducts } from '../nearbyproducts/actions';
const geofire = require('geofire-common');

const setNearbyStores = (stores) => ({
    type: 'SET_NEARBY_STORES',
    data: stores
});

export const startGetNearbyStores = () => {
    return (dispatch, getState) => {
        const location = getState().location;
        const uid = getState().user.uid;
        if(isEmpty(location)) {
            dispatch(setNearbyStores([]));
            dispatch(setNearbyProducts([]));
            return Promise.reject();
        }
        const center = [location.lat, location.lng];
        const bounds = geofire.geohashQueryBounds(center, 1000000);
        const promises = [];
        for (const b of bounds) {
            const q = firestore.collection('stores')
                .orderBy('hash')
                .startAt(b[0])
                .endAt(b[1]);
            promises.push(q.get());
        }
        // Collect all the query results together into a single list
        return Promise.all(promises).then((snapshots) => {
            const matchingDocs = [];

            for (const snap of snapshots) {
                for (const doc of snap.docs) {
                    const lat = doc.get('lat');
                    const lng = doc.get('lng');
                    const user = doc.get('user');

                    // We have to filter out a few false positives due to GeoHash
                    // accuracy, but most will match
                    const distanceInKm = geofire.distanceBetween([lat, lng], center);
                    const distanceInM = distanceInKm * 1000;
                    if (distanceInM <= 1000000 && user.uid !== uid) {
                        matchingDocs.push(doc);
                    }
                }
            }

            return matchingDocs;
        }).then(matchingDocs => {
            const nearbyStores = [], nearbyProductsPromises = [];
            matchingDocs.forEach(matchingDoc => {
                const store = {
                    id: matchingDoc.id,
                    ...matchingDoc.data()
                }
                nearbyStores.push(store);
                nearbyProductsPromises.push(getStoreProduct(store));
            });
            dispatch(setNearbyStores(nearbyStores));
            return Promise.all(nearbyProductsPromises);
        }).then(productsMatrix => {
            let products = [];
            for(let prods of productsMatrix) {
                products = products.concat(prods);
            }
            dispatch(setNearbyProducts(products));
        }).catch(error => {
            console.log(error);
        });
    };
};

const getStoreProduct = async (store) => {
    const querySnapshot = await firestore.collection(`/stores/${store.id}/products`).get();
    const products = [];
    querySnapshot.forEach(doc => {
        products.push({
            id: doc.id,
            ...doc.data(),
            store
        })
    })
    return products;
};