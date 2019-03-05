import themer from '~/helpers/themer';
import { css } from 'styled-components';

// colors
export const white = '#fff';
export const dark = '#222';
export const grayLight = '#eff1f5';
export const blueDark = '#2655a1';
export const red = 'red';

// theme
export const primary = themer({
    default: blueDark
});

export const danger = themer({
    default: red
});

export const borderMain = themer({
    default: grayLight
});

export const panel = themer({
    default: css`
        color: ${dark};
        background: ${white};
    `,
    red: css`
        color: ${white};
        background: ${blueDark};
    `
});
