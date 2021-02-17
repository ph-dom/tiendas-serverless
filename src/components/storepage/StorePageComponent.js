import React from 'react';
import { connect } from 'react-redux';

const StorePageComponent = (props) => (
    <h1>StorePageComponent idStore: {props.store.id}</h1>
);

const mapDispatchStateToProps = (state, props) => {
    let idStore = props.match.params.idStore;
    return {
        store: state.nearbyStores.find(store => store.id === idStore)
    };
};

export default connect(mapDispatchStateToProps)(StorePageComponent);