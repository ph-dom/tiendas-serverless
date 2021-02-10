import firebaseApp from '../../config/firebase';
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
        const user = firebaseApp.auth().currentUser;
        return firebaseApp.firestore().collection('stores').add({
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
        }).then(documentRef => {
            return documentRef.get();
        }).then(document => {
            const userStore = {
                id: document.id,
                ...document.data()
            };
            dispatch(setUserStore(userStore));
            successCallback();
        }).catch(error => {
            console.log(error);
            errorCallback();
        });
    };
};