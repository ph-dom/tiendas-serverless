import React from 'react';
import { connect } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';
import NativeSelect from '@material-ui/core/NativeSelect';
import Divider from '@material-ui/core/Divider';
import RequestItem from './RequestItem';
import requestStatus from '../../shared/requestStatus';

const RequestComponent = (props) => {
    const { storeRequests, userRequests, status, id, list } = props;
    const [ currentStatus, setCurrentStatus ] = React.useState(status || requestStatus.CREATED);
    return (
        <div className="container">
            <Grid container spacing={2} justify="center">
                <Grid item xs={12} sm={8} md={6} xl={6}>
                    <Typography variant="h4">{list === 'user' ? 'Mis Solicitudes' : 'Solicitudes de tienda'}</Typography>
                    <FormControl>
                        <NativeSelect
                            value={currentStatus}
                            onChange={event => setCurrentStatus(event.target.value)}
                            inputProps={{
                                name: 'list',
                                id: 'status-list',
                            }}
                        >
                            {Object.keys(requestStatus).map(key => {
                                return (
                                    <option
                                        key={requestStatus[key].toLowerCase()}
                                        value={requestStatus[key]}
                                    >
                                        {requestStatus[key]}
                                    </option>
                                );
                            })}
                        </NativeSelect>
                    </FormControl>
                    <Divider style={{marginTop:'10px', marginBottom:'10px'}}/>
                    {list === 'user' &&
                        userRequests.filter(req => req.status === currentStatus).map(req => {
                            return (
                                <RequestItem
                                    key={req.id}
                                    request={req}
                                    viewer={list}
                                    marked={id === req.id}
                                />
                            );
                        })}
                    {list === 'store' &&
                        storeRequests.filter(req => req.status === currentStatus).map(req => {
                            return (
                                <RequestItem
                                    key={req.id}
                                    request={req}
                                    viewer={list}
                                    marked={id === req.id}
                                />
                            );
                        })}
                </Grid>
            </Grid>
        </div>
    );
}

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