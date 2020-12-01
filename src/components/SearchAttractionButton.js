import React, {Component} from 'react';
import { Modal, Button } from 'antd';
import SearchAttractionForm from './SearchAttractionForm.js'

class SearchAttractionButton extends Component {
  state = { visible: false };

  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  getFormRef = (formInstance) => {
    console.log(formInstance);
    this.form = formInstance;
  }

  handleOk = () => {
    this.setState({
      visible: false,
    });
    const chosenAttraction = this.form.state.chosenAttraction;
    const chosenDate = this.form.state.chosenDate;
    console.log(chosenAttraction + chosenDate);
  };



  handleCancel = e => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };

  render() {
    return (
      <div>
        <Button type="primary" onClick={this.showModal}>
          Add attractions
        </Button>
        <Modal
          title="Add attractions"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          okText="Confirm"
        >
          <SearchAttractionForm places={this.state.attractionsName} ref={this.getFormRef}/>
        </Modal>
      </div>
    );
  }
}

export default SearchAttractionButton
