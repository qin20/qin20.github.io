// https://github.com/icd2k3/react-router-breadcrumbs-hoc#example
import React from 'react';
import { NavLink } from 'react-router-dom';
import withBreadcrumbs from 'react-router-breadcrumbs-hoc';
import styled from 'styled-components';
import routes from '~/routes';
import { borderMain, panel } from '~/styles/theme';
import * as backIconUrl from '~/assets/icons/ic_left_hover.png';

const StyledBackIcon = styled.span`
    width: 20px;
    height: 20px;
    background-image: url(${backIconUrl});
    background-repeat: no-repeat;
    background-position: center;
    display: inline-block;
    vertical-align: middle;
`;

const Breadcrumbs = ({ breadcrumbs, className }) => {
    const BackIcon = ({ props }) => {
        return props
            ? (
                <NavLink to={props.match.url}>
                    <StyledBackIcon />
                </NavLink>
            )
            : null;
    };
    const lastBreadcrumb = breadcrumbs[breadcrumbs.length - 1];
    const prevBreadcrumb = breadcrumbs[breadcrumbs.length - 2];
    return (
        <div className={className}>
            <BackIcon {...prevBreadcrumb} />
            { lastBreadcrumb ? (
                <span key={lastBreadcrumb.key}>
                    {lastBreadcrumb}
                </span>
            ) : null }
        </div>
    );
};

const StyledBreadcrumbs = styled(Breadcrumbs)`
    position: fixed;
    top: 54px;
    right: 0;
    left: 190px;
    height: 54px;
    line-height: 54px;
    overflow: hidden;
    padding: 0 20px;
    z-index: 2000;
    font-size: 18px;

    ${panel};
    border-bottom: 1px solid ${borderMain};
`;

export default withBreadcrumbs(routes, { disableDefaults: true })(StyledBreadcrumbs);
