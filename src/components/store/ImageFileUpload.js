import React from 'react';
import { connect } from 'react-redux';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import { startUploadPhotoUserStore } from '../../redux/store/actions';

const ImageFileUpload = (props) => {
    const inputFileRef = React.useRef(null);
    const [fileName, setFileName] = React.useState('');
    const { url } = props.store;

    const handleChangeFile = (event) => {
        setFileName(event.target.files[0].name);
    };

    const handleUploadImage = () => {
        const file = inputFileRef.current.files[0];
        props.startUploadPhotoUserStore(file, undefined, undefined, () => {
            console.log('lo logre :D');
        }, () => {
            console.log('kueck!')
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
            {fileName && <div>
                <Button variant="contained" color="primary" onClick={handleUploadImage}>
                    Guardar Imágen
                </Button>
            </div>}
            <div className="img-display" style={{backgroundImage: `url("${url}")`}} />
        </React.Fragment>
    );
};

const mapStateToProps = (state) => ({
    store: state.store
});

const mapDispatchToProps = (dispatch) => ({
    startUploadPhotoUserStore: (photo, onSnapshot, onError, successCallback, errorCallback) => dispatch(startUploadPhotoUserStore(photo, onSnapshot, onError, successCallback, errorCallback)) 
});

export default connect(mapStateToProps, mapDispatchToProps)(ImageFileUpload);