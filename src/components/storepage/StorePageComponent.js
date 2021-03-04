import React from 'react';
import { connect } from 'react-redux';
import Fab from '@material-ui/core/Fab';
import SendIcon from '@material-ui/icons/Send';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import StoreProfile from './StoreProfile';
import ProductListItem from './ProductListItem';
import RequestResume from './RequestResume';

class StorePageComponent extends React.Component {
    state = {
        request: [],
        openRequestResume: false
    }

    resetState = () => {
        this.setState({
            request: [],
            openRequestResume: false
        });
    }

    handleAddToRequest = (product) => {
        this.setState(state => {
            const item = {
                product: {
                    ...product,
                    store: null
                },
                units: 1,
                subtotal: product.price
            };
            state.request.push(item);
            return {
                request: state.request
            };
        });
    }

    handleRemoveToRequest = (id) => {
        this.setState(state => {
            let request = state.request.filter(item => item.product.id !== id)
            return {
                request,
                openRequestResume: request.length !== 0
            };
        });
    }

    handleAddUnit = (id) => {
        this.setState(state => {
            return {
                request: state.request.map(item => {
                    if(item.product.id === id) {
                        let units = item.units + 1;
                        let subtotal = Number(item.product.price) * units;
                        return {
                            ...item,
                            units,
                            subtotal 
                        };
                    }
                    return item;
                })
            };
        });
    }

    handleRemoveUnit = (id) => {
        this.setState(state => {
            return {
                request: state.request.map(item => {
                    if(item.product.id === id) {
                        let units = item.units - 1;
                        let subtotal = Number(item.product.price) * units;
                        return {
                            ...item,
                            units,
                            subtotal
                        };
                    }
                    return item;
                })
            };
        });
    }

    handleOpenRequestResume = () => {
        this.setState({
            openRequestResume: true
        });
    }

    handleCloseRequestResume = () => {
        this.setState({
            openRequestResume: false
        });
    }

    render() {
        const { request, openRequestResume } = this.state;
        const { store, products } = this.props;
        return (
            <div className="container">
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={5} md={4}>
                        <StoreProfile store={store} />
                    </Grid>
                    <Grid item xs={12} sm={7} md={8}>
                        <Typography variant="h5">Productos</Typography>
                        <Divider style={{ marginBottom: '10px' }}/>
                        <Grid container spacing={2}>
                            {products.map(product => {
                                return (
                                    <ProductListItem
                                        key={product.id}
                                        product={product}
                                        handleAddToRequest={() => this.handleAddToRequest(product)}
                                        handleRemoveToRequest={() => this.handleRemoveToRequest(product.id)}
                                        added={request.find(item => item.product.id === product.id) !== undefined}
                                    />
                                );
                            })}
                        </Grid>
                    </Grid>
                    {(request.length > 0) && <Fab color="primary" aria-label="send request" className="fab-button" onClick={this.handleOpenRequestResume}>
                        <SendIcon />
                    </Fab>}
                    <RequestResume
                        openRequestResume={openRequestResume}
                        handleCloseRequestResume={this.handleCloseRequestResume}
                        handleRemoveToRequest={this.handleRemoveToRequest}
                        handleAddUnit={this.handleAddUnit}
                        handleRemoveUnit={this.handleRemoveUnit}
                        resetState={this.resetState}
                        request={request}
                        store={store}
                    />
                </Grid>
            </div>
        );
    }
}

const mapDispatchStateToProps = (state, props) => {
    let idStore = props.match.params.idStore;
    return {
        store: state.nearbyStores.find(store => store.id === idStore),
        products: state.nearbyProducts.filter(product => product.store.id === idStore)
    };
};

export default connect(mapDispatchStateToProps)(StorePageComponent);