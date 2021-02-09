export const openModal = (message) => ({
    type: 'OPEN_MODAL',
    data: {
        open: true,
        message
    }
});

export const closeModal = () => ({
    type: 'CLOSE_MODAL',
    data: {
        open: false,
        message: null
    }
});