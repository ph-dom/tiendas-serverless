import React from 'react';
import { connect } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import StoreProfile from './StoreProfile';
import ProductListItem from './ProductListItem';
import Typography from '@material-ui/core/Typography';

const StorePageComponent = (props) => (
    <div className="container">
        <Grid container spacing={2}>
            <Grid item xs={12} sm={5} md={4}>
                <StoreProfile store={props.store} />
            </Grid>
            <Grid item xs={12} sm={7} md={8}>
                <Typography variant="h5">Productos</Typography>
                <Divider style={{ marginBottom: '10px' }}/>
                <Grid container spacing={2}>
                    {props.products.map(product => <ProductListItem key={product.id} product={product}/>)}
                </Grid>
            </Grid>
        </Grid>
    </div>
);

const mapDispatchStateToProps = (state, props) => {
    let idStore = props.match.params.idStore;
    return {
        store: state.nearbyStores.find(store => store.id === idStore),
        products: state.nearbyProducts.filter(product => product.store.id === idStore)
    };
};

export default connect(mapDispatchStateToProps)(StorePageComponent);