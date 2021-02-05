import React from 'react';
import Button from '@material-ui/core/Button';

const InputButtonOutlined = ({ text, onClick }) => (
    <Button variant="outlined" color="secondary" onClick={onClick}>
        {text}
    </Button>
);

export default InputButtonOutlined;