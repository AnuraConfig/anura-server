import React, { Component } from 'react';
import Header from './components/Header/Header';
import MainPage from './pages/MainPage';
import NewServicePage from './pages/NewServicePage';
import { HashRouter  as Router, Route, Switch } from "react-router-dom";
import './App.css'

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <Router className="content">
          <Switch>
            <Route path="/" exact component={MainPage} />
            <Route path="/new-service" component={NewServicePage} />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
