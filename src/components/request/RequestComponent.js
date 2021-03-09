import React from 'react';
import { connect } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';
import NativeSelect from '@material-ui/core/NativeSelect';
import Divider from '@material-ui/core/Divider';
import RequestItem from './RequestItem';
import requestStatus from '../../shared/requestStatus';

class RequestComponent extends React.Component {
    state = {
        status: this.props.status ? this.props.status : requestStatus.CREATED,
        id: this.props.id ? this.props.id : null,
        list: this.props.list ? this.props.list : 'user'
    };

    componentDidUpdate(prevProps) {
        console.log(prevProps.status !== this.props.status, prevProps.status, this.props.status);
        if (prevProps.status !== this.props.status) {
            this.setState({
                status: this.props.status
            });
        }
        if(prevProps.id !== this.props.id) {
            this.setState({
                id: this.props.id
            });
        }
        if(prevProps.list !== this.props.list) {
            this.setState({
                list: this.props.list
            });
        }
    }

    render() {
        const { list, status, id } = this.state;
        const { storeRequests, userRequests } = this.props;
        return (
            <div className="container">
                <Grid container spacing={2} justify="center">
                    <Grid item xs={12} sm={8} md={6} xl={6}>
                        <Typography variant="h4">{list === 'user' ? 'Mis Solicitudes' : 'Solicitudes de tienda'}</Typography>
                        <FormControl>
                            <NativeSelect
                                value={status}
                                onChange={event => this.setState({ status: event.target.value })}
                                inputProps={{
                                    name: 'list',
                                    id: 'status-list',
                                }}
                            >
                                {Object.keys(requestStatus).map(key => {
                                    return (
                                        <option value={requestStatus[key]}>{requestStatus[key]}</option>
                                    );
                                })}
                            </NativeSelect>
                        </FormControl>
                        <Divider style={{marginTop:'10px', marginBottom:'10px'}}/>
                        {list === 'user' &&
                            userRequests.filter(req => req.status === status).map(req => {
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
                            storeRequests.filter(req => req.status === status).map(req => {
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