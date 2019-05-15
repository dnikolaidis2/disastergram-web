import React from 'react';

import './addimagecard.css'

// ** Components
// import Input from './../../../inputs/InputBox.jsx';
import InputBtn from './../../../inputs/InputBtn.jsx';

export default class AddImageCard extends React.Component {
	constructor(props) {
		super(props)

		this.API = this.props.API;
		this.updateParent = this.props.updateParent;
		this.startedUpload = this.props.startedUpload;
		this.finishedUpload = this.props.finishedUpload;

		this.onCloseClick = this.onCloseClick.bind(this);
		this.stopClickPropagation = this.stopClickPropagation.bind(this);
		
		this.handleChange = this.handleChange.bind(this);
		this.handleFormSubmit = this.handleFormSubmit.bind(this);

		this.state = {
			isVisible: this.props.isVisible || false,
			param: '',
			file: null,
			filePreview: '',
		}
	}

	// *** Form Handling ***

  handleChange(e){
  	console.log( )
  	if(e.target.files.length > 0){
	  	this.setState({
	  		file:e.target.files[0],
	  		filePreview: URL.createObjectURL(e.target.files[0])
	  	});
  	}
	}

  handleFormSubmit(e){
  	this.startedUpload();
    e.preventDefault();
    this.API.uploadImage(this.state.file, this.props.galID)
      .then(res => {
      	this.finishedUpload();
        if(res.status < 400) {
          setTimeout(1000);
          this.updateParent();
        }
      });
    e.target.reset();
  	this.setState({file:null, filePreview: ''})
    this.onCloseClick();
  }

  // *** Form Handling - END ***

  onCloseClick() {
		this.props.onCloseClick();
	}

	stopClickPropagation(event) {
		event.stopPropagation();
	}

		render() {
			const isVisible = this.props.isVisible;
			const contVisStyle = {
	      visibility: isVisible ? 'visible' : 'hidden',
	      opacity: isVisible ? '1' : 0
			}

			const visStyle = {
	      maxHeight: isVisible ? '80%' : '0%',
	      visibility: isVisible ? 'visible' : 'hidden',
	      opacity: isVisible ? '1' : 0
			}


			return(

	      <React.Fragment>
					<div 
						className='add-imagecard__container noSelect' 
						style={contVisStyle}
						onClick={this.onCloseClick}>
							<button className='closebtn' onClick={this.onCloseClick}>
								<i className='fa fa-times light-weight'></i>
							</button>

							<article className='add-card card fl fl_column al_center js_center' style={visStyle} onClick={this.stopClickPropagation}>
								<h2 className='addimage-card__title'> Upload a new image</h2>
								<form
									className='addimage-card__form fl fl_column al_center js_center'
									autoComplete='off'
									onSubmit={this.handleFormSubmit}>
						        <input className='addimage-card__input' type="file" onChange={this.handleChange}/>
						        {this.state.filePreview === '' || <img className='previewImage' alt='preview' src={this.state.filePreview}/>}
									<InputBtn />
								</form>
							</article>
					</div>
				</React.Fragment>

			);
		}
}