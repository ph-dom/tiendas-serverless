import React from 'react';
import { connect } from 'react-redux';
import { isEmpty, pick } from 'lodash';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import Chip from '@material-ui/core/Chip';
import CloseIcon from '@material-ui/icons/Close';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import KeyboardReturnIcon from '@material-ui/icons/KeyboardReturn';
import InputTextOutlined from '../shared/inputs/textoutlined';
import InputTextareaOutlined from '../shared/inputs/textareaoutlined';
import InputButtonContained from '../shared/inputs/buttoncontained';
import { startCreateStoreProduct, startUpdateStoreProduct } from '../../redux/products/actions';
import { openSnackbar } from '../../redux/snackbar/actions';
import { openModal } from '../../redux/modal/action';
import './ProductsStyles.scss';

class ProductsComponent extends React.Component {
    constructor(props) {
        super(props);
        const { product } = this.props;
        if(isEmpty(product)) {
            this.state = {
                name: '',
                price: '',
                tag: '',
                tags: [],
                description: '',
                loadingSaveOrUpdate: false
            };
        } else {
            this.state = {
                name: product.name,
                price: product.price,
                tag: '',
                tags: product.tags,
                description: product.description,
                loadingSaveOrUpdate: false
            };
        }
    }

    onInputTextChange = (event) => {
        let prop = event.target.name;
        let value = event.target.value;
        this.setState({
            [prop]: value
        });
    }

    handleSubmitForm = (event) => {
        this.setState({ loadingSaveOrUpdate: true })
        event.preventDefault();
        const { product } = this.props;
        if(isEmpty(product)) {
            this.props.startCreateStoreProduct(
                pick(this.state, ['name','price','tags','description']),
                this.openSnackbarSuccessCallback,
                this.openModalErrorCallback
            );
        } else {
            this.props.startUpdateStoreProduct(
                product.id,
                pick(this.state, ['price','tags','description']),
                this.openSnackbarSuccessCallback,
                this.openModalErrorCallback
            );
        }
    }

    openSnackbarSuccessCallback = () => {
        this.props.openSnackbar('Producto guardado con éxito.');
        this.setState({ loadingSaveOrUpdate: false })
        this.props.history.push('/mitienda');
    }

    openModalErrorCallback = () => {
        this.props.openModal('Error al guardar datos');
        this.setState({ loadingSaveOrUpdate: false })
    }

    handleDeleteChip = (x) => {
        this.setState(state => {
            let tags = state.tags.filter(tag => tag !== x);
            return {
                tags
            }
        });
    }

    handleAddTag = () => {
        this.setState(state => {
            state.tags.push(state.tag);
            return {
                tag: '',
                tags: state.tags
            }
        });
    }

    render() {
        const { name, price, tags, tag, description, loadingSaveOrUpdate } = this.state;
        const { product } = this.props;
        return (
            <Grid container className="container">
                <Grid item xs={12} sm={5}>
                    <Paper className="paper" variant="outlined">
                        <Typography variant="h5">{isEmpty(product) ? 'Crear Producto' : name}</Typography>
                        <form id="product-form" onSubmit={this.handleSubmitForm} autoComplete="off" className="tiendas-form tiendas-form__full-width">
                            <div className="tiendas-form-inputs">
                                {isEmpty(product) && <InputTextOutlined
                                    idInput="ProductInput-name"
                                    nameInput="name"
                                    typeInput="text"
                                    textLabel="Nombre"
                                    value={name}
                                    onChange={this.onInputTextChange}
                                />}
                                <InputTextOutlined
                                    idInput="ProductInput-price"
                                    nameInput="price"
                                    typeInput="number"
                                    textLabel="Precio"
                                    value={price}
                                    onChange={this.onInputTextChange}
                                />
                                <InputTextareaOutlined
                                    idInput="ProductInput-description"
                                    nameInput="description"
                                    textLabel="Descripción"
                                    value={description}
                                    onChange={this.onInputTextChange}
                                />
                                <FormControl variant="outlined" size="small">
                                    <InputLabel htmlFor="ProductInput-tag">Tags</InputLabel>
                                    <OutlinedInput
                                        id="ProductInput-tag"
                                        type="text"
                                        value={tag}
                                        onChange={this.onInputTextChange}
                                        name="tag"
                                        labelWidth={40}
                                        endAdornment={
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label="add tag"
                                                    onClick={this.handleAddTag}
                                                    edge="end"
                                                >
                                                    <KeyboardReturnIcon />
                                                </IconButton>
                                            </InputAdornment>
                                        }
                                    />
                                </FormControl>
                                <div className="chips-container">
                                    {tags.map(x => (
                                        <Chip
                                            key={x}
                                            onDelete={() => this.handleDeleteChip(x)}
                                            label={x}
                                            deleteIcon={<CloseIcon />}
                                            color="secondary"
                                            size="small"
                                        />
                                    ))}
                                </div>
                            </div>
                            <div className="tiendas-form-actions">
                                {loadingSaveOrUpdate ?
                                    <CircularProgress color="primary" /> :
                                    <InputButtonContained
                                        idForm="product-form"
                                        text="Guardar"
                                    />
                                }
                            </div>
                        </form>
                    </Paper>
                </Grid>
            </Grid>
        );
    }
}

const mapDispatchStateToProps = (state, props) => {
    let idProduct = props.match.params.idProduct;
    return {
        product: idProduct ? state.products.find(product => product.id === idProduct) : {}
    };
};

const mapDispatchToProps = (dispatch) => ({
    startCreateStoreProduct: (product, successCallback, errorCallback) => dispatch(startCreateStoreProduct(product, successCallback, errorCallback)),
    startUpdateStoreProduct: (idProduct, updates, successCallback, errorCallback) => dispatch(startUpdateStoreProduct(idProduct, updates, successCallback, errorCallback)),
    openSnackbar: (message) => dispatch(openSnackbar(message)),
    openModal: (message) => dispatch(openModal(message))
});

export default connect(mapDispatchStateToProps, mapDispatchToProps)(ProductsComponent);