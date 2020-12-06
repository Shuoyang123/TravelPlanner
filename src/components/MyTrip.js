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
        const dates = ["2020-02-01", "2020-02-02", "2020-02-03", "2020-02-04", "2020-02-05"];
        var temp = [];
        for(var i = 0; i < dates.length; i++){
          temp.push([]);
        }
        this.state = {
            lat: "40",
            lng: "-74",
            responses: [],
            isMapVisible: false,
            attractionsId: [],
            attractionsName: [],
            attractionsDetail: [],
            attractionPlan: [...temp],    //2d
            chosenPlace: [],
            activeTab: "0",
        };
    }

    addToPlan = (chosen) => {
      this.setState({
        chosenPlace: [...chosen]
      })
      const chosenPlace = chosen;
      const activeTab = this.state.activeTab;
      // const temp = this.state.attractionPlan;
      // this.setState({
      //   attractionPlan:
      // })

      // for(var i = 0; i < chosenPlace.length; i++){
      //     this.add(this.state.attractionPlan[activeTab], chosenPlace[i]);
      // }
      var temp = [];
      const dates = ["2020-02-01", "2020-02-02", "2020-02-03", "2020-02-04", "2020-02-05"];
      for(var i = 0; i < dates.length; i++){
        // temp.push(chosenPlace);
        if(i != activeTab){
          temp.push(this.state.attractionPlan[i])
        }
        else{
          temp.push(chosenPlace);
        }
      }
      this.setState({
        attractionPlan: [...temp]
      })

      // this.setState(({ attractionPlan }) => ({ attractionPlan:
      //       attractionPlan.map((chosenPlace, activeTab) => {
      //         // warning said I wasn't returning in all cases, so I added this
      //         return chosenPlace;
      //       })
      //   }));
    }

    add = (atts, place) => {
      const found = atts.some(entry => entry === place);
      if(!found){
        atts.push(place);
      }
    }

    updateActiveTab = (tab) => {
      this.setState({
        activeTab: tab
      })
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.cityName !== this.props.cityName) {
            this.search(this.props.cityName);
        }
    }

    componentDidMount() {
        // this.search(this.props.cityName);
        const dates = ["2020-02-01", "2020-02-02", "2020-02-03", "2020-02-04", "2020-02-05"];
        var temp = [];
        for(var i = 0; i < dates.length; i++){
          // console.log(i);
          temp.push([]);
        }
        this.setState({
          attractionPlan: [...temp]
        })
        // this.search("New York")
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
      for(var i = 0; i < placeID.length; i++){
         const proxy = "https://cors-anywhere.herokuapp.com/";
         const base = "https://maps.googleapis.com/maps/api/place/details/json?";
         const API_KEY = "AIzaSyC9yzILpgwBgwf0h4rxnsXh1gNVAe8Jzow";
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



    saveCurrentPlan = () => {

    }

    showOrHideMap = () => {
      const res = [];
      if(!this.state.isMapVisible){
        const idx = parseInt(this.state.activeTab);
        const atts = this.state.attractionPlan[idx];
        for(var i = 0; i < atts.length; i++){
          const proxy = "https://cors-anywhere.herokuapp.com/";
          const base = "https://maps.googleapis.com/maps/api/place/details/json?";
          const API_KEY = "AIzaSyC9yzILpgwBgwf0h4rxnsXh1gNVAe8Jzow";
          const url = `${base}place_id=${atts[i]}&fields=geometry,name,url,rating&key=${API_KEY}`;
          const finalUrl = proxy + url;

          axios.get(finalUrl)
               .then(response => {
                 console.log("detail response", response);
                 res.push(response);
               })
               .catch(err => {
                 console.log("err in get detail", err);
               })
        }
      }

      this.setState({
          isMapVisible: !this.state.isMapVisible,
          responses: [...res]
      })

    };

    render(){
        const { isMapVisible } = this.state
        return (
            <div className="my-trip">
                <div className="left-side">
                    <CurrentAttractionsList plan = {this.state.attractionPlan}
                                            chosenPlace = {this.state.chosenPlace}
                                            datesList = {this.props.datesList}
                                            updateKey = {this.updateActiveTab }/>
                    <div className="left-bottom-button">
                        <Button onClick={this.saveCurrentPlan}> save </Button>
                        <Button onClick={this.showOrHideMap}> map </Button>
                    </div>
                </div>
                <div className = "right-side">
                    { !isMapVisible && <SearchAttractionList lat = {this.state.lat} lng = {this.state.lng}
                                                              cityName = {this.props.cityName} addPlan = {this.addToPlan}/> }
                    { isMapVisible && <CurrentPlanMap responses = {this.state.responses}/>}
                </div>
              </div>
            );
        }
    }

export default MyTrip;
