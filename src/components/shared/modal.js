import React from 'react';
import { connect } from 'react-redux';
import Modal from '@material-ui/core/Modal';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import { closeModal } from '../../redux/modal/action';

const ModalComponent = ({ modal, closeModal }) => {
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
            <Card raised={true} className="modal">
                <CardContent>
                    <Typography id="modal-title" variant="subtitle1" gutterBottom>
                        Ha ocurrido un error
                    </Typography>
                    <Divider variant="fullWidth"/>
                    <Typography id="modal-description" variant="body1">
                        {modal.message}
                    </Typography>
                </CardContent>
                <CardActions className="modal-action">
                    <Button color="primary" size="small" variant="contained" onClick={handleClose}>Aceptar</Button>
                </CardActions>
            </Card>
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