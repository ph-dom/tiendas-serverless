import React from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';

const ProductListItem = ({ product }) => (
    <Grid item xs={12} sm={6}>
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
                    {'$'+product.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
                </Typography>
            </CardContent>
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
    </Grid>
);

export default ProductListItem;