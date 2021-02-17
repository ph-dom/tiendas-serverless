import React from 'react';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography';

const StoreListItem = ({
    storeName,
    storeDirection,
    storeOwnerEmail,
    storeDescription,
    storeId,
    storeUrl
}) => (
    <Grid item xs={12} sm={5} md={3}>
        <Card elevation={4}>
            <CardActionArea>
                <CardMedia
                    component="img"
                    alt={storeName}
                    height="150"
                    image={storeUrl || '/imgs/noimageavailable.svg'}
                    title={storeName}
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                        {storeName}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        {storeDescription}
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions disableSpacing>
                <Button size="small" color="primary" to={`/tienda/${storeId}`} component={Link}>
                    Visitar
                </Button>
                <Button size="small" color="primary">
                    Learn More
                </Button>
            </CardActions>
        </Card>
    </Grid>
);

export default StoreListItem;