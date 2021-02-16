import React from 'react';
import { connect } from 'react-redux';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import CircularProgress from '@material-ui/core/CircularProgress';
import { startUploadPhotoUserStore } from '../../redux/store/actions';
import { openModal } from '../../redux/modal/action';
import { openSnackbar } from '../../redux/snackbar/actions';

const ImageFileUpload = (props) => {
    const inputFileRef = React.useRef(null);
    const [fileName, setFileName] = React.useState('');
    const [isUploading, setIsUploading] = React.useState(false);
    const { url } = props.store;

    const handleChangeFile = (event) => {
        setFileName(event.target.files[0].name);
    };

    const handleUploadImage = () => {
        const file = inputFileRef.current.files[0];
        setIsUploading(true);
        props.startUploadPhotoUserStore(file, () => {
            props.openSnackbar('Imágen subida correctamente.');
            setIsUploading(false);
            setFileName('');
        }, () => {
            props.openModal('Error al cargar imágen. Intentar nuevamente en breve.');
            setIsUploading(false);
        });
    }

    return (
        <React.Fragment>
            <Typography variant="h5">
                Imágen
            </Typography>
            <input
                accept="image/*"
                style={{ display: 'none' }}
                id="store-image-file"
                type="file"
                multiple={false}
                ref={inputFileRef}
                onChange={handleChangeFile}
            />
            <label htmlFor="store-image-file">
                <IconButton color="primary" aria-label="upload picture" component="span">
                    <PhotoCamera />
                </IconButton>
                <Typography variant="body1" component="span">
                    {fileName}
                </Typography>
            </label>
            <div>
                {(fileName && !isUploading) && 
                    <Button variant="contained" color="primary" onClick={handleUploadImage}>
                        Guardar Imágen
                    </Button>
                }
                {(fileName && isUploading) && <CircularProgress color="primary"/> }
            </div>
            <div className="no-img-store" style={{backgroundImage: `url("${url || '/imgs/noimageavailable.svg'}")`}} />
        </React.Fragment>
    );
};

const mapStateToProps = (state) => ({
    store: state.store
});

const mapDispatchToProps = (dispatch) => ({
    startUploadPhotoUserStore: (photo, onSnapshot, onError, successCallback, errorCallback) => dispatch(startUploadPhotoUserStore(photo, onSnapshot, onError, successCallback, errorCallback)),
    openModal: (message) => dispatch(openModal(message)),
    openSnackbar: (message) => dispatch(openSnackbar(message))
});

export default connect(mapStateToProps, mapDispatchToProps)(ImageFileUpload);