import React from 'react';
import TextField from '@material-ui/core/TextField';

const InputTextOutlined = ({ textLabel, value, onChange, idInput, typeInput, nameInput, placeholder }) => (
    <TextField
        id={idInput}
        label={textLabel}
        variant="outlined"
        type={typeInput}
        value={value}
        onChange={onChange}
        name={nameInput}
        size="small"
        placeholder={placeholder ? placeholder : ''}
    />
);
export default InputTextOutlined;