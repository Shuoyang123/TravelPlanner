import React,{Component} from "react";
import { Card } from 'antd';
import Cupcakes from '../assets/images/Cupcakes.jpg';
import '../styles/Attraction.css';

class Attraction extends Component {
    constructor(props) {
        super(props);
        this.state = { };
    }
    render() {
        return (
            <div className="attractionBlock" class="attraction-card-transparent">
                <div className="container-fluid d-flex justify-content-center">
                <div className="attraction-card-row">
                    <div>
                        <Card class="attraction-card-layout" title={<div className="card_subHeader" className="attraction-card-subHeader"><h2><span>「 Attraction Title 」</span></h2></div>} extra={<a href="#">More</a>} style={{ width: 600 }}>
                            <img src={Cupcakes} alt="Cupcakes_Image" class="attraction-card-center"/>
                            <div class="attraction-card-row">
                                <div className="addressBlock" class="attraction-card-block-layout">
                                    <div class="attraction-card-caption-layout">Address: </div>
                                    <div class="attraction-card-info-layout">4-chōme-2-8 Shibakōen, Minato City, Tokyo 105-0011,
                                        Japan
                                    </div>
                                </div>
                                <div className="websiteBlock">
                                    <div class="attraction-card-caption-layout">Website: </div>
                                    <div class="attraction-card-info-layout">
                                        <a href="https://www.tokyotower.co.jp/"
                                           target="_blank">https://www.tokyotower.co.jp/</a>
                                    </div>
                                </div>
                                <div className="websiteBlock">
                                    <div class="attraction-card-caption-layout">Phone: </div>
                                    <div class="attraction-card-info-layout">+81 3-3433-5111</div>
                                </div>
                                <div className="websiteBlock">
                                    <div class="attraction-card-caption-layout">Hours: </div>
                                    <div class="attraction-card-info-layout">Closed (Opens at 9am)</div>
                                </div>
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


