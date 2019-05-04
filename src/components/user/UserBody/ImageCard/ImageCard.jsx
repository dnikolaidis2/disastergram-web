import React from 'react';
//import { Redirect } from 'react-router-dom';

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
			isHidden: this.props.isHidden || true,
		}
		this.gal = this.props.gal;

		this.onCloseClick = this.onCloseClick.bind(this);
		this.stopClickPropagation = this.stopClickPropagation.bind(this);
		this.infoTab = this.infoTab.bind(this);

	}

	onCloseClick() {
		this.props.onCloseClick();
		console.log('isHidden: true')

	}

	stopClickPropagation(event) {
		event.stopPropagation();
	}

	// -- Submodules
s
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
		const isHidden = this.props.isHidden;

		return (
			<React.Fragment>
				{!isHidden && 
				<div className='image-card__container noSelect' onClick={this.onCloseClick}>
					<button className='image-card__closebtn' onClick={this.onCloseClick}><i className='fa fa-times'></i></button>

					<article className='image-card card' onClick={this.stopClickPropagation}>
						<picture className='image-container'>
							{this.infoTab()}
							<img className='image-card__image' alt='Post' src={imgsrc}></img>
						</picture>


						{this.gal()}
						{this.gal()}
						{this.gal()}
						{this.gal()}
						{this.gal()}
						{this.gal()}
					</article>
				</div>
				}
			</React.Fragment>
		)
	}


}