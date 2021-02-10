import React from 'react';
import TextField from '@material-ui/core/TextField';

const InputTextareaOutlined = ({ textLabel, value, onChange, nameInput, idInput }) => (
    <TextField
        id={idInput}
        name={nameInput}
        label={textLabel}
        multiline={true}
        variant="outlined"
        value={value}
        onChange={onChange}
        rows={3}
        size="small"
    />
);
export default InputTextareaOutlined;