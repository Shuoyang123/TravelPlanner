import React, {Component} from 'react';
import {Button, message} from 'antd';
import axios from 'axios';
import SearchAttractionList from "./SearchAttractionList";
import CurrentAttractionsList from "./CurrentAttractionsList";
import {GOOGLE_SEARCH_KEY, API_SERVER} from '../const/constant';
import CurrentPlanMap from "./CurrentPlanMap";
import "../styles/MyTrip.css";

const instance = axios.create({
    withCredentials: true,
    baseURL: API_SERVER
})

class MyTrip extends Component {
    constructor(props) {
        super(props);
        const date = this.props.datesList.map(entry => {
          return entry.format("YYYY-MM-DD");
        })
        // console.log("dataList is: -->", date);
        var temp = [];
        for (var i = 0; i < date.length; i++) {
            temp.push([]);
        }
        this.state = {
            city: this.props.cityName,
            dates: [...date],
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
        var temp = [];
        const dates = this.state.dates;
        for (var i = 0; i < dates.length; i++) {
            // temp.push(chosenPlace);
            if (i != activeTab) {
                temp.push(this.state.attractionPlan[i])
            } else {
                temp.push(chosenPlace);
            }
        }
        this.setState({
            attractionPlan: [...temp]
        })

    }

    add = (atts, place) => {
        const found = atts.some(entry => entry === place);
        if (!found) {
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
        const dates = this.state.dates;
        var temp = [];
        for (var i = 0; i < dates.length; i++) {
            temp.push([]);
        }
        this.setState({
            attractionPlan: [...temp]
        })
  
    }


    saveCurrentPlan = () => {
        const curDates = this.state.dates;
        const plans = this.state.attractionPlan;
        const proxy = "https://cors-anywhere.herokuapp.com/";
        instance.post("save", {
            dates: curDates,
            places: plans
        })
            .then(response => {
                console.log(response);
                message.success('Save succeed!');
            })
            .catch((err) => {
                console.error(err);
                message.error('Save failed.');
            });
    }

    showOrHideMap = () => {
        const res = [];

        this.setState({
            isMapVisible: !this.state.isMapVisible
        })
    };

    render() {
        const {isMapVisible} = this.state
        return (
            <div className="my-trip">
                <div className="left-side">
                    <CurrentAttractionsList plan={this.state.attractionPlan}
                                            chosenPlace={this.state.chosenPlace}
                                            datesList={this.state.dates}
                                            updateKey={this.updateActiveTab}/>
                    <div className="left-bottom-button">
                        <Button onClick={this.saveCurrentPlan} style={{
                            background: "#dcbc60",
                            borderColor: "white",
                            color: "white",
                            width: "150px",
                            height: "35px"
                        }} className="save-my-plan-btn"> Save My Plan </Button>
                        <Button onClick={this.showOrHideMap} style={{
                            background: "#dcbc60",
                            borderColor: "white",
                            color: "white",
                            width: "150px",
                            height: "35px"
                        }} className="show-map-btn"> Show Map </Button>
                    </div>
                </div>
                <div className="right-side">
                    {!isMapVisible && <SearchAttractionList lat={this.state.lat} lng={this.state.lng}
                                                            cityName={this.props.cityName} addPlan={this.addToPlan}
                                                          />}
                    {isMapVisible &&
                    <CurrentPlanMap currentAttractionPlan={this.state.attractionPlan[this.state.activeTab]}/>}
                </div>
            </div>
        );
    }
}

export default MyTrip;
