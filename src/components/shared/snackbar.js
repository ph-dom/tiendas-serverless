import React from 'react';
import { connect } from 'react-redux';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import { closeSnackbar } from '../../redux/snackbar/actions';

const SnackbarComponent = ({ snackbar, closeSnackbar }) => {
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        closeSnackbar();
    };

    return (
        <Snackbar
            anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            open={snackbar.open}
            autoHideDuration={6000}
            onClose={handleClose}
            message={snackbar.message}
            action={
                <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
                    <CloseIcon fontSize="small" />
                </IconButton>
            }
        />
    );
}

const mapStateToProps = (state) => ({
    snackbar: state.snackbar
});

const mapDispatchToProps = (dispatch) => ({
    closeSnackbar: () => dispatch(closeSnackbar())
});

export default connect(mapStateToProps, mapDispatchToProps)(SnackbarComponent);