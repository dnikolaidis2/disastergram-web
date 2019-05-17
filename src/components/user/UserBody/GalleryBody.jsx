// ** Main modules
import React from 'react';
import { Redirect } from 'react-router-dom';

// ** Components
import ImageCard from './ImageCard'
import AddImageCard from './AddImageCard'
import Thumbnail from './Thumbnail.jsx'

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
      loadingAnim: false,
      isUploading: false,
		}

    // General Gal
    this.getGalInfo = this.getGalInfo.bind(this);

    // Images/Thumbs
    this.handleThumbClick = this.handleThumbClick.bind(this);
    this.Thumbnails = this.Thumbnails.bind(this);
    // this.Thumbnail = this.Thumbnail.bind(this);
    this.getImagesLinks = this.getImagesLinks.bind(this);
    this.refreshImages = this.refreshImages.bind(this);
    this.toggleDelete = this.toggleDelete.bind(this);
    
    this.showImages = this.showImages.bind(this);

    // Upload forms
    this.startedUpload = this.startedUpload.bind(this);
    this.finishedUpload = this.finishedUpload.bind(this);
    this.toggleFileUpload = this.toggleFileUpload.bind(this);
    this.UploadModal = this.UploadModal.bind(this);
	}

  componentDidMount(){
    if( typeof this.props.match.params === undefined ){
      this.setState({redirectFlag: false})
      return;
    }

    let galID = this.props.match.params.galID;
    this.setState({galID: galID});
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
      this.setState({loading: true})
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
          loadingGalInfo: false,
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
          images : res.data.gallery_images,
          loading:false,
        })
        setTimeout(this.showImages, 1)

      } 
    }
    else {
      this.setState({images: [], loading:false})
    }

  }

  showImages(){
    this.setState({loadingAnim: true})
  }

  refreshImages(){
    this.getImagesLinks();
  }

  Thumbnails(){
    const images = this.state.images;
    const loading = this.state.loading;
    // this.setState({loadingAnim: true})

    return images.map( (image, index) => {
      return (
        <Thumbnail
          key={image.image_id}
          galID={this.state.galID}
          id={image.image_id}
          url={image.image_url}
          loading={loading}
          wait={600 + index*80}
          handleThumbClick={this.handleThumbClick}
          />
        );

    });
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


  startedUpload(){
    this.setState({isUploading: true});
  }

  finishedUpload(){
    this.setState({isUploading: false});
  }

  toggleFileUpload(){
    this.setState({addImageCardVis : !this.state.addImageCardVis })
  }

  // Upload module
  UploadModal(){
    const isUploading = this.state.isUploading;
    const uploadStyle = {
      bottom: isUploading ? '50px' : '-100px',
      opacity: isUploading ? '1' : '0',
      transition: isUploading ? 'opacity 0.2s, bottom 0.4s ease-in-out' : 'opacity 0.2s 1.5s, bottom 0.1s ease-in-out 1.5s'
    }

    return(
        <div className='uploading-modal noSelect' style={uploadStyle}>Uploading...</div>
      );
  }

  // --  Upload Form -END --


  render(){

    let {galID, galleryName, author, sameUser, addImageCardVis, imageID,
      redirectFlag, loading, loadingGalInfo, imageToShow, imageCardVis, deleteMode } = this.state;

    if(typeof this.props.location.state !== 'undefined'){
  	  // let galleryName = this.props.location.state.itemName;
     //  let author = this.props.location.state.username;
     //  let galID = this.props.location.state.id;
    } else {

    }


    const imageContStyle = {
      opacity: loading ? '0' : '1',
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
            {!loadingGalInfo &&
              <div className='gallerybody__container fl fl_row' >
                <section className='gallerybody fl fl_column al_center'>
            			<header className='gallery__header fl fl_column al_center'>
                    <div className='gallery__title_cont fl fl_row al_center js_between'>
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
                      </div>
          				    <hr style={hrStyle}/> 
            			</header>

                  
                  <p className='deleteP noSelect' style={deletePStyle}>
                    Click the image you want to delete!
                  </p>

                  <section className='images__container' style={imageContStyle}>
                    {!loading && this.Thumbnails()}
                  </section>

                  {this.UploadModal()}

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
                    updateParent={this.getImagesLinks}
                    startedUpload={this.startedUpload}
                    finishedUpload={this.finishedUpload}/>
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
