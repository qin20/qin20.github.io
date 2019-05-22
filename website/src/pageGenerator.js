import React from 'react';
import ReactDOM from 'react-dom';
import { ThemeProvider } from 'styled-components';
import { GlobalStyle }  from './styles';

export default (Component) => {
    class Page extends React.Component {
        render() {
            return (
                <ThemeProvider theme={{ name: '' }}>
                    <React.Fragment>
                        <GlobalStyle />
                        <Component />
                    </React.Fragment>
                </ThemeProvider>
            );
        }
    }

    ReactDOM.render(<Page />, document.body);
};
