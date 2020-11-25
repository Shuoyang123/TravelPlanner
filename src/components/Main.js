import React, {Component} from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { Register } from './Register';
import  Login  from './Login';
import Home from './Home';

class Main extends Component {
   render() {
       return (
           <div className="main">
             <Switch>
                 <Route path="/register" component={Register}/>
                 <Route path="/login" component={Login}/>
                 <Route path="/home" component={Home}/>
                 <Route component={Login}/>
             </Switch>
           </div>
       );
   }
}

export default Main;
