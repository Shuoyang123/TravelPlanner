import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import GoogleMapReact from 'google-map-react';

import { GOOGLE_MAP_KEY } from "../const/constant";

const Wrapper = styled.main`
  width: 80vh;
  height: 90%;
`;

const GoogleMap = ({ children, ...props }) => (
    <Wrapper>
        <GoogleMapReact
            bootstrapURLKeys={{
                key: GOOGLE_MAP_KEY,
                language: 'en',
                region: 'en'
            }}
            {...props}
        >
            {children}
        </GoogleMapReact>
    </Wrapper>
);

GoogleMap.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.node,
        PropTypes.arrayOf(PropTypes.node),
    ]),
};

GoogleMap.defaultProps = {
    children: null,
};

export default GoogleMap;