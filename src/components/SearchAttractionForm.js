import React, {Component} from 'react';
import { Select } from 'antd';

const { Option } = Select;



class SearchAttractionForm extends Component {

  state = {
    chosenAttraction: "",
    chosenDate: ""
  }

  onChangeAttraction = (val) => {
    console.log('city:', val);
    this.setState({
      chosenAttraction: val
    })
  }

  onChangeDate = (val) => {
    console.log('date:', val);
    this.setState({
      chosenDate: val
    })
  }

  render() {
    // const places = this.props.places;
    const places = ["New York", "California", "China", "Beijing", "Wuhan", "Shenzhen"];
    return (
      <div className = "searchForm">
        <div className = "searchAttraction">
          <Select
            showSearch
            style={{ width: 200 }}
            placeholder="Select an attraction"
            onChange={this.onChangeAttraction}
          >
          {places.map(item => (
            <Option key={item}>{item}</Option>
          ))}
          </Select>
        </div>

        <div className = "searchDate">
          <Select
            showSearch
            style={{ width: 200 }}
            placeholder="Select a date"
            onChange={this.onChangeDate}
          >
            <Option value="jack">Jack</Option>
            <Option value="lucy">Lucy</Option>
            <Option value="tom">Tom</Option>
          </Select>
        </div>
      </div>
    )
  }
}

export default SearchAttractionForm
