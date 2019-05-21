// ** Main modules
import React from 'react';
import { Link } from 'react-router-dom';

// ** Components
import CommentSection from './../CommentSection'
import Thumbnail from './../Thumbnail.jsx'


// ** CSS
import './galleryshowcase.css'



export default class GalleryShowcase extends React.Component {
	constructor(props){
		super(props);

		this.onThumbClick = this.props.onThumbClick;
		this.API = this.props.API;

		this.state = {
      images: [
      ],
      isCommmentsVisible: false,
      imageCardVis: false,
      loading: true,
		}

		this.toggleComments = this.toggleComments.bind(this);
    this.Thumbnails = this.Thumbnails.bind(this);
    // this.Thumbnail = this.Thumbnail.bind(this);
    this.handleThumbClick = this.handleThumbClick.bind(this);

  }

  componentDidMount(){
  	if(typeof this.props.gallery !== 'undefined')
    	this.getImagesLinks(this.props.gallery.id);
  	}

    componentDidUpdate(prevProps) {
    	if(prevProps.gallery !== this.props.gallery){
    		this.getImagesLinks(this.props.gallery.id)
    	}
    }



  // --  Images/Thumbnails -Start --

  async getImagesLinks() {
    const galID = this.props.gallery.id

    if(typeof galID === 'undefined')
      return;

    let res = await this.API.getImagesLinks(galID)

    
    if(typeof res !== 'undefined') {
      if (res.status < 400){
        if(res.status === 204){
          this.setState({images: [], loading: false});
          return;
        }

        this.setState({
          images : res.data.gallery_images,
          loading: false,
        })
      } 
    }
    else {
      this.setState({images: [], loading: false})
    }

  }

  refreshImages(){
    this.getImagesLinks();
  }

  Thumbnails(){
    const images = this.state.images;

    // Show first 5 images
    return images.slice(0,5).map( (image, index) => {
      return (
        <Thumbnail
          type='galshowcase'
          key={image.image_id}
          galID={this.props.gallery.ID}
          id={image.image_id}
          url={image.image_url}
          loading={this.state.loading}
          wait={1000 + index*200}
          handleThumbClick={this.handleThumbClick}/>
        )
    });
  }


	handleThumbClick(id, e){
		this.onThumbClick(e.target.src, this.props.username || this.props.gallery.username  , id);
	}

	toggleComments() {
		this.setState({isCommmentsVisible: !this.state.isCommmentsVisible})
	}

	render() {
	  const { galleryname, id } = this.props.gallery;
	  const username = this.props.username;
	  const isVis = this.state.isCommmentsVisible;
	  const loading = this.state.loading;

	  let isEmpty = false;
	  if(this.state.images.length === 0){
	  	isEmpty = true;
	  }

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
		      <Link exact='true' to={{
		      		pathname: `/user/gallery/${id}`,
            	state: {id: id, itemName: galleryname, username: username}
		      	}}
		      	className='gal-showcase__title select'>
		        {galleryname}
		      </Link>
		      <p className='gal-showcase__commentbtn' onClick={this.toggleComments}>Comments <i className="material-icons" style={expandMoreStyle}>expand_more</i></p>
	    	</header>
	      <section className='gal-showcase__body'>
	        {!loading && this.Thumbnails()}
	        {(isEmpty && !loading) && 
	        	<p className='emptymessage'>
	        		This gallery seems to be empty...
	        	</p>
	        }
	      </section>
				<CommentSection API={this.API} type='galshowcase' id={id} isVisible={isVis}/>
	    </article>
	  );
	}
}