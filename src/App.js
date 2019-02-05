import React, { Component } from 'react'
import Photos from './Photos'
import Header from './Header'
import logo from './logo.svg'
import './App.css'

class App extends Component {


  render() {
    return (
      <div className="App">
        <div className="container-fluid">
        <Header/>
        	<Photos id="photos">
        	</Photos>
        </div>
      </div>
    );
  }
}

export default App