import firestore from '../../config/firebase';
import { isEmpty } from 'lodash';
const geofire = require('geofire-common');

const setNearbyStores = (stores) => ({
    type: 'SET_NEARBY_STORES',
    data: stores
});

export const startGetNearbyStores = () => {
    return (dispatch, getState) => {
        const location = getState().location;
        if(isEmpty(location)) {
            dispatch(setNearbyStores([]));
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

                    // We have to filter out a few false positives due to GeoHash
                    // accuracy, but most will match
                    const distanceInKm = geofire.distanceBetween([lat, lng], center);
                    const distanceInM = distanceInKm * 1000;
                    if (distanceInM <= 1000000) {
                        matchingDocs.push(doc);
                    }
                }
            }

            return matchingDocs;
        }).then(matchingDocs => {
            const nearbyStores = [];
            matchingDocs.forEach(matchingDoc => {
                nearbyStores.push({
                    id: matchingDoc.id,
                    ...matchingDoc.data()
                });
            });
            dispatch(setNearbyStores(nearbyStores));
        }).catch(error => {
            console.log(error);
        });
    };
};