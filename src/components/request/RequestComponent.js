import React from 'react';
import { connect } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import RequestItem from './RequestItem';

const RequestComponent = ({ userRequests }) => (
    <div className="container">
        <Grid container spacing={2} justify="center">
            <Grid item xs={12} sm={8} md={6} xl={6}>
                <Typography variant="h4">Mis Solicitudes</Typography>
                {userRequests.map(req => {
                    return (
                        <RequestItem key={req.id} request={req} />
                    );
                })}
            </Grid>
        </Grid>
    </div>
);

const mapStateToProps = (state) => ({
    userRequests: state.userRequests
});

export default connect(mapStateToProps)(RequestComponent);