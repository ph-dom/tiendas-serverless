import React, { useEffect, useRef } from 'react';
import { MDCRadio } from '@material/radio';

const InputRadio = ({ idRadio, labelText, groupName, value, selected, onChange }) => {
    const radioRef = useRef(null);

    useEffect(() => {
        new MDCRadio(radioRef.current);
    });

    return (
        <div className="mdc-form-field">
            <div ref={radioRef} className="mdc-radio">
                <input
                    className="mdc-radio__native-control"
                    type="radio"
                    id={idRadio}
                    name={groupName}
                    value={value}
                    checked={value === selected}
                    onChange={onChange}
                />
                <div className="mdc-radio__background">
                    <div className="mdc-radio__outer-circle"></div>
                    <div className="mdc-radio__inner-circle"></div>
                </div>
                <div className="mdc-radio__ripple"></div>
            </div>
            <label htmlFor={idRadio}>{labelText}</label>
        </div>
    );
};

/* state handler
onInputRadioChange = (event) => {
    let prop = event.target.name;
    let value = event.target.value;
    this.setState({
        [prop]: value
    });
}*/

export default InputRadio;