import React, { useEffect, useRef } from 'react';
import { MDCCheckbox } from '@material/checkbox';

const InputCheckbox = ({ idCheckbox, labelText, isChecked, onChange }) => {
    const checkboxRef = useRef(null);

    useEffect(() => {
        new MDCCheckbox(checkboxRef.current);
    });

    return (
        <div className="mdc-form-field">
            <div ref={checkboxRef} className="mdc-checkbox">
                <input
                    type="checkbox"
                    className="mdc-checkbox__native-control"
                    id={idCheckbox}
                    checked={isChecked}
                    onChange={onChange}
                />
                <div className="mdc-checkbox__background">
                    <svg className="mdc-checkbox__checkmark"
                        viewBox="0 0 24 24">
                        <path className="mdc-checkbox__checkmark-path"
                            fill="none"
                            d="M1.73,12.91 8.1,19.28 22.79,4.59" />
                    </svg>
                    <div className="mdc-checkbox__mixedmark"></div>
                </div>
                <div className="mdc-checkbox__ripple"></div>
            </div>
            <label htmlFor={idCheckbox}>{labelText}</label>
        </div>
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

export default InputCheckbox;