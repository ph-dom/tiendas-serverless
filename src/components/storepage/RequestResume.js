import React from 'react';
import Modal from '@material-ui/core/Modal';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';

const RequestResume = ({ openRequestResume, handleCloseRequestResume, request, handleRemoveToRequest, handleAddUnit, handleRemoveUnit }) => {
    let total = request.reduce(function (acum, item) {
        return acum + (Number(item.product.price) * item.units);
    }, 0);
    total = '$' + total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    return (
        <Modal
            open={openRequestResume}
            onClose={handleCloseRequestResume}
            aria-labelledby="request-resume"
            aria-describedby="request-resume-detail"
        >
            <Paper variant="elevation" elevation={8} className="paper modal">
                <Typography variant="h5" className="text-center">Detalle de solicitud</Typography>
                <Divider />
                <List>
                    {request.map(item => {
                        const price = '$' + item.product.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
                        const subtotal = '$' + item.total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
                        return (
                            <ListItem key={item.product.id}>
                                <ListItemAvatar>
                                    <Avatar alt={item.product.name} src={item.product.url} />
                                </ListItemAvatar>
                                <ListItemText primary={item.product.name} secondary={`${price} x ${item.units} = ${subtotal}`} />
                                <ListItemSecondaryAction>
                                    <IconButton edge="end" aria-label="add" color="primary" onClick={() => handleAddUnit(item.product.id)}>
                                        <AddCircleIcon />
                                    </IconButton>
                                    <IconButton edge="end" aria-label="remove" color="secondary" onClick={() => handleRemoveUnit(item.product.id)}>
                                        <RemoveCircleIcon />
                                    </IconButton>
                                    <IconButton edge="end" aria-label="delete" onClick={() => handleRemoveToRequest(item.product.id)}>
                                        <DeleteIcon />
                                    </IconButton>
                                </ListItemSecondaryAction>
                            </ListItem>
                        );
                    })}
                    <ListItem>
                        <ListItemText primary={<Typography variant="h6">Total</Typography>} />
                        <ListItemSecondaryAction>
                            <Typography variant="h6">{total}</Typography>
                        </ListItemSecondaryAction>
                    </ListItem>
                </List>
                <Divider />
                <div className="modal-action">
                    <Button variant="contained" color="primary" size="small">
                        Enviar solicitud
                    </Button>
                </div>
            </Paper>
        </Modal>
    );
}

export default RequestResume;