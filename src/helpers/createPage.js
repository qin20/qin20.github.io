import React from 'react';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import { store } from '~/helpers/reduxHelper';
import { GlobalStyle,  }  from '~/styles';

export default (Component) => {
    class Page extends React.Component {
        render() {
            return (
                <Provider store={store}>
                    <ThemeProvider theme={{ name: '' }}>
                        <React.Fragment>
                            <GlobalStyle />
                            <Component />
                        </React.Fragment>
                    </ThemeProvider>
                </Provider>
            );
        }
    }

    return () => <Page />;
};
