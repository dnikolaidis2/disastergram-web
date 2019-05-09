// ** Main modules
import React from 'react';
//import { Redirect } from 'react-router-dom';

// ** Components

import GalleryShowcase from './GalleryShowcase'
import ImageCard from './ImageCard'



import './userbody.css';

export default class UserBody extends React.Component {

  constructor(props) {
    super(props);

    this.Auth = this.props.Auth;
    this.API = this.props.API;

    this.state = {
      imageCardVis: false,      
    }

    this.TopBanner = this.TopBanner.bind(this);
    this.handleThumbclick = this.handleThumbclick.bind(this);

  }

  handleThumbclick(){
    this.setState({imageCardVis: !this.state.imageCardVis})
  }

  TopBanner() {
		return (
			<picture className='top-banner noSelect'>
				<div className='top-banner_image'/>
				<h1 className='top-banner_title'>Disastergram</h1>
			</picture>    
		);
	}


  render() {
    const imageCardVis = this.state.imageCardVis;

    return(
      <div id='userbody'>
        {this.TopBanner()}
        <div className='userbody__container noSelect'>
					<GalleryShowcase onThumbClick={this.handleThumbclick}/>
					<GalleryShowcase onThumbClick={this.handleThumbclick}/>
					<GalleryShowcase onThumbClick={this.handleThumbclick}/>
					<GalleryShowcase onThumbClick={this.handleThumbclick}/>
        </div>
        <ImageCard 
          API={this.API} 
          onCloseClick={this.handleThumbclick} 
          isVisible={imageCardVis}/>
      </div>
    );
  }
}
