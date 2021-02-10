export const openSnackbar = (message) => ({
    type: 'OPEN_SNACKBAR',
    data: {
        open: true,
        message
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