import React, { Component } from 'react';
import LoginPage from "../src/pages/LoginPage";
import NoMatch from "../src/pages/NoMatch";
import PlayScreen from "../src/pages/PlayScreen";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import './App.css';

class App extends Component {

  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={LoginPage} />
          <Route exact path="/play" component={PlayScreen} />
          <Route component={NoMatch} />
        </Switch>
      </Router>
    );
  }
}

export default App;
