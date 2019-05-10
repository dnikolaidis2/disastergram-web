// ** Main modules
import React from 'react';
//import { Redirect } from 'react-router-dom';

// ** Components
import ImageCard from './ImageCard'

import './gallerybody.css'

export default class GalleryBody extends React.Component {
	constructor(props) {
		super(props);

		this.API = this.props.API;

		this.state = {
			galleryName: 'Naughty Stuff I did in Rome',
			author: 'Naughtious Maximus',
			imageCardVis: false,
		}

    this.handleThumbclick = this.handleThumbclick.bind(this);
	}

  handleThumbclick(){
    this.setState({imageCardVis: !this.state.imageCardVis})
  }



  render(){
    const  imageCardVis = this.state.imageCardVis;

    let {galleryName, author} = this.state;

    if(typeof this.props.location.state !== 'undefined'){
  	  galleryName = this.props.location.state.itemName;
      author = this.props.location.state.username;
    }

  	const hrStyle = {
  		width: '80%', 
  		borderColor: '#ccc',
  		borderStyle:'solid'
  	};

  	return(
  		<div id='gallerybody'>
  			<header className='gallery__header'>
  				<h2 className='gallery__title'>{galleryName}</h2>
  				<div>by<span className='gallery__author'>{author}</span></div>
  			</header>
				<hr style={hrStyle}/>
				<ImageCard 
          API={this.API} 
          onCloseClick={this.handleThumbclick} 
          isVisible={imageCardVis}/>
  		</div>
  	);
  }

}
