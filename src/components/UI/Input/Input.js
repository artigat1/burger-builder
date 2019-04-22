import React from 'react';

import classes from './Input.module.css';

const input = props => {
    let inputElement = undefined;

    switch (props.inputtype) {
        case 'input':
            inputElement = (
                <input className={classes.InputElement} {...props} />
            );
            break;

        case 'textarea':
            inputElement = (
                <textarea className={classes.InputElement} {...props} />
            );
            break;

        default:
            throw Error(`did not recognise input type ${props.type}`);
    }

    return (
        <div className={classes.Input}>
            <label className={classes.Label}>{props.label}</label>
            {inputElement}
        </div>
    );
};

export default input;
