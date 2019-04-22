import React, { Component } from 'react';

import axios from '../../../axios-orders';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.module.css';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';

class ContactData extends Component {
    state = {
        name: '',
        email: '',
        address: {
            street: '',
            postcode: '',
        },
        loading: false,
    };

    orderHandler = event => {
        event.preventDefault();
        this.setState({ loading: true });

        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
            customer: {
                name: 'Steve Doggett',
                address: {
                    street: 'Test Street',
                    postcode: 'LDN 1',
                    country: 'UK',
                },
                email: 'test@test.com',
            },
            deliveryMethod: 'fastest',
        };

        axios
            .post('/orders.json', order)
            .then(() => {
                this.setState({ loading: false });
                this.props.history.push(`/`);
            })
            .catch(err => {
                this.setState({ loading: false });
                console.log(err);
            });
    };

    render() {
        let form = (
            <form>
                <Input
                    inputtype="input"
                    type="text"
                    name="name"
                    placeholder="Your name"
                />
                <Input
                    inputtype="input"
                    type="email"
                    name="email"
                    placeholder="Your email"
                />
                <Input
                    inputtype="input"
                    type="text"
                    name="street"
                    placeholder="Your street"
                />
                <Input
                    inputtype="input"
                    type="text"
                    name="postcode"
                    placeholder="Your postcode"
                />
                <Button btnType="Success" clicked={this.orderHandler}>
                    ORDER
                </Button>
            </form>
        );

        if (this.state.loading) {
            form = <Spinner />;
        }

        return (
            <div className={classes.ContactData}>
                <h4>Enter your contact details</h4>
                {form}
            </div>
        );
    }
}

export default ContactData;
