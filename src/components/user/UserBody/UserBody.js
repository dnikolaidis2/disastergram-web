// ** Main modules
import React from 'react';
//import { Redirect } from 'react-router-dom';

// ** Components

import GalleryShowcase from './GalleryShowcase'


import './userbody.css';

export default class UserBody extends React.Component {

  constructor(props) {
    super(props);

    this.Auth = this.props.Auth;
    this.API = this.props.API;

    this.state = {

      imageCardVis: false,
      id1: false,
      id2: false,
      id3: false,
      id4: false
      
    }

    this.TopBanner = this.TopBanner.bind(this);

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
    return(
      <div id='userbody'>
        {this.TopBanner()}
        <div className='userbody__container noSelect'>
					<GalleryShowcase/>
					<GalleryShowcase/>
					<GalleryShowcase/>
					<GalleryShowcase/>
        </div>
      </div>
    );
  }
}
