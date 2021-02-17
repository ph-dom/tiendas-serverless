import React from 'react';
import { connect } from 'react-redux';
import { isEmpty, pick } from 'lodash';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import InputTextOutlined from '../shared/inputs/textoutlined';
import InputTextareaOutlined from '../shared/inputs/textareaoutlined'
import InputButtonContained from '../shared/inputs/buttoncontained';
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
                        {isEmpty(store) && <InputTextOutlined
                            idInput="StoreInput-name"
                            nameInput="name"
                            typeInput="text"
                            textLabel="Nombre"
                            value={name}
                            onChange={this.onInputTextChange}
                        />}
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
                        {loadingSaveOrUpdate ?
                            <CircularProgress color="primary" /> :
                            <InputButtonContained
                                idForm="store-form"
                                text="Guardar"
                            />
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