import React, { Component } from 'react';
import './Photos.css'
import Masonry from 'react-masonry-component';
import './Gallery.css'
const masonryOptions = {
  transitionDuration: 1000
};


class Gallery extends Component {
  render() {

    const childElements = () =>{
      return(
     this.props.elements.map(x=>
        <div className = "gallery-children col-xl-3 col-lg-4 col-md-6 col-sm-12 col-xs-12">
        <div className = "title-overlay"><h4 className = "title">{x.metadata.title}</h4></div>
        <img className = "gallery-photo" src={'https://www.stefangrasu.com/'+x.thmbnl} />
        </div>
    ))}

    return (
      <Masonry
        className={'my-gallery-class col-lg-10 col-md-9 col-sm-9 col-xs-9'}
        elementType={'div'}
        options={masonryOptions} 
        disableImagesLoaded={false} 
        updateOnEachImageLoad={true}
        >
        {childElements()}
      </Masonry>
      )
  }
}

export default Gallery;