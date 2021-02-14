/**
 * NO USAR ESTE COMPONENTE X_X
 */

import React from 'react';
import { connect } from 'react-redux';
import loader from '../../config/googlemaps';
import { openModal } from '../../redux/modal/action';

class GoogleMapComponent extends React.Component {
    mapDiv = React.createRef();
    map = null;

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
        loader.load().then(() => {
            const google = window.google;
            this.map = new google.maps.Map(mapDiv, {
                mapId: process.env.REACT_APP_GOOGLE_MAPS_ID_STYLE,
                center: {
                    lat,
                    lng
                },
                zoom: 18,
                disableDefaultUI: true
            });
            new google.maps.Marker({
                position: new google.maps.LatLng(lat, lng),
                icon: '/imgs/currentlocation.svg',
                map: this.map,
                title: "Estas aquí"
            });
            const input = document.getElementById("StoreInput-address");
            const searchBox = new google.maps.places.SearchBox(input);
            this.map.addListener("bounds_changed", () => {
                searchBox.setBounds(this.map.getBounds());
            });
            let markers = [];
            // Listen for the event fired when the user selects a prediction and retrieve
            // more details for that place.
            searchBox.addListener("places_changed", () => {
                const places = searchBox.getPlaces();

                if (places.length == 0) {
                    return;
                }
                // Clear out the old markers.
                markers.forEach((marker) => {
                    marker.setMap(null);
                });
                markers = [];
                // For each place, get the icon, name and location.
                const bounds = new google.maps.LatLngBounds();
                places.forEach((place) => {
                    if (!place.geometry) {
                        console.log("Returned place contains no geometry");
                        return;
                    }
                    const icon = {
                        url: place.icon,
                        size: new google.maps.Size(71, 71),
                        origin: new google.maps.Point(0, 0),
                        anchor: new google.maps.Point(17, 34),
                        scaledSize: new google.maps.Size(25, 25),
                    };
                    // Create a marker for each place.
                    markers.push(
                        new google.maps.Marker({
                            map: this.map,
                            icon,
                            title: place.name,
                            position: place.geometry.location,
                        })
                    );

                    if (place.geometry.viewport) {
                        // Only geocodes have viewport.
                        bounds.union(place.geometry.viewport);
                    } else {
                        bounds.extend(place.geometry.location);
                    }
                });
                this.map.fitBounds(bounds);
            });
            /*marker.addListener('click", () => {});*/
            this.setState({
                getCurrentPositionStatus: true,
                googleMapInstanceCreated: true,
                lat,
                lng,
                zoom: 8
            });
        }).catch(error => {
            console.log(error);
            this.setState({
                getCurrentPositionStatus: true,
                googleMapInstanceCreated: false,
                error: 'No se pudo cargar el mapa.'
            });
            this.props.openModal('Hay problemas para desplegar el mapa de Google.');
        });
    }

    errorGetCurrentPositionCallback = () => {
        this.setState({
            getCurrentPositionStatus: false,
            error: 'Error al obtener ubicación.'
        });
        this.props.openModal('No pudimos acceder a tu ubicación.');
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
        return (
            <div className="googlemap-container">
                <div className="googlemap" style={{ display: 'block' }} ref={this.mapDiv} />
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => ({
    openModal: () => dispatch(openModal())
});

export default connect(undefined, mapDispatchToProps)(GoogleMapComponent);