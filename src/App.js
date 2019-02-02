import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {


  render() {
    return (
      <div className="App">
        <container>
        	<Photos>
        		<Header></Header>
        		<Gallery className="row"></Gallery>
        	</Photos>
        </container>
      </div>
    );
  }
}

export default App;