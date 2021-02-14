import firestore, { auth, storage } from '../../config/firebase';
import { getStoreProducts, startGetStoreProducts } from '../products/actions';
const geofire = require('geofire-common');

const setUserStore = (store) => ({
    type: 'SET_USER_STORE',
    data: store
});

export const startCreateUserStore = ({ name, address, description, location }, successCallback, errorCallback) => {
    return (dispatch) => {
        const lat = location.lat;
        const lng = location.lng;
        const hash = geofire.geohashForLocation([location.lat, location.lng]);
        const user = auth.currentUser;
        return firestore.collection('stores').add({
            name,
            address,
            description,
            lat,
            lng,
            hash,
            user: {
                uid: user.uid,
                email: user.email
            }
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
    return (dispatch) => {
        const user = auth.currentUser;
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
            dispatch(getStoreProducts(products));
        })
        .catch(error => {
            console.log(error);
            errorCallback();
        });
    };
};

export const startUpdateUserStore = ({ address, description, location }, successCallback, errorCallback) => {
    return (dispatch, getState) => {
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
export const startUploadPhotoUserStore = (photo, onSnapshot, onError, successCallback, errorCallback) => {
    return (dispatch, getState) => {
        const idStore = getState().store.id;
        const uploadTask = storage.ref(`/images/store/${idStore}`).put(photo);
        uploadTask.on('state_changed', onSnapshot, onError, () => {
            uploadTask.snapshot.ref.getDownloadURL().then(downloadURL => {
                const updates = {
                    url: downloadURL
                };
                firestore.collection('stores').doc(idStore).update(updates).then(() => {
                    dispatch(setUserStore(updates));
                    successCallback();
                }).catch(error => {
                    console.log(error);
                    errorCallback();
                })
            });
        })
    };
};