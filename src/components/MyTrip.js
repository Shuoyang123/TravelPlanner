import React, {Component} from 'react';
import {Tabs, Radio} from 'antd';
import Attraction from './Attraction.js'
import {Button} from 'antd';
import axios from 'axios';
import SearchAttractionButton from './SearchAttractionButton.js'
import Marker from "./Marker";
import GoogleMap from "./GoogleMap";

import { LOS_ANGELES_CENTER } from '../const/constant';

const styles = require("../styles/GoogleMapStyle.json");

const {TabPane} = Tabs;

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

class MyTrip extends Component {
    constructor(props) {
        super(props);
        this.state = {
            attractionsId: [],
            attractionsName: [],
            attractionPlan: [],   //2D array: each element contains all attractions in that day
            mode: 'top',
            places: [],
        };
    }

    // componentDidMount(){
    //   // const dates = this.props.datesList   !!!First
    //   const dates = ["2020-02-01", "2020-02-02", "2020-02-03", "2020-02-04", "2020-02-05"];
    //   this.search(this.props.cityName);
    //   for(var i = 0; i < dates.length; i++){
    //     this.state.attractionPlan.push([]);
    //   }
    // }


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
    onChildEventCallBack = (key) => {
        this.setState((state) => {
            const index = state.places.findIndex((e) => e.id === key);
            state.places[index].show = !state.places[index].show; // eslint-disable-line no-param-reassign
            return {places: state.places};
        });
    };

    search = (place) => {
        const proxy = "https://cors-anywhere.herokuapp.com/";
        const base = "https://maps.googleapis.com/maps/api/place/findplacefromtext/json?";
        const API_KEY = "AIzaSyC9yzILpgwBgwf0h4rxnsXh1gNVAe8Jzow";
        const url = `${base}input=${place}&inputtype=textquery&fields=geometry&key=${API_KEY}`;
        const finalUrl = proxy + url;
        axios.get(finalUrl)
            .then(response => {
                const location = response.data.candidates[0].geometry.location;
                console.log(location);
                this.searchAround(location.lat, location.lng);
            })
            .catch(error => {
                console.log("err in fetch data", error);
            })
    }

    searchAround = (lat, lng) => {
        const type = "tourist_attraction";
        const proxy = "https://cors-anywhere.herokuapp.com/";
        const base = "https://maps.googleapis.com/maps/api/place/nearbysearch/json?";
        const API_KEY = "AIzaSyC9yzILpgwBgwf0h4rxnsXh1gNVAe8Jzow";
        const url = `${base}location=${lat},${lng}&radius=50000&type=${type}&key=${API_KEY}`;
        const finalUrl = proxy + url;
        axios.get(finalUrl)
            .then(response => {
                console.log(response);
                const attractions = response.data.results;
                this.updateAroundAttractions(attractions);
            })
            .catch(error => {
                console.log("err in fetch data", error);
            })
    }

    updateAroundAttractions = (attractions) => {
        this.setState({
            attractionsId: attractions.map((attraction) => {
                return attraction.place_id;
            }),
            attractionsName: attractions.map((attraction) => {
                return attraction.name;
            }),
        });
    };

    handleModeChange = e => {
        const mode = e.target.value;
        this.setState({mode});
    };

    updatePlan = (chosenAttraction, chosenDate) => {
        //update state
    }

    getRecommendation = () => {

    }

    save = () => {

    }

    render() {
        const {places} = this.state;
        const {mode} = this.state;
        // const dates = this.props.datesList;       !!!!!Second
        const dates = ["2020-02-01", "2020-02-02", "2020-02-03", "2020-02-04", "2020-02-05"];
        const operations = <SearchAttractionButton places={this.state.attractionsName}/>
        return (
            <div className="mytrip">
                <div className="left-side">
                    <div className="list">
                        <Radio.Group onChange={this.handleModeChange} value={mode} style={{marginBottom: 10}}>
                            <Radio.Button value="top">Horizontal</Radio.Button>
                            <Radio.Button value="left">Vertical</Radio.Button>
                        </Radio.Group>
                        <Tabs tabBarExtraContent={operations} defaultActiveKey="1" tabPosition={mode}
                              style={{height: 220}}>
                            {[...Array(dates.length).keys()].map(i => (
                                <TabPane tab={dates[i]} key={i}>
                                    <Attraction dayTime={i} attractions={this.state.attractionPlan[i]}/>
                                </TabPane>
                            ))}
                        </Tabs>
                    </div>
                    <div className="button">
                        <Button onClick={this.getRecommendation}> get recommendation</Button>
                        <Button onClick={this.save}> save</Button>
                    </div>
                </div>

                <div className="right-side">
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
                        // onChildClick={this.onChildClickCallback}
                        onChildMouseEnter={this.onChildEventCallBack}
                        onChildMouseLeave={this.onChildEventCallBack}
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
                </div>

            </div>

        );
    }
}

export default MyTrip;
