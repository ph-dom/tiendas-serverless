import React from 'react';
import TextField from '@material-ui/core/TextField';

const InputTextOutlined = ({ textLabel, value, onChange, idInput, typeInput, nameInput }) => (
    <TextField
        id={idInput}
        label={textLabel}
        variant="outlined"
        type={typeInput}
        value={value}
        onChange={onChange}
        name={nameInput}
    />
);
export default InputTextOutlined;