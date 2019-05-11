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
      galleries: this.props.galleries || [],
    }

    this.TopBanner = this.TopBanner.bind(this);
    this.handleThumbclick = this.handleThumbclick.bind(this);

  }
  
  // *** TODO CHANGE FOR OTHER USERS ***

  // async getGalleries(username) {
  //   let galleries = [];
  //
  //   let res = await this.API.getGalleries();
  //
  //   if(typeof res !== 'undefined') {
  //     galleries = res.data['Galleries'];
  //     if(res.status === 204){
  //       this.setState({galleries: [], loading:false})
  //       return
  //     }
  //     this.setState({galleries, loading:false})
  //   }
  // }

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
    const { imageCardVis } = this.state;
    const galleries = this.props.galleries;
    const username = this.API.getUser();

    return(
      <div id='userbody'>
        {this.TopBanner()}
        <div className='userbody__container noSelect'>
          {
            galleries.map( (gal) => {
              return <GalleryShowcase 
                key={gal.id} 
                onThumbClick={this.handleThumbclick} 
                gallery={gal}
                username={username}
              API={this.API}/>
            })
          }
        </div>
        <ImageCard 
          API={this.API} 
          onCloseClick={this.handleThumbclick} 
          isVisible={imageCardVis}/>
      </div>
    );
  }
}
