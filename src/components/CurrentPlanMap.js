import {Component} from "react";
import GoogleMap from "./GoogleMap";
import Marker from "./Marker";
import axios from 'axios';

import {LOS_ANGELES_CENTER, GOOGLE_SEARCH_KEY} from "../const/constant";

const styles = require("../styles/GoogleMapStyle.json");

// Return map bounds based on list of places
const getMapBounds = (map, maps, places) => {
    const bounds = new maps.LatLngBounds();

    places.forEach((place) => {
        bounds.extend(new maps.LatLng(
            place.geometry.location.lat,
            place.geometry.location.lng,
        ));
    });
    return bounds;
};

// Re-center map when resizing the window
const bindResizeListener = (map, maps, bounds) => {
    maps.event.addDomListenerOnce(map, 'idle', () => {
        maps.event.addDomListener(window, 'resize', () => {
            map.fitBounds(bounds);
        });
    });
};

// Fit map to its bounds after the api is loaded
const apiIsLoaded = (map, maps, places) => {
    const flightPath = new maps.Polyline({
        path:
            places.map((place) => (
                // 0.002 insets to avoid weird line position
                {lat: place.geometry.location.lat, lng: place.geometry.location.lng}
            )),
        geodesic: true,
        strokeColor: "#21265f",
        strokeOpacity: 1.0,
        strokeWeight: 3,
    });
    flightPath.setMap(map);

    // Get bounds by our places
    const bounds = getMapBounds(map, maps, places);
    // Fit map to bounds
    map.fitBounds(bounds);
    // Bind the resize listener
    bindResizeListener(map, maps, bounds);
};

class CurrentPlanMap extends Component {
    constructor(props) {
        super(props);
        this.state = {
            places: []
        }
    }

    componentDidMount() {
        const atts = this.props.currentAttractionPlan;
        var res = []
        for (var i = 0; i < atts.length; i++) {
            const proxy = "https://cors-anywhere.herokuapp.com/";
            const base = "https://maps.googleapis.com/maps/api/place/details/json?";
            const API_KEY = GOOGLE_SEARCH_KEY;
            const url = `${base}place_id=${atts[i]}&fields=geometry,name,url,rating&key=${API_KEY}`;
            const finalUrl = proxy + url;

            axios.get(finalUrl)
                .then(response => {
                    console.log("detail response", response.data.result);
                    res.push(response.data.result);
                    this.setState({places: res})
                })
                .catch(err => {
                    console.log("err in get detail", err);
                })
        }
    }

    // onChildClick callback can take two arguments: key and childProps
    onMapChildEventCallBack = (key) => {
        this.setState((state) => {
            const index = state.places.findIndex((e) => e.id === key);
            // state.places[index].show = !state.places[index].show; // eslint-disable-line no-param-reassign
            return {places: state.places};
        });
    };

    render() {
        const {places} = this.state;
        return (
            <GoogleMap
                defaultZoom={10}
                defaultCenter={LOS_ANGELES_CENTER}
                options={{
                    // disableDefaultUI: true, // disable default map UI
                    draggable: true, // make map draggable
                    keyboardShortcuts: false, // disable keyboard shortcuts
                    scaleControl: false, // allow scale controle
                    disableDoubleClickZoom: true, // disable double click to zoom
                    scrollwheel: false, // allow scroll wheel
                    clickableIcons: false, // disable click on landmarks
                    styles: styles // change default map styles
                }}
                yesIWantToUseGoogleMapApiInternals
                onGoogleApiLoaded={({map, maps}) => apiIsLoaded(map, maps, places)}
                onChildMouseEnter={this.onMapChildEventCallBack}
                onChildMouseLeave={this.onMapChildEventCallBack}
            >
                {[...Array(places.length).keys()].map(i => (
                    <Marker
                        key={places[i].id}
                        index={i + 1}
                        lat={places[i].geometry.location.lat}
                        lng={places[i].geometry.location.lng}
                        show={false}
                        place={places[i]}
                    />
                ))}
            </GoogleMap>
        )
    }
}

export default CurrentPlanMap;