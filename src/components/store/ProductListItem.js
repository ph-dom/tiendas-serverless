import React from 'react';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import moment from '../../config/moment';

const ProductListItem = ({
    storeName,
    productName,
    productDescription,
    productCreationDate,
    productTags,
    onEdit,
    onDelete 
}) => {
    return (
        <Grid item xs={12} sm={4} md={3}>
            <Card elevation={4}>
                <CardHeader
                    avatar={
                        <Avatar aria-label="recipe">
                            {storeName[0]}
                        </Avatar>
                    }
                    action={
                        <IconButton aria-label="options">
                            <MoreVertIcon />
                        </IconButton>
                    }
                    title={productName}
                    subheader={moment(productCreationDate.toDate()).format("dddd DD/MM/YYYY, HH:mm")}
                />
                <CardMedia
                    style={{ height: 0, paddingTop: '56.25%' }}
                    image="/currentlocation.svg"
                    title={productName}
                />
                <CardContent>
                    <Typography variant="body1" color="textSecondary" component="p">
                        {productDescription}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        Tags: {productTags.join(', ')}
                    </Typography>
                </CardContent>
                <CardActions disableSpacing>
                    <IconButton color="primary" aria-label="add to favorites" onClick={onEdit}>
                        <EditIcon />
                    </IconButton>
                    <IconButton color="secondary" aria-label="share" onClick={onDelete}>
                        <DeleteIcon />
                    </IconButton>
                </CardActions>
            </Card>
        </Grid>
    )
};

export default ProductListItem;