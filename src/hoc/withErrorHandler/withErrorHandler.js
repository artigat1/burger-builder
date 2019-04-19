import React, { Component, Fragment } from 'react';

import Modal from '../../components/UI/Modal/Modal';

const withErrorHandler = (WrappedComponent, axios) => {
    return class extends Component {
        state = {
            error: undefined,
        };

        componentDidMount() {
            axios.interceptors.request.use(req => {
                this.setState({ error: undefined });
                return req;
            });

            axios.interceptors.response.use(
                resp => resp,
                error => {
                    this.setState({ error: error.message });
                },
            );
        }

        errorConfirmedHandler = () => {
            this.setState({ error: undefined });
        };

        render() {
            return (
                <Fragment>
                    <Modal
                        show={this.state.error}
                        modalClosed={this.errorConfirmedHandler}
                    >
                        {this.state.error ? this.state.error : ''}
                    </Modal>
                    <WrappedComponent {...this.props} />
                </Fragment>
            );
        }
    };
};

export default withErrorHandler;
