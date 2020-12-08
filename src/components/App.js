import React, {Component} from 'react';
import TopBar from './TopBar';
import Main from './Main';
import { TOKEN_KEY } from '../const/constant';
import '../styles/App.css';

class App extends Component{
  render(){
    return (
        <div className="App">
            <style>{'body { background-color: rgba(95, 158, 160, 0.1); }'}</style>
            <TopBar />
            <Main />
        </div>
    )
  }
}
export default App;
