import React from 'react';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import { Router } from 'react-router-dom';
import { renderRoutes } from "react-router-config";

import { store } from '~/helpers/reduxHelper';
import { history } from '~/helpers/history';
import routes from '~/routes';

import { GlobalStyle }  from '~/styles';

class App extends React.Component {
    render() {
        return (
            <Provider store={store}>
                <ThemeProvider theme={{ name: '' }}>
                    <Router
                        history={history}
                    >
                        <React.Fragment>
                            <GlobalStyle />
                            {renderRoutes(routes)}
                        </React.Fragment>
                    </Router>
                </ThemeProvider>
            </Provider>
        );
    }
}

export default App;
