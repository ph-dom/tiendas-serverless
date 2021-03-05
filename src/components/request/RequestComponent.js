import React from 'react';
import { connect } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';
import NativeSelect from '@material-ui/core/NativeSelect';
import RequestItem from './RequestItem';
import requestStatus from '../../shared/requestStatus';

const RequestComponent = (props) => {
    console.log(props.status)
    const [status, changeStatus] = React.useState(props.status | requestStatus.CREATED);
    React.useEffect(() => {
        if(props.status !== status) {
            changeStatus(props.status);
        }
    }, [ props.status ]);
    return (
        <div className="container">
            <Grid container spacing={2} justify="center">
                <Grid item xs={12} sm={8} md={6} xl={6}>
                    <Typography variant="h4">{props.list === 'user' ? 'Mis Solicitudes' : 'Solicitudes de tienda'}</Typography>
                    <FormControl>
                        <NativeSelect
                            value={status}
                            onChange={event => changeStatus(event.target.value)}
                            inputProps={{
                                name: 'list',
                                id: 'status-list',
                            }}
                        >
                            <option value={requestStatus.CREATED}>{requestStatus.CREATED}</option>
                            <option value={requestStatus.REJECTED}>{requestStatus.REJECTED}</option>
                            <option value={requestStatus.ACCEPTED}>{requestStatus.ACCEPTED}</option>
                        </NativeSelect>
                    </FormControl>
                    {props.list === 'user' && 
                        props.userRequests.filter(req => req.status === status).map(req => {
                            console.log(props.id === req.id, props.id, req.id);
                            return (
                                <RequestItem key={req.id} request={req} viewer={props.list} marked={props.id === req.id} />
                            );
                        })}
                    {props.list === 'store' && 
                        props.storeRequests.filter(req => req.status === status).map(req => {
                            console.log(props.id === req.id, props.id, req.id);
                            return (
                                <RequestItem key={req.id} request={req} viewer={props.list} marked={props.id === req.id}/>
                            );
                        })}
                </Grid>
            </Grid>
        </div>
    );
};

const mapStateToProps = (state, props) => {
    let urlParams = new URLSearchParams(props.location.search);
    return {
        userRequests: state.userRequests,
        storeRequests: state.storeRequests,
        list: urlParams.get('list'),
        id: urlParams.get('id'),
        status: urlParams.get('status')
    };
};

export default connect(mapStateToProps)(RequestComponent);