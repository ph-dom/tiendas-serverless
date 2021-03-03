import { openModal } from '../modal/action';

const setCurrentLocation = ({ lat, lng }) => ({
    type: 'SET_LOCATION',
    data: {
        lat,
        lng
    }
});

export const startGetCurrentLocation = () => {
    return (dispatch) => {
        return getCurrentLocation().then(location => {
            dispatch(setCurrentLocation(location));
        }).catch(error => {
            console.log(error);
            dispatch(openModal(error));
        });
    };
};

const getCurrentLocation = () => {
    return new Promise((resolve, reject) => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    resolve({
                        lat: position.coords.latitude,
                        lng: position.coords.longitude
                    });
                },
                (error) => {
                    reject(error.message);
                },
                {
                    enableHighAccuracy: true,
                    maximumAge: 10000,
                    timeout: 5000
                }
            );
        } else {
            reject('Tu navegador no es compatible con esta aplicación.');
        }
    });
};