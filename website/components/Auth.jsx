import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

export default class Auth extends Component {
    constructor() {
        super();
    }

    render() {
        const { permission, children, fallback } = this.props;
        if (permission) {
            return children;
        } else {
            return fallback || <Redirect to='/login' from={this.props.location} />;
        }
    }
}
