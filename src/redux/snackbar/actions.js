export const openSnackbar = ({ message, color }) => ({
    type: 'OPEN_SNACKBAR',
    data: {
        open: true,
        message,
        color
    }
});

export const closeSnackbar = () => ({
    type: 'CLOSE_SNACKBAR',
    data: {
        open: false,
        message: null,
        color: null
    }
});