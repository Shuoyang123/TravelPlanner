import React, {Component} from 'react';
import logo from '../assets/images/PaperPlane.png';
import { Icon } from 'antd';
import '../styles/App.css';
import "../styles/TopBar.css"

class TopBar extends Component {
  render(){
    return (
      <header className="App-header">
         <img src={logo} alt="logo" className="App-logo"/>
         <span className="App-title">- Travel Planner -</span>
         <a className="logout" onClick={this.props.handleLogout} >
             <Icon type="logout"/>{' '}Logout
         </a>
     </header>
    )
  }
}

export default TopBar;
