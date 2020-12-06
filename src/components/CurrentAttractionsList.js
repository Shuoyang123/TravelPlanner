import {Component} from "react";
import {Tabs, Radio} from 'antd';
import Attraction from "./Attraction";
import CurAttraction from "./CurAttraction.js";

const {TabPane} = Tabs;

class CurrentAttractionsList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeTab: "0",
            mode: 'top',
        };
    }



    handleModeChange = e => {
        const mode = e.target.value;
        this.setState({mode});
    };

    changeTab = activeKey => {
      this.props.updateKey(activeKey);
      console.log(activeKey);
      this.setState({
        activeTab: activeKey
      });
   };

    render() {
        const {mode} = this.state;
        // const dates = this.props.datesList;       !!!!!Second
        const dates = ["2020-02-01", "2020-02-02", "2020-02-03", "2020-02-04", "2020-02-05"];
        // const operations = <SearchAttractionButton places={this.state.attractionsName}/>

        // {plan[i].length === 0? null : <Attraction />}
        return(
            <div className="list">
                <Radio.Group onChange={this.handleModeChange} value={mode} style={{marginBottom: 10}}>
                    <Radio.Button value="top">Horizontal</Radio.Button>
                    <Radio.Button value="left">Vertical</Radio.Button>
                </Radio.Group>
                <Tabs defaultActiveKey="0" tabPosition={mode} onChange = {this.changeTab}
                      style={{height: 780}}>
                    {[...Array(dates.length).keys()].map(i => (
                        <TabPane tab={dates[i]} key={i}>
                          {this.props.plan[i].map(p => (<Attraction placeid = {p} key = {p}/>))}
                        </TabPane>
                    ))}
                </Tabs>
            </div>
        )
    }
}

// {[...Array(dates.length).keys()].map(i => (
//     <TabPane tab={dates[this.state.activeTab]} key={this.state.activeTab}>
//       {this.props.chosenPlace.map(p => (<Attraction key = {p}/>))}
//     </TabPane>
// ))}

export default CurrentAttractionsList;
