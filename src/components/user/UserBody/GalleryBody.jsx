// ** Main modules
import React from 'react';
import { Redirect } from 'react-router-dom';

// ** Components
import ImageCard from './ImageCard'

import './gallerybody.css'

export default class GalleryBody extends React.Component {
	constructor(props) {
		super(props);

		this.API = this.props.API;

		this.state = {
			galleryName: 'Loading...',
			author: 'Loading...',
      galID:null,
      file: null,
      images: [],

      //Flags
      isFileUpVis: false,
			imageCardVis: false,
      redirectFlag: false,
      sameUser: true,
      loading: true,
		}

    // General Gal
    this.getGalInfo = this.getGalInfo.bind(this);

    // Images/Thumbs
    this.handleThumbclick = this.handleThumbclick.bind(this);
    this.Thumbnails = this.Thumbnails.bind(this);
    this.Thumbnail = this.Thumbnail.bind(this);


    // Upload forms
    this.onChange = this.onChange.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);
    this.uploadForm = this.uploadForm.bind(this);
    this.toggleFileUpload = this.toggleFileUpload.bind(this);
	}

  componentDidMount(){
    if( typeof this.props.match.params === undefined ){
      this.setState({redirectFlag: false})
      return;
    }

    let galID = this.props.match.params.galID;
    this.setState({galdID: galID});
    this.getGalInfo(galID);


  }

  componentDidUpdate(prevProps) {

    if( typeof this.props.match.params === undefined ){
      this.setState({redirectFlag: true})
      return;
    }

    if( typeof this.prevProps === undefined ){
      this.getGalInfo(this.props.match.params.galID)
    }

    if (this.props.match.params.galID !== prevProps.match.params.galID) {
      this.getGalInfo(this.props.match.params.galID);
      this.setState({loading: false})
      if(this.props.location.pathname === prevProps.location.pathname){
      }
    }
  }


  async getGalInfo(galID){
    
    this.setState({galID: this.props.match.params.galID})
    
    let res = await this.API.getGallery(galID)
    if(typeof res !== 'undefined'){
      if (res.status < 400){
        // alert('Im here!')
        this.setState({
          galleryName: res.data.Gallery[0].galleryname,
          author: res.data.Gallery[0].username,
          author_id: res.data.Gallery[0].user_id,
          loading: false,
        })

        this.getImagesLinks();

        if(res.data.username === this.API.Auth.getUser())
          this.setState({sameUser: true})

        return;

      } 
    } 

    this.setState({redirectFlag: true})

  }

  // --  Images/Thumbnails -Start --

  async getImagesLinks() {
    const galID = this.state.galID

    if(typeof galID === 'undefined')
      return;

    let res = await this.API.getImagesLinks(galID)

    
    if(typeof res !== 'undefined') {
      if (res.status < 400){
        if(res.status === 204){
          this.setState({images: []});
          return;
        }

        this.setState({
          images : res.data.gallery_images
        })
      } 
    }
    else {
      this.setState({images: []})
    }

  }

  Thumbnails(){
    const images = this.state.images;

    return images.map( image => {
      return this.Thumbnail(image.image_id, image.image_url);
    });
  }

  Thumbnail(id, url){
    return(
      <img key={id} src={url} className='thumbnail' onClick={this.handleThumbClick}></img>
    );
  }


  handleThumbclick(){
    this.setState({imageCardVis: !this.state.imageCardVis})
  }

  // --  Images/Thumbnails -END --


  // --  Upload Form -Start --

  onChange(e){
    this.setState({file:e.target.files[0]});
  }

  onFormSubmit(e){
    e.preventDefault();
    this.API.uploadImage(this.state.file, this.state.galID)
      .then(res => {
        if(res.status < 400) {
          setTimeout(1000);
          this.getImagesLinks();
        }
      });

    // if(typeof res !== 'undefined'){
    //   if(res.status < 400){
    //     this.getImagesLinks();
    //   }
    // }
  }
  

  // --  Upload Form -END --

  uploadForm(){
    return (
      <section className='image-upload__container'>
        <form className='image-upload__form' onSubmit={this.onFormSubmit}>
          <h1>File Upload</h1>
          <input type="file" name="image" onChange= {this.onChange} />
          <button type="submit">Upload</button>
        </form>
      </section>
    );
  }

  toggleFileUpload(){
    this.setState({isFileUpVis : !this.state.isFileUpVis })
  }

  // Images



  render(){
    const  imageCardVis = this.state.imageCardVis;

    let {galleryName, author, sameUser, redirectFlag, loading } = this.state;

    if(typeof this.props.location.state !== 'undefined'){
  	  // let galleryName = this.props.location.state.itemName;
     //  let author = this.props.location.state.username;
     //  let galID = this.props.location.state.id;
    } else {

    }

  	const hrStyle = {
      position: 'relative',
  		width: '80%', 
  		borderColor: '#ccc',
  		borderStyle:'solid'
  	};

  	return(
      <React.Fragment>
        {redirectFlag
          ?<Redirect to={`/feed`}/>
          :<React.Fragment>
            {!loading &&
              <div className='gallerybody__container fl fl_row' >
                <section className='gallerybody fl fl_column al_center'>
            			<header className='gallery__header fl fl_row al_center'>
                    <section className='gallery__title'>
            				  <h2 className='gallery__galname'>{galleryName}</h2>
            				  <div>by<span className='gallery__author'>{author}</span></div>
                    </section>
                    { sameUser &&
                      <p className='gallery__toggle-up-btn fl al_center' onClick={this.toggleFileUpload}>
                          <i className="material-icons" style={{'paddingRight':'5px'}}>control_point</i>Upload New
                      </p>
                    }
            			</header>

          				<hr style={hrStyle}/>

                  {this.uploadForm()}

                  <section className='images__container'>
                    {this.Thumbnails()}
                  </section>

          				<ImageCard 
                    API={this.API} 
                    onCloseClick={this.handleThumbclick} 
                    isVisible={imageCardVis}/>
            		</section>
                <aside className='gallery-body_commentsection'>
                </aside>
              </div>
            }
          </React.Fragment>
        }
      </React.Fragment>
  	);
  }

}
