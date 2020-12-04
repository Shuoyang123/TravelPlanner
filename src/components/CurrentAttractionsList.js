import {Component} from "react";
import {Tabs, Radio} from 'antd';
import Attraction from "./Attraction";
import SearchAttractionButton from "./SearchAttractionButton";

const {TabPane} = Tabs;

class CurrentAttractionsList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            attractionsId: [],
            attractionsName: [],
            attractionPlan: [],   //2D array: each element contains all attractions in that day
            mode: 'top'
        };
    }

    handleModeChange = e => {
        const mode = e.target.value;
        this.setState({mode});
    };

    render() {
        const {mode} = this.state;
        // const dates = this.props.datesList;       !!!!!Second
        const dates = ["2020-02-01", "2020-02-02", "2020-02-03", "2020-02-04", "2020-02-05"];
        const operations = <SearchAttractionButton places={this.state.attractionsName}/>
        return(
            <div className="list">
                <Radio.Group onChange={this.handleModeChange} value={mode} style={{marginBottom: 10}}>
                    <Radio.Button value="top">Horizontal</Radio.Button>
                    <Radio.Button value="left">Vertical</Radio.Button>
                </Radio.Group>
                <Tabs tabBarExtraContent={operations} defaultActiveKey="1" tabPosition={mode}
                      style={{height: 780}}>
                    {[...Array(dates.length).keys()].map(i => (
                        <TabPane tab={dates[i]} key={i}>
                            <Attraction dayTime={i} attractions={this.state.attractionPlan[i]}/>
                        </TabPane>
                    ))}
                </Tabs>
            </div>
        )
    }
}

export default CurrentAttractionsList;