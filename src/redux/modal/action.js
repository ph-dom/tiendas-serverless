export const openModal = (message, onConfirm = null) => ({
    type: 'OPEN_MODAL',
    data: {
        open: true,
        message,
        onConfirm
    }
});

export const closeModal = () => ({
    type: 'CLOSE_MODAL',
    data: {
        open: false,
        message: null,
        onConfirm: null
    }
});