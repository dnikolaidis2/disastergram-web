// ** Main modules
import React from 'react';
import { Link } from 'react-router-dom';

// ** Components
import CommentSection from './../CommentSection'


// ** CSS
import './galleryshowcase.css'



export default class GalleryShowcase extends React.Component {
	constructor(props){
		super(props);

		this.onThumbClick = this.props.onThumbClick;

		this.state = {
      images: [
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
      isCommmentsVisible: false,
      imageCardVis: false,
		}

		this.toggleComments = this.toggleComments.bind(this);
    this.Thumbnails = this.Thumbnails.bind(this);
    this.Thumbnail = this.Thumbnail.bind(this);
    this.handleThumbClick = this.handleThumbClick.bind(this);

  }

	Thumbnails(){
		const images = this.state.images;

	  return images.map( photo => {
	    return this.Thumbnail(photo.id);
	  });
	}

	Thumbnail(id){
	  return(
	    <div key={id} className='thumbnail' onClick={this.handleThumbClick}></div>
	  );
	}

	handleThumbClick(){
		this.onThumbClick(/*Pass data to parent*/);
	}

	toggleComments() {
		this.setState({isCommmentsVisible: !this.state.isCommmentsVisible})
	}

	render() {
	  const { galleryname, id } = this.props.gallery;
	  const username = this.props.username;
	  const isVis = this.state.isCommmentsVisible;

	  const expandMoreStyle = {
  	  'WebkitTransform': isVis ? 'rotate(180deg)': 'rotate(0deg)',
			'MozTransform': isVis ? 'rotate(180deg)': 'rotate(0deg)',
			'OTransform': isVis ? 'rotate(180deg)': 'rotate(0deg)',
			'msTransform': isVis ? 'rotate(180deg)': 'rotate(0deg)',
			transform: isVis ? 'rotate(180deg)': 'rotate(0deg)',
	  }

	  return (
	    <article className='gal-showcase card noSelect '>
	    	<header className='gal-showcase__header'>
		      <Link exact to={{
		      		pathname: `/user/gallery/${id}`,
            	state: {id: id, itemName: galleryname, username: username}
		      	}}
		      	className='gal-showcase__title select'>
		        {galleryname}
		      </Link>
		      <p className='gal-showcase__commentbtn' onClick={this.toggleComments}>Comments <i className="material-icons" style={expandMoreStyle}>expand_more</i></p>
	    	</header>
	      <section className='gal-showcase__body'>
	        {this.Thumbnails()}
	      </section>
				<CommentSection API={this.API} type='galshowcase' id='e2dff1c1-223d-4956-ab7e-c509f4dc306a' isVisible={isVis}/>
	    </article>
	  );
	}
}