// ** Main modules
import React from 'react';
//import { Redirect } from 'react-router-dom';

// ** Components
import ImageCard from './ImageCard'


import './userbody.css';

export default class UserBody extends React.Component {

  constructor(props) {
    super(props);

    this.Auth = this.props.Auth;

    this.state = {
      photos: [
        {id: 1, name: 'img1name', url: 'http::/1234' },
        {id: 2, name: 'img2name', url: 'http::/2234' },
        {id: 3, name: 'img3name', url: 'http::/3234' },
        {id: 4, name: 'img4name', url: 'http::/4234' },
        {id: 5, name: 'img5name', url: 'http::/5234' },
        {id: 6, name: 'img6name', url: 'http::/6234' },
        {id: 7, name: 'img7name', url: 'http::/7234' },
        {id: 8, name: 'img8name', url: 'http::/8234' },
        {id: 9, name: 'img9name', url: 'http::/9234' },
        {id: 10, name: 'img10name', url: 'http::/10234' },
        {id: 11, name: 'img11name', url: 'http::/11234' },
      ],
      isHidden: true,
    }

    this.TopBanner = this.TopBanner.bind(this);
    this.GalleryShowcase = this.GalleryShowcase.bind(this);
    this.Thumbnails = this.Thumbnails.bind(this);
    this.Thumbnail = this.Thumbnail.bind(this);
    this.onThumbClick = this.onThumbClick.bind(this);

  }

  TopBanner() {
		return (
			<picture className='top-banner noSelect'>
				<div className='top-banner_image'/>
				<h1 className='top-banner_title'>Disastergram</h1>
			</picture>    
		);
	}

	GalleryShowcase(photos){

	  let galleryName = 'Gallery Name';

	  return (
	    <article className='gal-showcase card noSelect '>
	      <h3 className='gal-showcase__title select'>
	        {galleryName}
	      </h3>
	      <section className='gal-showcase__body'>
	        {this.Thumbnails()}
	      </section>
	    </article>
	  );
	}

	Thumbnails(){
		const photos = this.state.photos;

	  return photos.map( photo => {
	    return this.Thumbnail(photo.id);
	  });
	}

	Thumbnail(id){
	  return(
	    <div key={id} className='thumbnail' onClick={this.onThumbClick}></div>
	  );
	}

	onThumbClick(){
		this.setState({isHidden: !this.state.isHidden})
		console.log('isHidden:' + !this.state.isHidden)
	}

  render() {
  	const isHidden = this.state.isHidden;

    return(
      <div id='userbody'>
        {this.TopBanner()}
        <div className='userbody__container'>
		      {this.GalleryShowcase()}
		      {this.GalleryShowcase()}
		      {this.GalleryShowcase()}
		      {this.GalleryShowcase()}
        </div>
        <ImageCard gal={this.GalleryShowcase} onCloseClick={this.onThumbClick} isHidden={isHidden}/>
      </div>
    );
  }

}

