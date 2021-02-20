import React from 'react';
import { Link } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

const StoreListItem = ({ store }) => (
    <Grid item xs={12} sm={5} md={3}>
        <Card elevation={4}>
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
                        {store.description}
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions disableSpacing>
                <Button size="small" color="secondary" to={`/tienda/${store.id}`} component={Link}>
                    Visitar
                </Button>
            </CardActions>
        </Card>
    </Grid>
);

export default StoreListItem;