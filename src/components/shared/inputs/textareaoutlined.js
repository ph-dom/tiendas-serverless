import React, { useEffect, useRef } from 'react';
import { MDCTextField } from '@material/textfield';

const InputTextareaOutlined = ({ rows, cols, maxLength, spanText, idTextarea, idSpan, value, onChange }) => {
    const textareaRef = useRef(null);

    useEffect(() => {
        new MDCTextField(textareaRef.current); 
    });

    return (
        <label ref={textareaRef} className="mdc-text-field mdc-text-field--outlined mdc-text-field--textarea mdc-text-field--with-internal-counter">
            <span className="mdc-notched-outline">
                <span className="mdc-notched-outline__leading"></span>
                <span className="mdc-notched-outline__notch">
                    <span className="mdc-floating-label" id={idSpan}>{spanText}</span>
                </span>
                <span className="mdc-notched-outline__trailing"></span>
            </span>
            <span className="mdc-text-field__resizer">
                <textarea
                    id={idTextarea}
                    className="mdc-text-field__input"
                    aria-labelledby={idSpan}
                    rows={rows}
                    cols={cols}
                    maxLength={maxLength}
                    value={value}
                    onChange={onChange}
                />
                <span className="mdc-text-field-character-counter">0 / {maxLength}</span>
            </span>
        </label>
    );
};

/* state handler
onInputCheckboxChange = (event) => {
    let prop = event.target.id.replace('SigninInput-', '');
    let value = event.target.checked;
    this.setState({
        [prop]: value
    });
}*/

export default InputTextareaOutlined;