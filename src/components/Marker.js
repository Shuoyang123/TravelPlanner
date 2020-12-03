import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

// InfoWindow component
const InfoWindow = (props) => {
    const { place } = props;
    const infoWindowStyle = {
        position: 'relative',
        bottom: 150,
        left: '-45px',
        width: 220,
        backgroundColor: 'white',
        borderRadius: '5%',
        boxShadow: '0 2px 7px 1px rgba(0, 0, 0, 0.3)',
        padding: 10,
        fontSize: 14,
        zIndex: 100,
    };

    return (
        <div style={infoWindowStyle}>
            <div style={{ fontSize: 16 }}>
                {place.name}
            </div>
            <div style={{ fontSize: 14 }}>
        <span style={{ color: 'grey' }}>
          {place.rating}
            {' '}
        </span>
                <span style={{ color: 'orange' }}>
          {String.fromCharCode(9733).repeat(Math.floor(place.rating))}
        </span>
                <span style={{ color: 'lightgrey' }}>
          {String.fromCharCode(9733).repeat(5 - Math.floor(place.rating))}
        </span>
            </div>
            <div style={{ fontSize: 14, color: 'grey' }}>
                {place.types[0]}
            </div>
            <div style={{ fontSize: 14, color: 'grey' }}>
                {'$'.repeat(place.price_level)}
            </div>
            <div style={{ fontSize: 14, color: 'green' }}>
                {place.opening_hours.open_now ? 'Open' : 'Closed'}
            </div>
        </div>
    );
};

// Marker component
const Marker = ({ show, place }) => {
    const markerStyle = {
        textAlign: "center",
        border: '1px solid white',
        borderRadius: '25%',
        height: 20,
        width: 20,
        backgroundColor: show ? 'gray' : 'black',
        color: 'white',
        verticalAlign: 'middle',
        lineHeight: '20px' ,
        cursor: 'pointer',
        zIndex: 10,
    };

    return (
        <>
            <div style={markerStyle} >
                { place.index }
            </div>
            {show && <InfoWindow place={place} />}
        </>
    );
};

InfoWindow.propTypes = {
    place: PropTypes.shape({
        name: PropTypes.string,
        formatted_address: PropTypes.string,
        rating: PropTypes.number,
        types: PropTypes.arrayOf(PropTypes.string),
        price_level: PropTypes.number,
        opening_hours: PropTypes.shape({
            open_now: PropTypes.bool,
        }),
    }).isRequired,
};

Marker.propTypes = {
    show: PropTypes.bool.isRequired,
    place: PropTypes.shape({
        index: PropTypes.number,
        name: PropTypes.string,
        formatted_address: PropTypes.string,
        rating: PropTypes.number,
        types: PropTypes.arrayOf(PropTypes.string),
        price_level: PropTypes.number,
        opening_hours: PropTypes.shape({
            open_now: PropTypes.bool,
        }),
    }).isRequired,
};

export default Marker;