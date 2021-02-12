import React from 'react';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import KeyboardReturnIcon from '@material-ui/icons/KeyboardReturn';

const FormControlInput = ({ value, onChange, handleClickIcon }) => (
    <FormControl variant="outlined" size="small">
        <InputLabel htmlFor="ProductInput-tag">Tags</InputLabel>
        <OutlinedInput
            id="ProductInput-tag"
            type="text"
            value={value}
            onChange={onChange}
            name="tag"
            labelWidth={40}
            endAdornment={
                <InputAdornment position="end">
                    <IconButton
                        aria-label="add tag"
                        onClick={handleClickIcon}
                        edge="end"
                    >
                        <KeyboardReturnIcon />
                    </IconButton>
                </InputAdornment>
            }
        />
    </FormControl>
);

export default FormControlInput;