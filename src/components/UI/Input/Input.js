import React from 'react';

import classes from './Input.module.css';

const input = props => {
    let inputElement = undefined;
    let validationError = undefined;
    const inputClasses = [classes.InputElement];

    if (props.invalid && props.shouldValidate && props.touched) {
        inputClasses.push(classes.Invalid);
        validationError = props.errorMessage;
    }

    switch (props.elementType) {
        case 'input':
            inputElement = (
                <input
                    className={inputClasses.join(' ')}
                    onChange={props.changed}
                    {...props.elementConfig}
                    value={props.value}
                />
            );
            break;

        case 'textarea':
            inputElement = (
                <textarea
                    className={inputClasses.join(' ')}
                    onChange={props.changed}
                    {...props.elementConfig}
                    value={props.value}
                />
            );
            break;

        case 'select':
            inputElement = (
                <select
                    className={inputClasses.join(' ')}
                    value={props.value}
                    onChange={props.changed}
                >
                    {props.elementConfig.options.map(option => (
                        <option key={option.value} value={option.value}>
                            {option.displayValue}
                        </option>
                    ))}
                </select>
            );
            break;

        default:
            inputElement = (
                <input
                    className={inputClasses.join(' ')}
                    onChange={props.changed}
                    {...props.elementConfig}
                    value={props.value}
                />
            );
            break;
    }

    return (
        <div className={classes.Input}>
            <label className={classes.Label}>{props.label}</label>
            {inputElement}
            <p className={classes.ValidationError}>{validationError}</p>
        </div>
    );
};

export default input;
