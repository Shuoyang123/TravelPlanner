import {Component} from "react";
import GoogleMap from "./GoogleMap";
import {LOS_ANGELES_CENTER} from "../const/constant";
import Marker from "./Marker";

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
                {lat: place.geometry.location.lat - 0.002, lng: place.geometry.location.lng + 0.002}
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
        fetch('places.json')
            .then((response) => response.json())
            .then((data) => {
                data.results.forEach((result) => {
                    result.show = false; // eslint-disable-line no-param-reassign
                });
                this.setState({places: data.results});
            });
    }

    // onChildClick callback can take two arguments: key and childProps
    onMapChildEventCallBack = (key) => {
        this.setState((state) => {
            const index = state.places.findIndex((e) => e.id === key);
            state.places[index].show = !state.places[index].show; // eslint-disable-line no-param-reassign
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
                {places.map((place) => (
                    <Marker
                        key={place.id}
                        text={place.index}
                        lat={place.geometry.location.lat}
                        lng={place.geometry.location.lng}
                        show={place.show}
                        place={place}
                    />
                ))}
            </GoogleMap>
        )
    }
}

export default CurrentPlanMap;