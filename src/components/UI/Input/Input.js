import React from 'react';

import classes from './Input.module.css';

const input = props => {
    let inputElement = undefined;

    switch (props.elementType) {
        case 'input':
            inputElement = (
                <input
                    className={classes.InputElement}
                    {...props.elementConfig}
                    value={props.value}
                />
            );
            break;

        case 'textarea':
            inputElement = (
                <textarea
                    className={classes.InputElement}
                    {...props.elementConfig}
                    value={props.value}
                />
            );
            break;

        default:
            throw Error(`Did not recognise input type ${props.elementType}`);
    }

    return (
        <div className={classes.Input}>
            <label className={classes.Label}>{props.label}</label>
            {inputElement}
        </div>
    );
};

export default input;
