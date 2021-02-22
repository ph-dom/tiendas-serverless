import React from 'react';
import { connect } from 'react-redux';
import { isEmpty, pick } from 'lodash';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import Chip from '@material-ui/core/Chip';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import CloseIcon from '@material-ui/icons/Close';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import ChipFormControl from './chipformcontrol';
import { startCreateStoreProduct, startUpdateStoreProduct, startUploadStoreProduct } from '../../redux/products/actions';
import { openSnackbar } from '../../redux/snackbar/actions';
import { openModal } from '../../redux/modal/action';
import './ProductsStyles.scss';

class ProductsComponent extends React.Component {
    inputFileRef = React.createRef(null);

    constructor(props) {
        super(props);
        const { product } = this.props;
        if (isEmpty(product)) {
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
                url: product.url,
                fileName: '',
                isUploading: false,
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
        if (isEmpty(product)) {
            this.props.startCreateStoreProduct(
                pick(this.state, ['name', 'price', 'tags', 'description']),
                this.openSnackbarSuccessCallback,
                this.openModalErrorCallback
            );
        } else {
            this.props.startUpdateStoreProduct(
                product.id,
                pick(this.state, ['price', 'tags', 'description']),
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

    handleChangeFile = (event) => {
        this.setState({
            fileName: event.target.files[0].name
        });
    }

    handleUploadImage = () => {
        const file = this.inputFileRef.current.files[0];
        const idProduct = this.props.product.id;
        this.setState({ isUploading: true });
        this.props.startUploadStoreProduct(idProduct, file, () => {
            this.props.openSnackbar('Imágen subida correctamente.');
            this.setState({
                isUploading: true,
                fileName: ''
            });
        }, () => {
            this.props.openModal('Error al cargar imágen. Intentar nuevamente en breve.');
            this.setState({
                isUploading: true
            });
        });
    }

    render() {
        const { name, price, tags, tag, description, loadingSaveOrUpdate, isUploading, fileName } = this.state;
        const { product } = this.props;
        return (
            <div className="container">
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={5}>
                        <Paper className="paper" variant="outlined">
                            <Typography variant="h5">{isEmpty(product) ? 'Crear Producto' : name}</Typography>
                            <form id="product-form" onSubmit={this.handleSubmitForm} autoComplete="off" className="tiendas-form tiendas-form__full-width">
                                <div className="tiendas-form-inputs">
                                    {isEmpty(product) && <TextField
                                        name="name"
                                        type="text"
                                        label="Nombre"
                                        value={name}
                                        onChange={this.onInputTextChange}
                                        variant="outlined"
                                        size="small"
                                    />}
                                    <TextField
                                        name="price"
                                        type="number"
                                        label="Precio"
                                        value={price}
                                        onChange={this.onInputTextChange}
                                        variant="outlined"
                                        size="small"
                                    />
                                    <TextField
                                        name="description"
                                        multiline={true}
                                        label="Descripción"
                                        value={description}
                                        onChange={this.onInputTextChange}
                                        variant="outlined"
                                        rows={3}
                                        size="small"
                                    />
                                    <ChipFormControl
                                        value={tag}
                                        onChange={this.onInputTextChange}
                                        handleClickIcon={this.handleAddTag}
                                    />
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
                                        <Button variant="contained" color="primary" form="product-form" type="submit" size="small">
                                            Guardar
                                        </Button>
                                    }
                                </div>
                            </form>
                        </Paper>
                    </Grid>
                    <Grid item xs={12} sm={5}>
                        <Paper className="paper" variant="outlined">
                            <Typography variant="h5">
                                Imágen
                            </Typography>
                            <input
                                accept="image/*"
                                style={{ display: 'none' }}
                                id="store-image-file"
                                type="file"
                                multiple={false}
                                ref={this.inputFileRef}
                                onChange={this.handleChangeFile}
                            />
                            {!isEmpty(product) &&
                                <label htmlFor="store-image-file">
                                    <IconButton color="primary" aria-label="upload picture" component="span">
                                        <PhotoCamera />
                                    </IconButton>
                                    <Typography variant="body1" component="span">
                                        {fileName}
                                    </Typography>
                                </label>}
                            <div>
                                {(fileName && !isUploading) &&
                                    <Button variant="contained" color="primary" onClick={this.handleUploadImage}>
                                        Guardar Imágen
                                </Button>
                                }
                                {(fileName && isUploading) && <CircularProgress color="primary" />}
                            </div>
                            <img alt={product.name} className="image" src={product.url || '/imgs/noimageavailable2.svg'}/>
                        </Paper>
                    </Grid>
                </Grid>
            </div>
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
    startUploadStoreProduct: (idProduct, photo, successCallback, errorCallback) => dispatch(startUploadStoreProduct(idProduct, photo, successCallback, errorCallback)),
    openSnackbar: (message) => dispatch(openSnackbar(message)),
    openModal: (message) => dispatch(openModal(message))
});

export default connect(mapDispatchStateToProps, mapDispatchToProps)(ProductsComponent);