import firestore, { timestamp } from '../../config/firebase';
import { openModal } from '../modal/action';
import { openSnackbar } from '../snackbar/actions';

const addUserRequest = (request) => ({
    type: 'ADD_USER_REQUESTS',
    data: request
});

export const startAddUserRequest = (detail, total, store) => {
    return (dispatch, getState) => {
        const user = getState().user;
        return firestore.collection('requests').add({
            user,
            store,
            detail,
            total,
            status: 'CREADA',
            creationDate: timestamp.fromDate(new Date())
        })
        .then(documentRef => documentRef.get())
        .then(document => {
            dispatch(addUserRequest({
                id: document.id,
                ...document.data()
            }));
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
        return firestore.collection('requests')
        .where('user.uid', '==', uid)
        .get()
        .then(matchingDocs => {
            const requests = [];
            matchingDocs.forEach(snapshot => {
                requests.push({
                    id: snapshot.id,
                    ...snapshot.data()
                });
            });
            dispatch(setUserRequests(requests));
        })
        .catch(error => {
            console.log(error);
            dispatch(setUserRequests([]));
        });
    };
};