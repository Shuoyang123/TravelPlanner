import React, {Component} from "react";
import {Avatar, Button, Checkbox, List} from "antd";
import axios from 'axios';
import {GOOGLE_SEARCH_KEY, API_SERVER} from '../const/constant';
import PlacesAutocomplete from 'react-places-autocomplete';
import {SearchOutlined} from '@material-ui/icons'

const count = 3;
const fakeDataUrl = `https://randomuser.me/api/?results=${count}&inc=name,gender,email,nat&noinfo`;

const fakePlaceName = ["Chrysler Building", "Times Square", "Henry Hudson Bridge", "Lincoln Center for the Performing Arts", "Radio City Music Hall",
    "Rockefeller Center", "The Museum of Modern Art", "American Museum of Natural History", "Empire State Building", "Solomon R. Guggenheim Museum"];
const fakePlaceId = ["ChIJN0qhSgJZwokRmQJ-MIEQq08", "ChIJmQJIxlVYwokRLgeuocVOGVU", "ChIJtT1iDe_zwokRdUvlbh_VU3Y",
    "ChIJN6W-X_VYwokRTqwcBnTw1Uk", "ChIJPS8b1vhYwokRldqq2YHmxJI", "ChIJ9U1mz_5YwokRosza1aAk0jM",
    "ChIJKxDbe_lYwokRVf__s8CPn-o", "ChIJCXoPsPRYwokRsV1MYnKBfaI", "ChIJaXQRs6lZwokRY6EFpJnhNNE", "ChIJmZ5emqJYwokRuDz79o0coAQ"];
const fakePlaceDetail = [{"place_id": "ChIJN0qhSgJZwokRmQJ-MIEQq08","icon":"https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/generic_business-71.png","name":"Chrysler Building","url":"https://maps.google.com/?q=Manhattan,+New+York,+NY+10174,+USA&ftid=0x89c259024aa14a37:0x4fab1081307e0299"},{"place_id": "ChIJmQJIxlVYwokRLgeuocVOGVU","icon":"https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/generic_business-71.png","name":"Times Square","url":"https://maps.google.com/?cid=6132018978369701678"},{"place_id": "ChIJtT1iDe_zwokRdUvlbh_VU3Y","icon":"https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/generic_business-71.png","name":"Lincoln Center for the Performing Arts","url":"https://maps.google.com/?cid=5320422915917524046"},{"place_id": "ChIJN6W-X_VYwokRTqwcBnTw1Uk", "icon":"https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/generic_business-71.png","name":"Radio City Music Hall","url":"https://maps.google.com/?cid=10575831270349789845"},{"place_id": "ChIJPS8b1vhYwokRldqq2YHmxJI", "icon":"https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/generic_business-71.png","name":"Henry Hudson Bridge","url":"https://maps.google.com/?cid=8526392850523704181"},{"place_id": "ChIJ9U1mz_5YwokRosza1aAk0jM", "icon":"https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/generic_business-71.png","name":"Rockefeller Center","url":"https://maps.google.com/?cid=3734087314244816034"},{"place_id": "ChIJKxDbe_lYwokRVf__s8CPn-o", "icon":"https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/museum-71.png","name":"The Museum of Modern Art","url":"https://maps.google.com/?cid=16906389583988522837"},{"place_id": "ChIJCXoPsPRYwokRsV1MYnKBfaI", "icon":"https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/museum-71.png","name":"American Museum of Natural History","url":"https://maps.google.com/?cid=11708656934508584369"},{"place_id": "ChIJaXQRs6lZwokRY6EFpJnhNNE", "icon":"https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/generic_business-71.png","name":"Empire State Building","url":"https://maps.google.com/?cid=15074921902713971043"},{"place_id": "ChIJmZ5emqJYwokRuDz79o0coAQ","icon":"https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/museum-71.png","name":"Solomon R. Guggenheim Museum","url":"https://maps.google.com/?cid=333297768485043384"}];

// const searchOptions = {
//     location: new window.google.maps.LatLng(this.props.lat, this.props.lng),
//     radius: 5000,
//     type: ["address"]
// }

class SearchAttractionList extends Component {
    constructor(props) {
        super(props);
        // console.log("id", this.props.attractionsId);
        // console.log("name", this.props.attractionsName);
        // console.log("detail", this.props.attractionsDetail);
        this.state = {
            lat: "",
            lng: "",
            searchText: '',
            chosenPlace: [],
            attractionsId: [],
            attractionsName: [],
            attractionsDetail: [],
        };
    }

    searchTextOnChange = searchText => {
        this.setState({ searchText });
    };

    selectOnChange = (_, placeId) => {
        this.setState({ searchText: '', placeId})
        console.log(placeId);

         const proxy = "https://cors-anywhere.herokuapp.com/";
         const base = "https://maps.googleapis.com/maps/api/place/details/json?";
         const API_KEY = "AIzaSyC9yzILpgwBgwf0h4rxnsXh1gNVAe8Jzow";
         const url = `${base}place_id=${placeId}&fields=name,icon,url,place_id,geometry,rating&key=${API_KEY}`;
         const finalUrl = proxy + url;

         axios.get(finalUrl)
              .then(response => {
                console.log("detail response", response);
                const each = response.data.result;
                this.setState({
                    attractionsDetail: [...this.state.attractionsDetail, each],
                });
              })
              .catch(err => {
                console.log("err in get detail", err);
              })

    }

