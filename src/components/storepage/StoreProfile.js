import React from 'react';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';

const StoreProfile = ({ store }) => (
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
            <IconButton aria-label="like">
                <ThumbUpIcon />
            </IconButton>
            <IconButton aria-label="favorite">
                <FavoriteIcon />
            </IconButton>
            <IconButton aria-label="share">
                <ShareIcon />
            </IconButton>
        </CardActions>
    </Card>
);

export default StoreProfile;