import firestore, { fieldvalue } from '../../config/firebase';

export const setNearbyProducts = (products) => ({
    type: 'SET_NEARBY_PRODUCTS',
    data: products
});

const likeNearbyProduct = (idProduct, uid) => ({
    type: 'LIKE_NEARBY_PRODUCT',
    data: {
        idProduct,
        uid
    }
});

export const startLikeStore = (idStore, idProduct) => {
    return (dispatch, getState) => {
        const uid = getState().user.uid;
        return firestore.collection(`stores/${idStore}/products`).doc(idProduct).update({
            likes: fieldvalue.arrayUnion(uid)
        }).then(() => {
            dispatch(likeNearbyProduct(idProduct, uid));
        }).catch(error => {
            console.log(error);
        });
    };
};

const dislikeNearbyProduct = (idProduct, uid) => ({
    type: 'DISLIKE_NEARBY_PRODUCT',
    data: {
        idProduct,
        uid
    }
});

export const startDislikeStore = (idStore, idProduct) => {
    return (dispatch, getState) => {
        const uid = getState().user.uid;
        return firestore.collection(`stores/${idStore}/products`).doc(idProduct).update({
            likes: fieldvalue.arrayRemove(uid)
        }).then(() => {
            dispatch(dislikeNearbyProduct(idStore, uid));
        }).catch(error => {
            console.log(error);
        });
    };
};