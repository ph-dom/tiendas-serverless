import React from 'react';
import { Loader } from '@googlemaps/js-api-loader';

class GoogleMapComponent extends React.Component {
    mapDiv = React.createRef();
    map  = null;

    state = {
        getCurrentPositionStatus: false,
        googleMapInstanceCreated: false,
        error: null,
        lat: 0,
        lng: 0,
        zoom: 0,
        radialStores: []
    }

    succesGetCurrentPositionCallback = async (position) => {
        let lat = position.coords.latitude;
        let lng = position.coords.longitude;
        const mapDiv = this.mapDiv.current;
        const loader = new Loader({
            apiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY || '',
            version: "weekly"
        });
        loader.load().then(() => {
            const google = window.google;
            this.map = new google.maps.Map(mapDiv, {
                center: {
                    lat,
                    lng
                },
                zoom: 18
            });
            this.setState({
                getCurrentPositionStatus: true,
                googleMapInstanceCreated: true,
                lat,
                lng,
                zoom: 8,
            });
        }).catch(error => {
            console.log(error);
            this.setState({
                getCurrentPositionStatus: true,
                googleMapInstanceCreated: false,
                error: 'No se pudo cargar el mapa.'
            });
        });
    }

    errorGetCurrentPositionCallback = () => {
        this.setState({
            getCurrentPositionStatus: false,
            error: 'Error al obtener ubicación.'
        });
    }

    componentDidMount() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                this.succesGetCurrentPositionCallback,
                this.errorGetCurrentPositionCallback
            );
        } else {
            this.errorGetCurrentPositionCallback();
        }
    }
    
    render() {
        const { display } = this.props;
        return (
            <div className="googlemap-container" style={{ display }} ref={this.mapDiv} />
        );
    }
}

export default GoogleMapComponent;