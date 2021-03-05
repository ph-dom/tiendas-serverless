import firestore, { timestamp } from '../../config/firebase';

const setStoreRequests = (requests) => ({
    type: 'SET_STORE_REQUESTS',
    data: requests
});

export const startGetStoreRequests = () => {
    return (dispatch, getState) => {
        const idStore = getState().store.id;
        if(!idStore) {
            dispatch(setStoreRequests([]));
            return () => null;
        }
        const unsubscribe = firestore.collection('requests')
        .where('store.id', '==', idStore)
        .onSnapshot(querySnapshot => {
            const storeRequests = [];
            querySnapshot.forEach(document => {
                storeRequests.push({
                    id: document.id,
                    ...document.data()
                });
            });
            dispatch(setStoreRequests(storeRequests));
        })
        return unsubscribe;
    };
};

export const startUpdateRequestStatus = (idRequest, status) => {
    return new Promise((resolve, reject) => {
        return firestore.collection('requests').doc(idRequest).update({
            status,
            updatedDate: timestamp.fromDate(new Date())
        }).then(() => {
            resolve();
        }).catch((error) => {
            console.log(error);
            reject(error);
        })
    });
};