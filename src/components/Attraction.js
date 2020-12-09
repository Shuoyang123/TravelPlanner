import React,{Component} from "react";
import axios from 'axios';
import { Card } from 'antd';
import Cupcakes from '../assets/images/Cupcakes.jpg';
import '../styles/Attraction.css';

class Attraction extends Component {
    constructor(props) {
        super(props);
        this.state = {
          data: []
        };
    }

    componentDidMount(){
      const placeid = this.props.placeid;
      const proxy = "https://cors-anywhere.herokuapp.com/";
      const base = "https://maps.googleapis.com/maps/api/place/details/json?";
      const API_KEY = "AIzaSyC9yzILpgwBgwf0h4rxnsXh1gNVAe8Jzow";
      const url = `${base}place_id=${placeid}&fields=name,photo,formatted_address,formatted_phone_number,website,url,rating&key=${API_KEY}`;
      const finalUrl = proxy + url;

      axios.get(finalUrl)
           .then(response => {
             // console.log("detail response", response);
             this.setState({
                 data: response.data.result
             });
           })
           .catch(err => {
             console.log("err in get detail", err);
           })
    }

    render() {
        const data = this.state.data;
        return (
            <div className="attractionBlock attraction-card-transparent">
                <div className="container-fluid d-flex justify-content-center">
                <div className="attraction-card-row">
                    <div>
                        <Card className="attraction-card-layout" title={<div className="card_subHeader attraction-card-subHeader"><h2><span>「 {data.name} 」</span></h2></div>} extra={<a href={data.url}>More</a>} style={{ width: "85%", paddingTop: "10px", paddingBottom: "4px"}}>
                            <img src={Cupcakes} alt="Cupcakes_Image" className="attraction-card-center"/>
                            <div className="attraction-card-row">
                                <div className="addressBlock attraction-card-block-layout">
                                    <div className="attraction-card-caption-layout">Address: </div>
                                    <div className="attraction-card-info-layout">
                                        {data.formatted_address}
                                    </div>
                                </div>
                                {
                                  data.website &&
                                  <div className="websiteBlock">
                                      <div className="attraction-card-caption-layout">Website: </div>
                                      <div className="attraction-card-info-layout">
                                          <a href={data.website} target="_blank">
                                             {data.website}
                                          </a>
                                      </div>
                                  </div>
                                }
                                {
                                  data.formatted_phone_number &&
                                  <div className="websiteBlock">
                                      <div className="attraction-card-caption-layout">Phone: </div>
                                      <div className="attraction-card-info-layout">{data.formatted_phone_number}</div>
                                  </div>
                                }

                                <div className="websiteBlock">
                                    <div className="attraction-card-caption-layout">Rate: </div>
                                    <div className="attraction-card-info-layout">{data.rating}</div>
                                </div>
                                <p></p>
                            </div>
                        </Card>
                    </div>
                </div>
            </div>
                <p></p>
                <p></p>
            </div>
        );
    }
}

export default Attraction;
