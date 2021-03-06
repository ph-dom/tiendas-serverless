import React from 'react';
import { connect } from 'react-redux';
import { isEmpty, pick } from 'lodash';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import CircularProgress from '@material-ui/core/CircularProgress';
import { openModal } from '../../redux/modal/action';
import { openSnackbar } from '../../redux/snackbar/actions';
import { startCreateUserStore, startUpdateUserStore } from '../../redux/store/actions';

class StoreEditor extends React.Component {
    constructor(props) {
        super(props);
        const { store } = this.props;
        this.state = isEmpty(store) ? {
            name: '',
            description: '',
            address: '',
            loadingSaveOrUpdate: false
        } : {
            name: store.name,
            description: store.description,
            address: store.address,
            loadingSaveOrUpdate: false
        };
    }

    handleSubmitForm = (event) => {
        event.preventDefault();
        this.setState({
            loadingSaveOrUpdate: true
        });
        const { store } = this.props;
        if (isEmpty(store)) {
            this.props.startCreateUserStore(
                pick(this.state, ['name', 'description', 'address']),
                this.openSuccessSnackbar,
                this.openErrorModal
            );
        } else {
            this.props.startUpdateUserStore(
                pick(this.state, ['description', 'address']),
                this.openSuccessSnackbar,
                this.openErrorModal
            );
        }
    }

    openErrorModal = () => {
        this.props.openModal('Error al guardar datos.');
        this.setState({ loadingSaveOrUpdate: false });
    }

    openSuccessSnackbar = () => {
        this.props.openSnackbar('Datos guardados exitosamente.');
        this.setState({ loadingSaveOrUpdate: false });
    }

    onInputTextChange = (event) => {
        let prop = event.target.name;
        let value = event.target.value;
        if(prop === 'name' && value.length >= 20) {
            event.preventDefault();
            return;
        }
        this.setState({
            [prop]: value
        });
    }

    render() {
        const { name, description, address, loadingSaveOrUpdate } = this.state;
        const { store } = this.props;
        return (
            <React.Fragment>
                <Typography variant="h5">{isEmpty(store) ? 'Crear Tienda' : name}</Typography>
                <form id="store-form" onSubmit={this.handleSubmitForm} autoComplete="off" className="tiendas-form tiendas-form__full-width">
                    <div className="tiendas-form-inputs">
                        {isEmpty(store) && <TextField
                            name="name"
                            type="text"
                            label="Nombre"
                            value={name}
                            onChange={this.onInputTextChange}
                            variant="outlined"
                            size="small"
                        />}
                        <TextField
                            name="description"
                            label="Descripción"
                            multiline={true}
                            value={description}
                            onChange={this.onInputTextChange}
                            variant="outlined"
                            rows="3"
                            size="small"
                        />
                        <TextField
                            name="address"
                            type="text"
                            label="Dirección"
                            value={address}
                            onChange={this.onInputTextChange}
                            variant="outlined"
                            size="small"
                        />
                    </div>
                    <div className="tiendas-form-actions">
                        {loadingSaveOrUpdate ?
                            <CircularProgress color="primary" /> :
                            <Button variant="contained" color="primary" form="store-form" type="submit" size="small">
                                Guardar
                            </Button>
                        }
                    </div>
                </form>
            </React.Fragment>
        );
    }
}

const mapStateToProps = (state) => ({
    store: state.store,
    location: state.location
});

const mapDispatchToProps = (dispatch) => ({
    openModal: (message, onConfirm) => dispatch(openModal(message, onConfirm)),
    openSnackbar: (message) => dispatch(openSnackbar(message)),
    startCreateUserStore: (store, successCallback, errorCallback) => dispatch(startCreateUserStore(store, successCallback, errorCallback)),
    startUpdateUserStore: (updates, successCallback, errorCallback) => dispatch(startUpdateUserStore(updates, successCallback, errorCallback))
});

export default connect(mapStateToProps, mapDispatchToProps)(StoreEditor);