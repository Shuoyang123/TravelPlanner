import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import GoogleMapReact from 'google-map-react';

const Wrapper = styled.main`
  width: 80vh;
  height: 100%;
  float: right;
`;

const GoogleMap = ({ children, ...props }) => (
    <Wrapper>
        <GoogleMapReact
            bootstrapURLKeys={{
                key: "AIzaSyBmEEKLoJ7e636pV2SFcLrSzammTvfCFV8",
                language: 'en'
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