import React from 'react';
import { connect } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import ProductListItem from './ProductListItem';
import Typography from '@material-ui/core/Typography';

const HomeComponent = (props) => (
    <div className="container">
        <Typography variant="h4">Productos:</Typography>
        <Grid container spacing={2}>
            {props.nearbyProducts.map(product => {
                return (
                    <ProductListItem
                        key={product.id}
                        product={product}
                    />
                );
            })}
        </Grid>
        
    </div>
);

const mapStateToProps = (state) => ({
    nearbyProducts: state.nearbyProducts
});

export default connect(mapStateToProps)(HomeComponent);