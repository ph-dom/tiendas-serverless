import React from 'react';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionActions from '@material-ui/core/AccordionActions';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Divider from '@material-ui/core/Divider';
import ChatIcon from '@material-ui/icons/Chat';
import formatNumber from '../../shared/formatNumber';
import requestStatus from '../../shared/requestStatus';
import { startUpdateRequestStatus } from '../../redux/storerequests/actions';

const RequestItem = ({ request, viewer, marked }) => (
    <Accordion elevation={8}>
        <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            id={request.id}
        >
            <Typography style={{ flexBasis: '33.33%', flexGrow: '2' }} color={marked ? 'secondary' : 'textPrimary'} variant="subtitle2">{request.store.name}</Typography>
            <Typography style={{ flexGrow: '1' }} color={marked ? 'secondary' : 'textPrimary'} variant="subtitle2">{formatNumber(request.total)}</Typography>
            <Typography style={{ flexGrow: '1', textAlign: 'end' }} color={marked ? 'secondary' : 'textPrimary'} variant="subtitle2">{request.status}</Typography>
        </AccordionSummary>
        <Divider />
        <AccordionDetails>
            <List style={{ width: '100%' }}>
                {request.detail.map(item => {
                    const price = formatNumber(item.product.price);
                    const subtotal = formatNumber(item.subtotal);
                    return (
                        <ListItem key={item.product.id}>
                            <ListItemAvatar>
                                <Avatar alt={item.product.name} src={item.product.url} />
                            </ListItemAvatar>
                            <ListItemText primary={item.product.name} secondary={`${price} x ${item.units}`} />
                            <ListItemSecondaryAction>
                                <Typography variant="subtitle2">{subtotal}</Typography>
                            </ListItemSecondaryAction>
                        </ListItem>
                    );
                })}
            </List>
        </AccordionDetails>
        <Divider />
        {<AccordionActions>
            <IconButton size="small" color="secondary">
                <ChatIcon />
            </IconButton>
            {(viewer === 'store' && request.status === requestStatus.CREATED) &&
                <Button
                    size="small"
                    color="secondary"
                    variant="outlined"
                    onClick={() => startUpdateRequestStatus(request.id, requestStatus.REJECTED)}
                >
                    Rechazar
                </Button>}
            {(viewer === 'store' && request.status === requestStatus.CREATED) &&
                <Button
                    size="small"
                    color="primary"
                    variant="outlined"
                    onClick={() => startUpdateRequestStatus(request.id, requestStatus.ACCEPTED)}
                >
                    Aceptar
                </Button> }
            {(viewer === 'user' && request.status === requestStatus.ACCEPTED) &&
                <Button
                    size="small"
                    color="primary"
                    variant="outlined"
                    onClick={() => startUpdateRequestStatus(request.id, requestStatus.RECEIVED)}
                >
                    Recibido
                </Button>}
        </AccordionActions>}
    </Accordion>
);

export default RequestItem;