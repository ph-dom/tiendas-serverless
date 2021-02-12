import React from 'react';
import { connect } from 'react-redux';
import { isEmpty, pick } from 'lodash';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import InputTextOutlined from '../shared/inputs/textoutlined';
import InputTextareaOutlined from '../shared/inputs/textareaoutlined'
import InputButtonContained from '../shared/inputs/buttoncontained';
import ButtonOutlined from '../shared/buttons/buttonoutlined';
import CircularProgress from '@material-ui/core/CircularProgress';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import ProductListItem from './ProductListItem';
import { openModal } from '../../redux/modal/action';
import { openSnackbar } from '../../redux/snackbar/actions';
import { startCreateUserStore, startUpdateUserStore } from '../../redux/store/actions';
import { startDeleteStoreProduct } from '../../redux/products/actions';
import './StoreStyles.scss';

class StoreComponent extends React.Component {
    constructor(props) {
        super(props);
        const { store } = this.props;
        this.state = isEmpty(store) ? {
            name: '',
            description: '',
            location: null,
            address: '',
            loadingLocation: false,
            loadingSaveOrUpdate: false
        } : {
            name: store.name,
            description: store.description,
            location: {
                lat: store.lat,
                lng: store.lng
            },
            address: store.address,
            loadingLocation: false,
            loadingSaveOrUpdate: false
        };
    }

    handleSubmitForm = (event) => {
        event.preventDefault();
        this.setState({
            loadingSaveOrUpdate: true
        });
        const { store } = this.props;
        if(isEmpty(store)) {
            this.props.startCreateUserStore(
                pick(this.state, ['name', 'description', 'location', 'address']),
                this.openSuccessSnackbar,
                this.openErrorModal
            );
        } else {
            this.props.startUpdateUserStore(
                store.id,
                pick(this.state, ['description', 'location', 'address']),
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

    succesGetCurrentPositionCallback = (position) => {
        let lat = position.coords.latitude;
        let lng = position.coords.longitude;
        this.setState({
            location: {
                lat,
                lng
            },
            loadingLocation: false
        });
        this.props.openSnackbar('Ubicación de tienda actualizada.');
    }

    errorGetCurrentPositionCallback = () => {
        this.props.openModal('No pudimos acceder a tu ubicación.');
        this.setState({ loadingSaveOrUpdate: false });
    }

    getLocation = () => {
        this.setState({
            loadingLocation: true
        });
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                this.succesGetCurrentPositionCallback,
                this.errorGetCurrentPositionCallback
            );
        } else {
            this.errorGetCurrentPositionCallback();
        }
    }

    onDeleteProduct = (idProduct) => {
        this.props.openModal('¿Seguro que deseas eliminar este producto?', () => {
            console.log('me ejecute');
            this.props.startDeleteStoreProduct(
                idProduct,
                () => this.props.openSnackbar('Ubicación de tienda actualizada.'),
                () => this.props.openModal('Error al eliminar producto, intentar nuevamente en breve.')
            );
        });
    }

    onEditProduct = (idProduct) => {
        this.props.history.push(`/mitienda/producto/${idProduct}`);
    }
    
    componentDidMount() {
        const { store } = this.props;
        isEmpty(store) && this.getLocation();
    }

    render() {
        const { name, description, address, loadingLocation, loadingSaveOrUpdate } = this.state;
        const { store } = this.props;
        return (
            <React.Fragment>
            <div className="container">
                <Grid container>
                    <Grid item xs={12} sm={5}>
                        <Paper className="paper" variant="outlined">
                            <Typography variant="h5">{isEmpty(store) ? 'Crear Tienda' : name }</Typography>
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
                                    {loadingLocation ? 
                                        <CircularProgress color="secondary" /> : 
                                        <ButtonOutlined
                                            onClick={this.getLocation}
                                            text="Actualizar ubicación"
                                        />}
                                    {loadingSaveOrUpdate ? 
                                        <CircularProgress color="primary" /> :
                                        <InputButtonContained
                                            idForm="store-form"
                                            text="Guardar"
                                        />
                                    }
                                </div>
                            </form>
                        </Paper>
                    </Grid>
                </Grid>
            </div>
            <div className="container">
                <Grid container spacing={2}>
                    {this.props.products.map(product => (
                        <ProductListItem
                            key={product.id}
                            productCreationDate={product.creationDate}
                            productDescription={product.description}
                            productName={product.name}
                            productTags={product.tags}
                            storeName={store.name}
                            onEdit={() => this.onEditProduct(product.id)}
                            onDelete={() => this.onDeleteProduct(product.id)}
                        />
                    ))}
                </Grid>
            </div>
            <Fab color="primary" aria-label="add" className="add-product" onClick={() => this.props.history.push('/mitienda/producto')}>
                <AddIcon />
            </Fab>
            </React.Fragment>
        );
    }
}

const mapStateToProps = (state) => ({
    store: state.store,
    products: state.products
});

const mapDispatchToProps = (dispatch) => ({
    openModal: (message, onConfirm) => dispatch(openModal(message, onConfirm)),
    openSnackbar: (message) => dispatch(openSnackbar(message)),
    startCreateUserStore: (store, successCallback, errorCallback) => dispatch(startCreateUserStore(store, successCallback, errorCallback)),
    startUpdateUserStore: (id, updates, successCallback, errorCallback) => dispatch(startUpdateUserStore(id, updates, successCallback, errorCallback)),
    startDeleteStoreProduct: (idProduct, successCallback, errorCallback) => dispatch(startDeleteStoreProduct(idProduct, successCallback, errorCallback))
});

export default connect(mapStateToProps, mapDispatchToProps)(StoreComponent);

