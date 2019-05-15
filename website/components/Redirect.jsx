import React from 'react';
import createPage from '~/helpers/createPage';

class Redirect extends React.Component {
    componentDidMount() {
        window.location.reload();
    }

    render() {
        return null;
    }
}

export default createPage(Redirect);
