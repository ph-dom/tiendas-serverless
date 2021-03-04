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
import Divider from '@material-ui/core/Divider';

const RequestItem = ({ request }) => (
    <Accordion elevation={8}>
        <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            id={request.id}
        >
            <Typography style={{ flexBasis: '33.33%', flexGrow: '2' }} variant="subtitle2">{request.store.name}</Typography>
            <Typography style={{ flexGrow: '1' }} variant="subtitle2">{'$' + request.total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}</Typography>
            <Typography style={{ flexGrow: '1', textAlign: 'end' }} variant="subtitle2">{request.status}</Typography>
        </AccordionSummary>
        <Divider />
        <AccordionDetails>
            <List style={{ width: '100%' }}>
                {request.detail.map(item => {
                    const price = '$' + item.product.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
                    const subtotal = '$' + item.subtotal.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
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
        <AccordionActions>
            <Button size="small">Cancel</Button>
            <Button size="small" color="primary">
                Save
            </Button>
        </AccordionActions>
    </Accordion>
);

export default RequestItem;