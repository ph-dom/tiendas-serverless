import firestore, { storage } from '../../config/firebase';
import { getStoreProducts, startGetStoreProducts } from '../products/actions';
const geofire = require('geofire-common');

const setUserStore = (store) => ({
    type: 'SET_USER_STORE',
    data: store
});

export const startCreateUserStore = ({ name, address, description }, successCallback, errorCallback) => {
    return (dispatch, getState) => {
        const location = getState().location;
        const lat = location.lat;
        const lng = location.lng;
        const hash = geofire.geohashForLocation([location.lat, location.lng]);
        const user = getState().user;
        return firestore.collection('stores').add({
            name,
            address,
            description,
            lat,
            lng,
            hash,
            user
        })
        .then(documentRef => documentRef.get())
        .then(document => {
            const userStore = {
                id: document.id,
                ...document.data()
            };
            dispatch(setUserStore(userStore));
            successCallback();
        })
        .catch(error => {
            console.log(error);
            errorCallback();
        });
    };
};

export const startGetUserStore = (errorCallback) => {
    return (dispatch, getState) => {
        const user = getState().user;;
        return firestore.collection('stores')
        .where('user.uid', '==', user.uid)
        .get()
        .then(querySnapshot => {
            if (querySnapshot.size === 1) {
                const userStore = {
                    id: querySnapshot.docs[0].id,
                    ...querySnapshot.docs[0].data()
                }
                dispatch(setUserStore(userStore));
                return startGetStoreProducts(userStore.id);
            } else if (querySnapshot.size === 0) {
                dispatch(setUserStore({}));
            }
        })
        .then(products => {
            dispatch(getStoreProducts(products || []));
        })
        .catch(error => {
            console.log(error);
            dispatch(setUserStore({}));
            dispatch(getStoreProducts([]));
            errorCallback();
            
        });
    };
};

export const startUpdateUserStore = ({ address, description }, successCallback, errorCallback) => {
    return (dispatch, getState) => {
        const location = getState().location;
        const idStore = getState().store.id;
        const lat = location.lat;
        const lng = location.lng;
        const hash = geofire.geohashForLocation([location.lat, location.lng]);
        const updates = {
            address,
            description,
            lat,
            lng,
            hash
        };
        return firestore.collection('stores')
        .doc(idStore)
        .update(updates)
        .then(() => {
            dispatch(setUserStore(updates))
            successCallback();
        })
        .catch(error => {
            console.log(error);
            errorCallback();
        });
    };
};

/*
 * basado en https://firebase.google.com/docs/storage/web/upload-files
 */
export const startUploadPhotoUserStore = (photo, successCallback, errorCallback) => {
    let updates = {};
    return (dispatch, getState) => {
        const idStore = getState().store.id;
        return uploadStoreImage(idStore, photo).then(downloadUrl => {
            updates = {
                url: downloadUrl
            };
            return firestore.collection('stores').doc(idStore).update(updates);
        }).then(() => {
            dispatch(setUserStore(updates));
            successCallback();
        }).catch(error => {
            console.log(error);
            errorCallback();
        })
    };
};

const uploadStoreImage = (idStore, photo) => {
    return new Promise((resolve, reject) => {
        const uploadTask = storage.ref(`/images/store/${idStore}`).put(photo);
        uploadTask.on(
            'state_changed',
            undefined,
            () => {
                reject('Error al cargar imágen.')
            },
            () => {
                uploadTask.snapshot.ref.getDownloadURL().then(downloadURL => {
                    resolve(downloadURL);
                });
            }
        );
    });
};