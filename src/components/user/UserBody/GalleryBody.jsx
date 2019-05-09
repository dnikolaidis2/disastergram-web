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
	}

	componentDidMount (){
		const { id, itemName, username } = this.props.location.state;
		this.setState({id, galleryName: itemName, author: username})
	}

  handleThumbclick(){
    this.setState({imageCardVis: !this.state.imageCardVis})
  }



  render(){

  	const { imageCardVis, galleryName, author } = this.state;
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
