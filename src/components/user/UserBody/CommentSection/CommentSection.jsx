import React from 'react';
//import { Redirect } from 'react-router-dom';

// *** CSS
import './commentsection.css'


export default class CommentSection extends React.Component {
	constructor(props) {
		super(props)

		this.API = this.props.API;

		this.state = {
			isVisible : this.props.isVisible,
			comments: [
				{id: 1, username: 'Bob', text: 'This is the most beautiful gallery.'},
				{id: 2, username: 'Karen', text: 'But this isn\'t a gallery... it\'s an image!!'},
				{id: 3, username: 'Bob', text: 'Stfu Karen. No one likes youStfu Karen. No one likes youStfu Karen. No one likes youStfu Karen. No one likes youStfu Karen. No one likes you'},
				{id: 4, username: 'Bob', text: 'Stfu Karen. No one likes you.'},
				{id: 5, username: 'Bob', text: 'Stfu Karen. No one likes you.'},
				{id: 6, username: 'Bob', text: 'Stfu Karen. No one likes you.'},
				{id: 7, username: 'Bob', text: 'Stfu Karen. No one likes you.'},
				{id: 8, username: 'Bob', text: 'Stfu Karen. No one likes you.'},
				{id: 9, username: 'Bob', text: 'Stfu Karen. No one likes you.'},
				{id: 10, username: 'Jacob', text: 'Yeah karen, go kys.'},
			],
			commentStyle : {
				style : {
					backgroundColor: 'white' //default 
				}
			}
		}


		this.getComments = this.getComments.bind(this);
		this.determinAnimStyle = this.determinAnimStyle.bind(this);
		this.setStyle = this.setStyle.bind(this);
	}

	componentDidMount(){
		this.setStyle(this.props.type);
		//this.getComments(this.props.type, this.props.id);

	}

	async getComments(type, id) {
		var res;
		
		if (type === 'gallery') {
			res = await this.API.getGalComments(id);
		}
		else if (type === 'image') {
			res = await this.API.getImageComments(id);
		}

		if (typeof res !== 'undefined') {
			// const comments = res.data['Comments']
		}

		// this.setState({comments: comments})
	}

	setStyle(type){
		var commentStyle = {};
		if(type === 'image'){
			commentStyle = {
				container : {
					backgroundColor: '#eeeeee' 
				},
				username: {

				},
				text: {
					color: '#555'
				},
			}
			this.setState({commentStyle})
		} 
		else if (type = 'galshowcase')
			commentStyle = {
				container : {
					backgroundColor: '#eeeeee' 
				},
				username: {

				},
				text: {
					color: '#555'
				},
			}
			this.setState({commentStyle})


	}

	showComment(comment){
		let commentStyle = this.state.commentStyle

		return (
			<div className='comment select' key={comment.id} style={commentStyle.container}>
				<p className='comment__username' style={commentStyle.username}>{comment.username}:</p>
				<p className='comment__text' style={commentStyle.text}>{comment.text}</p>
			</div>
		)
	}

	determinAnimStyle(x){
		const comments = this.state.comments;
		const isVisible = this.props.isVisible;


		switch(x) {
			case 'section':
				const height = (75 * Object.keys(comments).length) +'px';
				const visStyle = {
		      maxHeight: isVisible ? height : '0px',
		      transition: isVisible
		      	? '0.4s max-height ease-in-out, 0.4s height ease-in-out, 5s opacity, 5s visibility'
						: '0.4s max-height ease-in-out, 0.4s height ease-in-out, 0s opacity, 0s visibility',
				}
				return visStyle;
			case 'container':
				const visStyle2 = {
		      top: isVisible ? '0px' : '-280px',
		    	visibility: isVisible ? 'visible' : 'hidden',
		      opacity: isVisible ? '1' : '0',
		    	transition: isVisible 
		    		? '0.4s top ease-in-out, opacity 0s ease-in-out 0s, visibility 0s ease-in-out 0s' 
		    		: '0.4s top ease-in-out, opacity 0s ease-in-out 0.5s, visibility 0s ease-in-out 0.5s',
				}
				return visStyle2;
			default:
				return;
		}
	}

	render() {
		const comments = this.state.comments;
		let visStyle = this.determinAnimStyle('section');
		let visStyle2 = this.determinAnimStyle('container')


		return(
			<section className='comment-section' style={visStyle}>
				<div className='comment-section__container' style={visStyle2}>
				{
					comments.map( comment => {
						return this.showComment(comment, visStyle2);
					})
				}
				</div>
			</section>
		)
	}

}
 