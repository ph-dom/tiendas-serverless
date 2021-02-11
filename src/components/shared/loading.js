import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';

const LoadingComponent = () => (
    <div className="loading-component">
        <Typography variant="h2">
            Tiendas
        </Typography>
        <CircularProgress color="primary"/>
    </div>
);

export default LoadingComponent;