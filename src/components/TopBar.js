import React, {Component} from 'react';
import logo from '../assets/images/logo.svg';
import { Icon } from 'antd';
import '../styles/App.css';

class TopBar extends Component {
  render(){
    return (
      <header className="App-header">
         <img src={logo} alt="logo" className="App-logo"/>
         <span className="App-title">Travel Planner</span>
         <a className="logout" onClick={this.props.handleLogout} >
             <Icon type="logout"/>{' '}Logout
         </a>
     </header>
    )
  }
}

export default TopBar;
