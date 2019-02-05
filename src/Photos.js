import React, { Component } from 'react';
import './Photos.css'
import Gallery from './Gallery'
import data from './info'
const masonryOptions = {
  transitionDuration: 10
};


class Photos extends Component {
  constructor(props) {
    super(props)
    this.state = { photos: [], filters: ['all'], currentFilter: 'all' }
  }

  setFilter = (filter) => {
    console.log(this.state.photos)
    this.setState({currentFilter: filter})
    console.log(this.currentFilter)
    console.log(this.state.photos)
  }
  componentDidMount(){
    for(var photo of data["photos"]){
      this.state.photos.push(photo);
      for(var filter of photo['metadata']['keyWords']){
       if(!this.state.filters.includes(filter)) this.state.filters.push(filter)
      }
    }
    this.setFilter('all')
  }
  render() {
    return (

      <div className="row no-gutters">
        <div className="filters col col-lg-2 col-md-3 col-sm-3 col-xs-3">
          <ul>
            {this.state.filters.map(x=>
              <li><h3 className="filter-option" 
              onClick = {()=>this.setFilter(x)}>{x}</h3></li>)}
          </ul>
        </div>
          <Gallery currentFilter = {this.state.currentFilter} 
          elements = {this.state.photos.filter(x=>
            this.state.currentFilter =='all' ||
            x.metadata.keyWords.includes(this.state.currentFilter))}/>
      </div>
    )
  }
}

export default Photos;