import React, {Component} from 'react';
import { Tabs, } from 'antd';
import History from './History.js';
import Search from './Search.js';
import MyTrip from './MyTrip.js';

const { TabPane } = Tabs;

class Home extends Component {
  state = {
    city: "",
    startDate:  "",
    endDate: "",
  }

  updateCity(city, startDate, endDate){
    //search's responsibility
  }

   render() {
       return (
         <div className = "home">
           <Tabs defaultActiveKey="1">
              <TabPane tab="Search" key="1">
                <Search updateCity = {this.updateCity}/>
              </TabPane>
              <TabPane tab="My Trip" key="2">
                <MyTrip datesList = {this.state.dates} cityName = {this.state.city}/>
              </TabPane>
              <TabPane tab="History" key="3">
                <History />
              </TabPane>
            </Tabs>
         </div>

       );
   }
}

export default Home;
