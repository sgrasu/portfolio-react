import React, { Component } from 'react'
import {Route, Link, BrowserRouter as Router, Redirect, Switch } from 'react-router-dom'
import Photos from './Photos'
import About from './About'
import Header from './Header'
import logo from './logo.svg'
import './App.css'

const routing = (
  <Router>
    <Switch>
      <Route exact path="/photos" component={Photos}/>
      <Route exact path = "/about" component={About}/>
      <Redirect from= "/" to="/photos"/>
    </Switch>
  </Router>
)

class App extends Component {


  render() {
    return (
      <div className="App">
        <div className="container-fluid">
        <Header/>
          {routing}
        </div>
      </div>
    );
  }
}

export default App