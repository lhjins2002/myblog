import React, { Component } from 'react';
import TopBar from './TopBar';
import { Route, Switch } from 'react-router-dom';
import ItemWrite from './ItemWrite';
import ItemList from './ItemList';
import MenuWrite from './MenuWrite';
import Login from './Login';
import InfoWrite from './InfoWrite';
class App extends Component {
  render() {
    return (
      <div style={{background:"rgba(241,241,241,1)"}}>
        <Switch>
        <Route path="/:userid" component={TopBar}/> 
        <Route path="/" component={TopBar}/> 
        </Switch>
        <div>
        <Route path="/:userid/ItemWrite/:menuid" component={ItemWrite}/> 
        <Switch>
          <Route path="/:userid/ItemList/:menuid" component={ItemList}/> 
          <Route path="/:userid/ItemList" component={ItemList}/> 
        </Switch>
        <Switch>
          <Route path="/:userid/MenuWrite/:menuid" component={MenuWrite}/> 
          <Route path="/:userid/MenuWrite" component={MenuWrite}/> 
        </Switch>
        <Route path="/Home/Login" component={Login}/> 
        <Route path="/Home/InfoWrite" component={InfoWrite}/> 
        </div>
      </div>
    );
  }
}

export default App;
