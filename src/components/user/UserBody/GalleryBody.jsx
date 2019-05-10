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
			imageCardVis: false,
      file: null,
      isFileUpVis: false,
      redirectFlag: false,
      sameUser: true,
		}

    this.getGalInfo = this.getGalInfo.bind(this);
    this.handleThumbclick = this.handleThumbclick.bind(this);
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
    this.setState({galdID: galID})
    this.getGalInfo(galID)


  }

  componentDidUpdate(prevProps) {

    if( typeof this.props.match.params === undefined ){
      this.setState({redirectFlag: false})
      return;
    }

    if( typeof this.prevProps === undefined ){
      this.getGalInfo(this.props.match.params.galID)
    }

    if (this.props.match.params.galID !== prevProps.match.params.galID) {
      this.getGalInfo(this.props.match.params.galID);
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
          author_id: res.data.Gallery[0].user_id
        })
        if(res.data.username === this.API.Auth.getUser())
          this.setState({sameUser: true})

        return;

      } 
    } 

    this.setState({redirectFlag: true})

  }

  handleThumbclick(){
    this.setState({imageCardVis: !this.state.imageCardVis})
  }

  onChange(e){
    this.setState({file:e.target.files[0]});
  }

  onFormSubmit(e){
     e.preventDefault();
     this.API.uploadImage(this.state.file, this.state.galID)
  }

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

  render(){
    const  imageCardVis = this.state.imageCardVis;

    let {galleryName, author, sameUser, redirectFlag } = this.state;

    if(typeof this.props.location.state !== 'undefined'){
  	  // let galleryName = this.props.location.state.itemName;
     //  let author = this.props.location.state.username;
     //  let galID = this.props.location.state.id;
    } else {

    }

  	const hrStyle = {
  		width: '80%', 
  		borderColor: '#ccc',
  		borderStyle:'solid'
  	};

  	return(
      <React.Fragment>
        {redirectFlag
          ?<Redirect to={`/user`}/>
          :<div id='gallerybody'>
      			<header className='gallery__header fl fl_row al_center'>
              <section className='gallery__title'>
      				  <h2 className='gallery__galname'>{galleryName}</h2>
      				  <div>by<span className='gallery__author'>{author}</span></div>
              </section>
              { sameUser &&
                <p className='gallery__toggle-up-btn fl al_center' onClick={this.toggleFileUpload}>
                    <i class="material-icons" style={{'padding-right':'5px'}}>control_point</i>UPLOAD NEW
                </p>
              }
      			</header>
    				<hr style={hrStyle}/>
            {this.uploadForm()}
    				<ImageCard 
              API={this.API} 
              onCloseClick={this.handleThumbclick} 
              isVisible={imageCardVis}/>
      		</div>
        }
      </React.Fragment>
  	);
  }

}
