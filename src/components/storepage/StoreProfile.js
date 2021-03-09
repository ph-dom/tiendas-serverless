import React from 'react';
import { connect } from 'react-redux';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import { startLikeStore, startDislikeStore } from '../../redux/nearbystores/actions';

const StoreProfile = ({
    store,
    startLikeStore,
    startDislikeStore,
    uid
}) => {
    const liked = store.likes ? (store.likes.indexOf(uid) > -1) : false;
    const likesCount = store.likes ? store.likes.length : 0;

    const handleClickFavoriteIcon = () => {
        if(liked) {
            startDislikeStore(store.id);
        } else {
            startLikeStore(store.id);
        }
    }
    return (
        <Card variant="outlined">
            <CardActionArea>
                <CardMedia
                    component="img"
                    alt={store.name}
                    height="300"
                    image={store.url || '/imgs/noimageavailable.svg'}
                    title={store.name}
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h5">
                        {store.name}
                    </Typography>
                    <Typography variant="body1" color="textPrimary" component="p">
                        Descripción: {store.description}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        Dirección: {store.address}
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions disableSpacing>
                <Button variant="text" startIcon={<FavoriteIcon />} color={liked ? 'secondary' : 'default'} onClick={handleClickFavoriteIcon}>
                    {likesCount}
                </Button>
                <IconButton aria-label="share">
                    <ShareIcon />
                </IconButton>
            </CardActions>
        </Card>
    );
};

const mapStateToProps = (state) => ({
    uid: state.user.uid
});

const mapDispatchToProps = (dispatch) => ({
    startLikeStore: (idStore) => dispatch(startLikeStore(idStore)),
    startDislikeStore: (idStore) => dispatch(startDislikeStore(idStore))
});

export default connect(mapStateToProps, mapDispatchToProps)(StoreProfile);