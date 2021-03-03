import React from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';
import FavoriteIcon from '@material-ui/icons/Favorite';
import AddIcon from '@material-ui/icons/Add';

const ProductListItem = ({ product, handleAddToRequest, added }) => (
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
                    {'$'+product.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
                </Typography>
            </CardContent>
            <CardActions disableSpacing>
                <IconButton aria-label="favorite">
                    <FavoriteIcon />
                </IconButton>
                <IconButton aria-label="add to request" color={added ? 'secondary' : 'default'} onClick={handleAddToRequest}>
                    <AddIcon />
                </IconButton>
            </CardActions>
        </Card>
    </Grid>
);

export default ProductListItem;