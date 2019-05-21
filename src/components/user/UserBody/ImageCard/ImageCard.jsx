import React from 'react';
//import { Redirect } from 'react-router-dom';

// *** Components
import CommentSection from './../CommentSection'

// *** CSS
import './imagecard.css'

export default class ImageCard  extends React.Component {
	constructor(props){
		super(props)
		
		this.state = {
			image: {
				author: 'Naughtius Maximus',
				title: 'A beautiful Bridge',
				id: '1234',
			},			
			isVisible: this.props.isVisible || false,
		}
		this.API = this.props.API;

		this.onCloseClick = this.onCloseClick.bind(this);
		this.stopClickPropagation = this.stopClickPropagation.bind(this);
		this.infoTab = this.infoTab.bind(this);

	}

	onCloseClick() {
		this.props.onCloseClick();
	}

	stopClickPropagation(event) {
		event.stopPropagation();
	}

	// -- Submodules

	infoTab() {
		return (
				<section className='image-card__image-info select'>
					<p className='byP'>by<span className='image-author'>{this.props.author}</span></p>
				</section>
			)
	}


	render() {
		const imgsrc = this.props.imageURL;
		const id = this.props.imageID;
		const isVisible = this.props.isVisible;

		const hrStyle = {width: '100%', 'borderColor': '#dddddd', 'borderStyle':'solid'};

		return (
			<React.Fragment>
				{isVisible && 
				<div className='image-card__container noSelect' onClick={this.onCloseClick}>
					<button className='image-card__closebtn' onClick={this.onCloseClick}><i className='fa fa-times'></i></button>

					<article className='image-card fl fl_row al_center js_center' >
							<img className='image-card__image' alt='Post' src={imgsrc} onClick={this.stopClickPropagation}></img>
					</article>
					<aside className='image-card-aside fl fl_column al_center' onClick={this.stopClickPropagation}>
						{this.infoTab()}
						<hr style={hrStyle}/>
						<CommentSection API={this.API} type='image' id={id} isVisible={null}/>
					</aside>
				</div>
				}
			</React.Fragment>
		)
	}
}
						// <picture className='image-container fl js_center'>
						// </picture>