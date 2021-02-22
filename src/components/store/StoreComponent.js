import React from 'react';
import { isEmpty } from 'lodash';
import { connect } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import ProductListItem from './ProductListItem';
import ImageFileUpload from './ImageFileUpload';
import StoreEditor from './StoreEditor';
import { openModal } from '../../redux/modal/action';
import { openSnackbar } from '../../redux/snackbar/actions';
import { startDeleteStoreProduct } from '../../redux/products/actions';
import './StoreStyles.scss';

class StoreComponent extends React.Component {

    onDeleteProduct = (idProduct) => {
        this.props.openModal('¿Seguro que deseas eliminar este producto?', () => {
            this.props.startDeleteStoreProduct(
                idProduct,
                () => this.props.openSnackbar('Producto eliminado.'),
                () => this.props.openModal('Error al eliminar producto, intentar nuevamente en breve.')
            );
        });
    }

    onEditProduct = (idProduct) => {
        this.props.history.push(`/mitienda/producto/${idProduct}`);
    }

    render() {
        const { store, products } = this.props;
        return (
            <React.Fragment>
                <div className="container">
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={5}>
                            <Paper className="paper" variant="outlined">
                                <StoreEditor />
                            </Paper>
                        </Grid>
                        <Grid item xs={12} sm={5}>
                            <Paper className="paper" variant="outlined">
                                <ImageFileUpload />
                            </Paper>
                        </Grid>
                    </Grid>
                </div>
                <div className="container">
                    <Grid container spacing={2}>
                        {products.map(product => (
                            <ProductListItem
                                key={product.id}
                                productUrl={product.url}
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
                {!isEmpty(store) && <Fab color="primary" aria-label="add" className="add-product" onClick={() => this.props.history.push('/mitienda/producto')}>
                    <AddIcon />
                </Fab>}
            </React.Fragment>
        );
    }
}

const mapStateToProps = (state) => ({
    store: state.store,
    products: state.products
});

const mapDispatchToProps = (dispatch) => ({
    openModal: (message, callback) => dispatch(openModal(message, callback)),
    openSnackbar: (message) => dispatch(openSnackbar(message)),
    startDeleteStoreProduct: (idProduct, successCallback, errorCallback) => dispatch(startDeleteStoreProduct(idProduct, successCallback, errorCallback))
});

export default connect(mapStateToProps, mapDispatchToProps)(StoreComponent);

