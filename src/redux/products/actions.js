import firebaseApp, { timestamp } from '../../config/firebase';

const addStoreProduct = (product) => ({
    type: 'ADD_PRODUCT',
    data: product
});

export const startCreateStoreProduct = (product, successCallback, errorCallback) => {
    return (dispatch, getState) => {
        const idStore = getState().store.id;
        return firebaseApp.firestore()
        .collection(`/stores/${idStore}/products`)
        .add({
            ...product,
            creationDate: timestamp.fromDate(new Date())
        })
        .then(documentRef => documentRef.get())
        .then(document => {
            const storeProduct = {
                id: document.id,
                ...document.data()
            };
            dispatch(addStoreProduct(storeProduct));
            successCallback();
        })
        .catch(error => {
            console.log(error);
            errorCallback();
        });
    };
};

const updateStoreProduct = (idProduct, updates) => ({
    type: 'UPDATE_PRODUCT',
    data: {
        idProduct,
        updates
    }
});

export const startUpdateStoreProduct = (idProduct, updates, successCallback, errorCallback) => {
    return (dispatch, getState) => {
        const idStore = getState().store.id;
        return firebaseApp.firestore()
        .collection(`/stores/${idStore}/products`)
        .doc(idProduct)
        .update(updates)
        .then(() => {
            dispatch(updateStoreProduct(idProduct, updates));
            successCallback();
        })
        .catch(error => {
            console.log(error);
            errorCallback();
        });
    };
};

const deleteStoreProduct = (idProduct) => ({
    type: 'DELETE_PRODUCT',
    data: idProduct
});

export const startDeleteStoreProduct = (idStore, idProduct, successCallback, errorCallback) => {
    return (dispatch) => {
        return firebaseApp.firestore()
        .collection(`/stores/${idStore}/products`)
        .doc(idProduct)
        .delete()
        .then(() => {
            dispatch(deleteStoreProduct(idProduct));
            successCallback();
        })
        .catch(error => {
            console.log(error);
            errorCallback();
        });
    };
};

export const getStoreProducts = (products) => ({
    type: 'GET_PRODUCTS',
    data: products
});

export const startGetStoreProducts = (idStore) => {
    return new Promise((resolve, reject) => {
        return firebaseApp.firestore()
        .collection(`/stores/${idStore}/products`)
        .get()
        .then(snapshot => {
            if(snapshot.size > 0) {
                let products = [];
                snapshot.forEach(doc => {
                    products.push({
                        id: doc.id,
                        ...doc.data()
                    });
                });
                resolve(products);
            } else {
                resolve([]);
            }
        })
        .catch(error => {
            console.log(error);
            reject();
        });
    });
};