import React, { Component } from 'react';
import './Photos.css'
import Masonry from 'react-masonry-component';
import Lightbox from 'react-images'
import './Gallery.css'
const masonryOptions = {
  transitionDuration: 1000
};


class Gallery extends Component {
  constructor(props){
    super(props)
    this.state = {showLightbox: false, currentImage: 0}
    this.gotoNext = this.gotoNext.bind(this)
    this.gotoPrevious = this.gotoPrevious.bind(this)
    this.gotoImage = this.gotoImage.bind(this)
    this.handleClickImage = this.handleClickImage.bind(this)
    this.openLightbox = this.openLightbox.bind(this)
    this.closeLightbox = this.closeLightbox.bind(this)
  }
  openLightbox (index, event) {
    event.preventDefault();
    this.setState({
      currentImage: index,
      showLightbox: true,
    }); 
  }
  closeLightbox () {

    this.setState({
      currentImage: 0,
      showLightbox: false,
    });
  }
  gotoPrevious () {
    this.setState({
      currentImage: this.state.currentImage - 1,
    });
  }
  gotoNext () {
    this.setState({
      currentImage: this.state.currentImage + 1,
    });
  }
  gotoImage (index) {
    this.setState({
      currentImage: index,
    });
  }
  handleClickImage () {
    if (this.state.currentImage === this.props.images.length - 1) return;

    this.gotoNext();
  }
  render() {

    const childElements = () =>{
      return(
     this.props.elements.map((x, i)=>
        <div className = "gallery-children col-xl-4 col-lg-6 col-md-12 col-sm-12 col-xs-12">
        <div className = "gallery-element">
        <div className = "title-overlay" onClick = {(e) => this.openLightbox(i,e)}>
            <h4 className = "title">{x.metadata.title}</h4>
         </div>
        <img className = "gallery-photo" src={x.thmbnl} />
        </div>
        </div>
    ))}

    return (
      <div className={'my-gallery-class col-lg-10 col-md-9 col-sm-9 col-xs-12'}>

      <Masonry
        elementType={'div'}
        options={masonryOptions} 
        disableImagesLoaded={false} 
        updateOnEachImageLoad={true}
        >
        {childElements()}
      </Masonry>
       <Lightbox
       className = {'lightbox'}
        images = {this.props.elements}
        currentImage = {this.state.currentImage}
        isOpen = {this.state.showLightbox}
        onClickPrev = {this.gotoPrevious}
        onClickNext = {this.gotoNext}
        onClose = {this.closeLightbox}
        backdropClosesModal = {true}
        showCloseButton = {false}
        width = {1536}
        />
      </div>
      )
  }
}

export default Gallery;