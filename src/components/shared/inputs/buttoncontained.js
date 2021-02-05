import React from 'react';
import Button from '@material-ui/core/Button';

const InputButtonContained = ({ text, idForm }) => (
    <Button variant="contained" color="primary" form={idForm} type="submit">
        {text}
    </Button>
);


export default InputButtonContained;