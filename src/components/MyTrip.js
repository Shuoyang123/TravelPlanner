import React, {Component} from 'react';
import {Button} from 'antd';
import axios from 'axios';
import SearchAttractionList from "./SearchAttractionList";
import CurrentAttractionsList from "./CurrentAttractionsList";

import { GOOGLE_SEARCH_KEY } from '../const/constant';
import CurrentPlanMap from "./CurrentPlanMap";

class MyTrip extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isMapVisible: false,
            dates: [],
            //add from list to plan
            chosenPlace: []
        };
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

    componentDidMount() {
        // this.search("New York");
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
      for(var i = 0; i < placeID.length; i++){
         const proxy = "https://cors-anywhere.herokuapp.com/";
         const base = "https://maps.googleapis.com/maps/api/place/details/json?";
         const API_KEY = "AIzaSyC9yzILpgwBgwf0h4rxnsXh1gNVAe8Jzow";
         const url = `${base}place_id=${placeID[i]}&fields=name,icon,url,place_id&key=${API_KEY}`;
         const finalUrl = proxy + url;

         axios.get(finalUrl)
              .then(response => {
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

    updatePlan = (chosenAttraction, chosenDate) => {
        //update state
    }

    getRecommendation = () => {

    }

    saveCurrentPlan = () => {

    }

    showOrHideMap = () => {
        this.setState({
            isMapVisible: !this.state.isMapVisible
        })
    };

    render(){
        const { isMapVisible } = this.state
        return (
            <div className="mytrip">
                <div className="left-side">
                    <CurrentAttractionsList/>
                    <div className="left-bottom-button">
                        <Button onClick={this.getRecommendation}> get recommendation </Button>
                        <Button onClick={this.saveCurrentPlan}> save </Button>
                        <Button onClick={this.showOrHideMap}> map </Button>
                    </div>
                </div>
                <div className = "right-side">
                    { !isMapVisible && <SearchAttractionList/> }
                    { isMapVisible && <CurrentPlanMap/>}
                </div>
              </div>
            );
        }
    }

export default MyTrip;
