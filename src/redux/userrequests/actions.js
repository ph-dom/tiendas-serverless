import firestore, { timestamp } from '../../config/firebase';
import { openModal } from '../modal/action';
import { openSnackbar } from '../snackbar/actions';
import requestStatus from '../../shared/requestStatus';

export const startAddUserRequest = (detail, total, store) => {
    return (dispatch, getState) => {
        const user = getState().user;
        return firestore.collection('requests').add({
            user,
            store,
            detail,
            total,
            status: requestStatus.CREATED,
            creationDate: timestamp.fromDate(new Date())
        })
        .then(documentRef => documentRef.get())
        .then(() => {
            dispatch(openSnackbar('Solicitud enviada.'));
        })
        .catch(error => {
            console.log(error);
            dispatch(openModal('Error al enviar solicitud. Vuelva a intentar.'));
        });
    };
};

const setUserRequests = (requests) => ({
    type: 'SET_USER_REQUESTS',
    data: requests
});

export const startGetUserRequests = () => {
    return (dispatch, getState) => {
        const uid = getState().user.uid;
        const unsubscribe =  firestore.collection('requests')
        .where('user.uid', '==', uid)
        .onSnapshot(querySnapshot => {
            const requests = [];
            querySnapshot.forEach(snapshot => {
                requests.push({
                    id: snapshot.id,
                    ...snapshot.data()
                });
            });
            dispatch(setUserRequests(requests));
        })
        return unsubscribe;
    };
};