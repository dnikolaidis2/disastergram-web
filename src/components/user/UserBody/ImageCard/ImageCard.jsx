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
		const image = this.state.image;

		return (
				<section className='image-card__image-info select'>
					<h2>{image.title}</h2>
					<div>by<span className='image-author'>{image.author}</span></div>
				</section>
			)
	}


	render() {
		const imgsrc = 'https://images.unsplash.com/photo-1508904186271-c9c83ae788cb?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1250&q=80'
		const isVisible = this.props.isVisible;

		const hrStyle = {width: '96%', 'borderColor': '#dddddd', 'borderStyle':'solid'};

		return (
			<React.Fragment>
				{isVisible && 
				<div className='image-card__container noSelect' onClick={this.onCloseClick}>
					<button className='image-card__closebtn' onClick={this.onCloseClick}><i className='fa fa-times'></i></button>

					<article className='image-card card' onClick={this.stopClickPropagation}>
						<picture className='image-container'>
							{this.infoTab()}
							<img className='image-card__image' alt='Post' src={imgsrc}></img>
						</picture>
						<hr style={hrStyle}/>
						<CommentSection API={this.API} type='image' id='e2dff1c1-223d-4956-ab7e-c509f4dc306a' isVisible={true}/>
					</article>
				</div>
				}
			</React.Fragment>
		)
	}
}