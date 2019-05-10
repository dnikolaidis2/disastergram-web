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
      // galleryID: 
			author: 'Naughtious Maximus',
			imageCardVis: false,
      file: null,
		}

    this.handleThumbclick = this.handleThumbclick.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);
	}

  handleThumbclick(){
    this.setState({imageCardVis: !this.state.imageCardVis})
  }

  onChange(e){
    this.setState({file:e.target.files[0]});
  }

  onFormSubmit(e){
     e.preventDefault();
     this.API.uploadImage(this.state.file)
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

        <form onSubmit={this.onFormSubmit}>
            <h1>File Upload</h1>
            <input type="file" name="image" onChange= {this.onChange} />
            <button type="submit">Upload</button>
        </form>


				<ImageCard 
          API={this.API} 
          onCloseClick={this.handleThumbclick} 
          isVisible={imageCardVis}/>
  		</div>
  	);
  }

}
