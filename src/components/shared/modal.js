import React from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import { closeModal } from '../../redux/modal/action';

const useStyles = makeStyles((theme) => ({
    paper: {
        position: 'absolute',
        width: 400,
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)'
    },
}));

const ModalComponent = ({ modal, closeModal }) => {
    const classes = useStyles();

    const handleClose = () => {
        closeModal();
    };

    return (
        <Modal
            open={modal.open}
            onClose={handleClose}
            aria-labelledby="modal-title"
            aria-describedby="modal-description"
        >
            <div className={classes.paper}>
                <h2 id="modal-title">Modal</h2>
                <p id="modal-description">
                    {modal.message}
                </p>
            </div>
        </Modal>
    );
};

const mapStateToProps = (state) => ({
    modal: state.modal
});

const mapDispatchToProps = (dispatch) => ({
    closeModal: () => dispatch(closeModal())
});

export default connect(mapStateToProps, mapDispatchToProps)(ModalComponent);