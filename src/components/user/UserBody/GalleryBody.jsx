// ** Main modules
import React from 'react';
import { Redirect } from 'react-router-dom';

// ** Components
import ImageCard from './ImageCard'
import AddImageCard from './AddImageCard'

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
      addImageCardVis: false,
      redirectFlag: false,
      sameUser: false,
      loading: true,
      deleteMode: false,
		}

    // General Gal
    this.getGalInfo = this.getGalInfo.bind(this);

    // Images/Thumbs
    this.handleThumbClick = this.handleThumbClick.bind(this);
    this.Thumbnails = this.Thumbnails.bind(this);
    this.Thumbnail = this.Thumbnail.bind(this);
    this.getImagesLinks = this.getImagesLinks.bind(this);
    this.refreshImages = this.refreshImages.bind(this);
    this.toggleDelete = this.toggleDelete.bind(this);

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

        if(res.data.Gallery[0].username === this.API.Auth.getUser())
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
          this.setState({images: [], loading:false});
          return;
        }

        this.setState({
          images : res.data.gallery_images
        })
      } 
    }
    else {
      this.setState({images: [], loading:false})
    }

  }

  refreshImages(){
    this.getImagesLinks();
  }

  Thumbnails(){
    const images = this.state.images;

    return images.map( image => {
      return this.Thumbnail(image.image_id, image.image_url);
    });
  }

  Thumbnail(id, url){
    let style = {};

    if(this.state.deleteMode){
     style = {
        // borderRadius : '20px'
      }
    }

    return(
        <img 
          key={id} 
          alt={id}
          src={url} 
          className='thumbnail_gallery' 
          onClick={this.handleThumbClick.bind(this, id)}
          style={style}></img>
    );
  }

  callbackFn(key){
    this.props.callbackFn(key);
  }

  toggleDelete(){
    this.setState({deleteMode: !this.state.deleteMode})
  }

  handleThumbClick(id, e){
    // If delete mode is enabled
    if(this.state.deleteMode){
      this.API.deleteImage(id)
      .then( res => {
        if(res.status < 400){
          setTimeout(1000);
          this.getImagesLinks();
        }
      })
      return
    }


    if(this.state.imageCardVis === false){
      this.setState({imageCardVis: true, imageToShow: e.target.src, imageID: id})
    }
    else {
      this.setState({
        imageCardVis: !this.state.imageCardVis,
      })
    }
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
    this.setState({addImageCardVis : !this.state.addImageCardVis })
  }

  // Images



  render(){

    let {galID, galleryName, author, sameUser, addImageCardVis, imageID,
      redirectFlag, loading, imageToShow, imageCardVis, deleteMode } = this.state;

    if(typeof this.props.location.state !== 'undefined'){
  	  // let galleryName = this.props.location.state.itemName;
     //  let author = this.props.location.state.username;
     //  let galID = this.props.location.state.id;
    } else {

    }

    const deletePStyle = {
      height: deleteMode ? '50px' :'0px',
      padding: deleteMode ? '30px': '0px',
      border: deleteMode ? '2px solid #d21714' : '0px',
      opacity: deleteMode ? '1' : '0',
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
                      <div className='fl al_center gallery_settings'>
                        <p className='upload-btn fl al_center' onClick={this.toggleFileUpload}>
                            <i className="material-icons" style={{'paddingRight':'5px'}}>control_point</i>Upload New
                        </p>
                        <p className='delete-btn fl al_center' onClick={this.toggleDelete}>
                          <i className="material-icons">delete_outline</i>
                        </p>
                      </div>
                    }
            			</header>

          				<hr style={hrStyle}/> 
                  
                  <p className='deleteP noSelect' style={deletePStyle}>
                    Click the image you want to delete!
                  </p>

                  <section className='images__container'>
                    {!loading && this.Thumbnails()}
                  </section>

          				<ImageCard 
                    API={this.API} 
                    onCloseClick={this.handleThumbClick} 
                    isVisible={imageCardVis}
                    imageURL={imageToShow}
                    imageID={imageID}
                    author={author}/>

                  <AddImageCard
                    API={this.API}
                    onCloseClick={this.toggleFileUpload}
                    isVisible={addImageCardVis}
                    galID={galID}
                    updateParent={this.getImagesLinks}/>
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