    onChange = e => {
      console.log(e);
        const { dataInfo, checked } = e.target;
        const {chosenPlace} = this.state;
        const list = this.addOrRemove(dataInfo, checked, chosenPlace);
        this.setState({ chosenPlace: list })
    }

    addOrRemove = (item, status, list) => {
        const found = list.some( entry => entry.name === item.name);
        if(status && !found){
            list.push(item)
        }

        if(!status && found){
            list = list.filter( entry => {
                return entry.name !== item.name;
            });
        }
        return list;
    }

    addToPlan = () => {
      const chosen = this.state.chosenPlace;
      this.props.addPlan(chosen.map(entry => {
        return entry.place_id;
      }))
    }

    componentDidMount(){
      this.search(this.props.cityName);
    }

    search = (place) => {
        const proxy = "https://cors-anywhere.herokuapp.com/";
        const base = "https://maps.googleapis.com/maps/api/place/findplacefromtext/json?";
        const API_KEY = GOOGLE_SEARCH_KEY;
        const url = `${base}input=${place}&inputtype=textquery&fields=geometry&key=${API_KEY}`;
        const finalUrl = proxy + url;
        axios.get(finalUrl)
            .then(response => {
                const location = response.data.candidates[0].geometry.location;
                // console.log(location);
                this.setState({
                    lat: location.lat,
                    lng: location.lng,
                })
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
        const API_KEY = GOOGLE_SEARCH_KEY;
        const url = `${base}location=${lat},${lng}&radius=50000&type=${type}&key=${API_KEY}`;
        const finalUrl = proxy + url;
        axios.get(finalUrl)
            .then(response => {
                // console.log(response);
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
        this.updateAttractionsDetail();
    };

    updateAttractionsDetail = () => {
        const placeID = this.state.attractionsId;
        for (var i = 0; i < placeID.length; i++) {
            const proxy = "https://cors-anywhere.herokuapp.com/";
            const base = "https://maps.googleapis.com/maps/api/place/details/json?";
            const API_KEY = GOOGLE_SEARCH_KEY;
            const url = `${base}place_id=${placeID[i]}&fields=name,icon,url,place_id,rating,geometry&key=${API_KEY}`;
            const finalUrl = proxy + url;

            axios.get(finalUrl)
                .then(response => {
                    console.log("detail response", response);
                    const each = response.data.result;
                    this.setState({
                        attractionsDetail: [...this.state.attractionsDetail, each],
                    });
                })
                .catch(err => {
                    console.log("err in get detail", err);
                })
        }

    }

    render() {
      console.log("id", this.state.attractionsId);
      console.log("name", this.state.attractionsName);
      console.log("detail", this.state.attractionsDetail);
        return (
            <div>
                <div className="search_bar">

                    <PlacesAutocomplete
                        value={this.state.searchText}
                        onChange={this.searchTextOnChange}
                        onSelect={this.selectOnChange}
                        searchOptions={{location: new window.google.maps.LatLng(this.props.lat, this.props.lng),
                            radius: 5000,
                            type: ["address"]}}
                    >
                        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                            <div>
                                <input style={{border: "3px solid #dcbc60", borderRadius: "5px", height: "35px"}}
                                    {...getInputProps({
                                        placeholder: 'Search Attractions ...',
                                        className: 'location-search-input',
                                    })}
                                />
                                <div className="autocomplete-dropdown-container">
                                    {loading && <div>Loading...</div>}
                                    {suggestions.map(suggestion => {
                                        const className = suggestion.active
                                            ? 'suggestion-item--active'
                                            : 'suggestion-item';
                                        // inline style for demonstration purpose
                                        const style = suggestion.active
                                            ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                                            : { backgroundColor: '#ffffff', cursor: 'pointer' };
                                        return (
                                            <div
                                                {...getSuggestionItemProps(suggestion, {
                                                    className,
                                                    style,
                                                })}
                                            >
                                                <span>{suggestion.description}</span>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        )}
                    </PlacesAutocomplete>

                    <div className="icon">
                        <SearchOutlined style={{ fontSize: '25px' }}/>
                    </div>
                </div>

                <div className="attraction_list">
                    <List
                        itemLayout="horizontal"
                        size="small"
                        dataSource={this.state.attractionsDetail}
                        //this.state.placeId
                        renderItem={item => (
                            <List.Item
                                actions={[<Checkbox dataInfo={item} onChange={this.onChange}/>]}
                            >
                                <List.Item.Meta
                                    avatar={<Avatar size={50} src={item.icon}/>}
                                    title={<p>{item.name}</p>}
                                    description={`${item.url}`}
                                />
                            </List.Item>
                        )}
                    />
                </div>

                <div className="divider-flex"></div>
                <div className="addPlanButton">
                    <Button type="primary" onClick = {this.addToPlan} style={{background: "#dcbc60", borderColor:"white", color: "white", width: "150px", height: "35px"}} className="add-to-plan-btn">Add to Plan</Button>
                </div>
            </div>
        )
    }
}

export default SearchAttractionList;
