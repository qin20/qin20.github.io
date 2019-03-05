import React from 'react';
import styled from 'styled-components';
import { primary } from '~/styles/theme';
import createPage from '~/helpers/createPage';

const StyledSection = styled.section`
    min-width: 840px;
    padding: 20px;
    text-align: center;
`;

const Title = styled.h1`
    font-size: 18px;
    font-weight: bold;
    margin: 1.5em 0;
    color: ${primary};
`;

const Avatar = styled.div`
    width: 120px;
    height: 120px;
    margin: auto;
    border-radius: 50%;
    border: 10px solid #ffffff;
    box-shadow: 0 2px 5px #eeeeee;
    background: url(/static/img/avatar.jpg) no-repeat left top;
    background-size: cover;
`;

class Index extends React.Component {
    render() {
        return (
            <StyledSection>
                <Avatar></Avatar>
                <Title>Qin YuanBin</Title>
                <a href="/blog/">我的博客</a>
            </StyledSection>
        );
    }
}

export default createPage(Index);
