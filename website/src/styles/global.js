import { createGlobalStyle } from 'styled-components';

export const GlobalStyle =  createGlobalStyle`
    * {
        box-sizing: border-box;
    }

    html {
        height: 100%;
    }

    body {
        margin: 0;
        border: 0;
        padding: 0;
        min-height: 100%;
        background: #f7f7f7;
        padding-top: 150px;
    }
`;
