import React from 'react';
import { connect } from 'react-redux'
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import FavoriteIcon from '@material-ui/icons/Favorite';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import formatNumber from '../../shared/formatNumber';
import { startLikeStore, startDislikeStore } from '../../redux/nearbyproducts/actions';

const ProductListItem = ({
    product,
    handleAddToRequest,
    handleRemoveToRequest,
    added,
    uid,
    startLikeStore,
    startDislikeStore
}) => {
    const liked = product.likes ? product.likes.indexOf(uid) > -1 : false;
    const likesCount = product.likes ? product.likes.length : 0;

    const handleClickFavoriteIcon = () => {
        if(liked) {
            startDislikeStore(product.store.id, product.id);
        } else {
            startLikeStore(product.store.id, product.id);
        }
    }
    return (
        <Grid item xs={12} sm={12} md={6}>
            <Card elevation={4}>
                <CardMedia
                    component="img"
                    alt={product.name}
                    height="200"
                    image={product.url || '/imgs/noimageavailable2.svg'}
                    title={product.name}
                />
                <CardContent>
                    <Typography variant="h6" color="textPrimary" component="h6">
                        {product.name}
                    </Typography>
                    <Typography variant="body1" color="textSecondary" component="p">
                        {product.description}
                    </Typography>
                    <Typography variant="body2" color="textPrimary" component="p">
                        {formatNumber(product.price)}
                    </Typography>
                </CardContent>
                <CardActions disableSpacing>
                    <Button variant="text" startIcon={<FavoriteIcon />} color={liked ? 'secondary' : 'default'} onClick={handleClickFavoriteIcon}>
                        {likesCount}
                    </Button>
                    <IconButton aria-label="add to request" color={added ? 'secondary' : 'default'} onClick={added ? handleRemoveToRequest : handleAddToRequest}>
                        {added ? <RemoveIcon /> : <AddIcon />}
                    </IconButton>
                </CardActions>
            </Card>
        </Grid>
    );
};

const mapStateToProps = (state) => ({
    uid: state.user.uid
});

const mapDispatchToProps = (dispatch) => ({
    startLikeStore: (idStore, idProduct) => dispatch(startLikeStore(idStore, idProduct)),
    startDislikeStore: (idStore, idProduct) => dispatch(startDislikeStore(idStore, idProduct))
});

export default connect(mapStateToProps, mapDispatchToProps)(ProductListItem);