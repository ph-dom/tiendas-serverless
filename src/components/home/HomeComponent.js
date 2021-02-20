import React from 'react';
import { connect } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';
import NativeSelect from '@material-ui/core/NativeSelect';
import ProductListItem from './ProductListItem';
import StoreListItem from './StoreListItem';
import Divider from '@material-ui/core/Divider';

const HomeComponent = (props) => {
    const [list, changeList] = React.useState('Productos');
    return (
        <div className="container">
            <Typography variant="h5">{list} cerca de ti</Typography>
            <FormControl>
                <NativeSelect
                    value={list}
                    onChange={event => changeList(event.target.value)}
                    inputProps={{
                        name: 'list',
                        id: 'element-list',
                    }}
                >
                    <option value="Productos">Productos</option>
                    <option value="Tiendas">Tiendas</option>
                </NativeSelect>
            </FormControl>
            <Divider style={{marginTop:'10px', marginBottom:'10px'}}/>
            {list === 'Productos' &&
                <Grid container spacing={2}>
                    {props.nearbyProducts.map(product => {
                        return (
                            <ProductListItem
                                key={product.id}
                                product={product}
                            />
                        );
                    })}
                </Grid>}
            {list === 'Tiendas' &&
                <Grid container spacing={2}>
                    {props.nearbyStores.map(store => {
                        return (
                            <StoreListItem
                                key={store.id}
                                store={store}
                            />
                        );
                    })}
                </Grid>}
        </div>
    );
};

const mapStateToProps = (state) => ({
    nearbyProducts: state.nearbyProducts,
    nearbyStores: state.nearbyStores
});

export default connect(mapStateToProps)(HomeComponent);