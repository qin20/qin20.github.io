import React from 'react';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import { store } from '~/helpers/reduxHelper';
import { GlobalStyle,  }  from '~/styles';

export default (Component) => {
    class Page extends React.Component {
        componentDidMount() {
            window.mya = ['/slides/', '/blog/'].indexOf(window.location.pathname) >= 0;
            if (['/slides/', '/blog/'].indexOf(window.location.pathname) >= 0) {
                window.location.href = window.location.pathname;
            }
        }

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
