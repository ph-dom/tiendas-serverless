import React from 'react';
import { connect } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import InputTextOutlined from '../shared/inputs/textoutlined';
import InputTextareaOutlined from '../shared/inputs/textareaoutlined'
import InputButtonContained from '../shared/inputs/buttoncontained';
import { openModal } from '../../redux/modal/action';
import { openSnackbar } from '../../redux/snackbar/actions';
import { startCreateUserStore } from '../../redux/store/actions';

class StoreComponent extends React.Component {
    state = {
        name: '',
        description: '',
        location: null,
        address: ''
    }

    handleSubmitForm = (event) => {
        event.preventDefault();
        console.log('me llamaron :O');
        this.props.startCreateUserStore(
            this.state,
            () => {
                this.props.openSnackbar('Tienda creada exitosamente.');
            },
            () => {
                this.props.openModal('Error al crear tienda.');
            }
        );
    }

    onInputTextChange = (event) => {
		let prop = event.target.name;
		let value = event.target.value;
		this.setState({
			[prop]: value
		});
    }

    succesGetCurrentPositionCallback = (position) => {
        let lat = position.coords.latitude;
        let lng = position.coords.longitude;
        this.setState({
            location: {
                lat,
                lng
            }
        });
    }

    errorGetCurrentPositionCallback = () => {
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
        const { name, description, address } = this.state;
        return (
            <Grid container className="container">
                <Grid item xs={12} sm={5}>
                    <Paper className="paper" variant="outlined">
                        <Typography variant="h5">Mi Tienda</Typography>
                        <form id="store-form" onSubmit={this.handleSubmitForm} autoComplete="off" className="tiendas-form tiendas-form__full-width">
                            <div className="tiendas-form-inputs">
                                <InputTextOutlined
                                    idInput="StoreInput-name"
                                    nameInput="name"
                                    typeInput="text"
                                    textLabel="Nombre"
                                    value={name}
                                    onChange={this.onInputTextChange}
                                />
                                <InputTextareaOutlined
                                    idInput="StoreInput-description"
                                    nameInput="description"
                                    textLabel="Descripción"
                                    value={description}
                                    onChange={this.onInputTextChange}
                                />
                                <InputTextOutlined
                                    idInput="StoreInput-address"
                                    nameInput="address"
                                    typeInput="text"
                                    textLabel="Dirección"
                                    value={address}
                                    onChange={this.onInputTextChange}
                                />
                            </div>
                            <div className="tiendas-form-actions">
                                <InputButtonContained
                                    idForm="store-form"
                                    text="Guardar Tienda"
                                />
                            </div>
                        </form>
                    </Paper>
                </Grid>
            </Grid>
        );
    }
}
const mapDispatchToProps = (dispatch) => ({
    openModal: (message) => dispatch(openModal(message)),
    openSnackbar: (message) => dispatch(openSnackbar(message)),
    startCreateUserStore: (store, successCallback, errorCallback) => dispatch(startCreateUserStore(store, successCallback, errorCallback))
});

export default connect(undefined, mapDispatchToProps)(StoreComponent);

