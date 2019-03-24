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
    this.state = { photos: [], filters: ['all'], currentFilter: 'all', showLightbox: false, index: 0 }
  }

  setFilter = (filter) => {
    this.setState({currentFilter: filter})
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
  filteredPhotos = () => {return(this.state.photos.filter(x=>
            this.state.currentFilter =='all' ||
            x.metadata.keyWords.includes(this.state.currentFilter)))
  }
  render() {
    return (
      console.log(this.filteredPhotos()),
      <div className="row no-gutters justify-content-center">
        <div className="filters col col-lg-2 col-md-2 d-none d-md-block">
          <ul className = "nav flex-column">
            {this.state.filters.map(x=>
              <li className = {this.state.currentFilter == x?'nav-item active':'nav-item'}>
              <h3 className="filter-option" onClick = {()=>this.setFilter(x)}>{x}</h3>
              </li>)}
          </ul>
        </div>
        <div className="filters-sm row d-block d-md-none">
          <ul className = "nav">
            {this.state.filters.map(x=>
              <li className = {this.state.currentFilter == x?'nav-item active':'nav-item'}>
              <h3 className="filter-option" onClick = {()=>this.setFilter(x)}>{x}</h3>
              </li>)}
          </ul>
        </div>
          <Gallery currentFilter = {this.state.currentFilter} 
          elements = {this.filteredPhotos()}/>
      </div>
    )
  }
}

export default Photos;