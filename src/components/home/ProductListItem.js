import React from 'react';
import { Link } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import MoreVertIcon from '@material-ui/icons/MoreVert';

const ProductListItem = ({ product }) => (
    <Grid item xs={12} sm={5} md={3}>
        <Card elevation={4}>
            <CardHeader
                avatar={
                    <Avatar aria-label="recipe" alt={product.store.name} src={product.store.url} />
                }
                action={
                    <IconButton aria-label="settings">
                        <MoreVertIcon />
                    </IconButton>
                }
                title={product.name}
                subheader={'$'+product.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
            />
            <CardMedia
                component="img"
                alt={product.name}
                height="200"
                image={product.url}
                title={product.name}
            />
            <CardContent>
                <Typography variant="body1" color="textSecondary" component="p">
                    {product.description}
                </Typography>
                <Typography variant="body2" color="textPrimary" component="p">
                    Tienda: {product.store.name}
                </Typography>
            </CardContent>
            <CardActions disableSpacing>
                <Button size="small" color="secondary" to={`/tienda/${product.store.id}`} component={Link}>
                    Visitar Tienda
                </Button>
            </CardActions>
        </Card>
    </Grid>
);

export default ProductListItem;