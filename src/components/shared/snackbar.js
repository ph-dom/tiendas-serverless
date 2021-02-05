import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { StateContext } from './base'

const SnackbarComponent = () => {
    const value = React.useContext(StateContext);
    
    const handleClose = (event, reason) => {
        value.handleToggleStackbar({
            open: false,
            severity: null,
            message: null
        });
    };
    
    return (
        <Snackbar open={value.snackbar.open} autoHideDuration={6000} onClose={handleClose}>
            <MuiAlert elevation={6} variant="filled" severity={value.snackbar.severity} onClose={handleClose}>
                {value.snackbar.message}
            </MuiAlert>
        </Snackbar>
    );
}

export default SnackbarComponent;