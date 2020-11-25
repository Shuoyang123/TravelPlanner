import React, {Component} from 'react';
import { Tabs, } from 'antd';
import History from './History.js';
import Search from './Search.js';
import MyTrip from './MyTrip.js';

const { TabPane } = Tabs;

class Home extends Component {
   render() {
       return (
         <Tabs defaultActiveKey="1">
            <TabPane tab="Search" key="1">
              <Search />
            </TabPane>
            <TabPane tab="My Trip" key="2">
              <MyTrip />
            </TabPane>
            <TabPane tab="History" key="3">
              <History />
            </TabPane>
          </Tabs>
       );
   }
}

export default Home;
