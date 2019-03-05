import React from 'react';
import styled from 'styled-components';
import { primary } from '~/styles/theme';

const Title = styled.h1`
    font-size: 18px;
    font-weight: bold;
    margin: 1.5em 0;
    color: ${primary};
`;

export default class NotFound extends React.Component {
    render() {
        return (
            <Title>sorry, page not found.</Title>
        );
    }
}
