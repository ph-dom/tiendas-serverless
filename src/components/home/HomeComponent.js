import React from 'react';
import { connect } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import StoreListItem from './StoreListItem';
import Typography from '@material-ui/core/Typography';

const HomeComponent = (props) => (
    <div className="container">
        <Typography variant="h4">Tiendas cercanas</Typography>
        <Grid container spacing={2}>
            {props.nearbyStores.map(ns => {
                return (
                    <StoreListItem
                        key={ns.id}
                        storeId={ns.id}
                        storeDescription={ns.description}
                        storeDirection={ns.direction}
                        storeName={ns.name}
                        storeOwnerEmail={ns.user.email}
                        storeUrl={ns.url}
                    />
                );
            })}
        </Grid>
    </div>
);

const mapStateToProps = (state) => ({
    nearbyStores: state.nearbyStores
});

export default connect(mapStateToProps)(HomeComponent);