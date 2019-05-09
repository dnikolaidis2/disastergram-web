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
				{username: 'Bob', text: 'This is the most beautiful gallery.'},
				{username: 'Karen', text: 'But this isn\'t a gallery... it\'s an image!!'},
				{username: 'Bob', text: 'Stfu Karen. No one likes you.'},
				{username: 'Bob', text: 'Stfu Karen. No one likes you.'},
				{username: 'Bob', text: 'Stfu Karen. No one likes you.'},
				{username: 'Bob', text: 'Stfu Karen. No one likes you.'},
				{username: 'Bob', text: 'Stfu Karen. No one likes you.'},
				{username: 'Bob', text: 'Stfu Karen. No one likes you.'},
				{username: 'Bob', text: 'Stfu Karen. No one likes you.'},
				{username: 'Jacob', text: 'Yeah karen, go kys.'},
			],
		}

		this.getComments = this.getComments.bind(this);
	}

	componentDidMount(){
		//this.getComments(this.props.type, this.props.id);

	}

	async getComments(type, id) {
		var comments, res;
		
		if (type === 'gallery') {
			res = await this.API.getGalComments(id);
		}
		else if (type === 'image') {
			res = await this.API.getImageComments(id);
		}

		if (typeof res !== 'undefined') {
			comments = res.data['Comments']
		}

		// this.setState({comments: comments})
	}

	showComment(comment){
		return (
			<div className='comment select'>
				<p className='comment__username'>{comment.username}:</p>
				<p className='comment__text'>{comment.text}</p>
			</div>
		)
	}


	render() {
		const comments = this.state.comments;
		const isVisible = this.props.isVisible;

		const visStyle = {
      height: isVisible ? '290px' : '0px',
      // visibility: isVisible ? 'visible' : 'hidden',
      // opacity: isVisible ? '1' : '0',
      transition: isVisible
      	? '0.4s height ease-in-out, 5s opacity, 5s visibility'
				: '0.4s height ease-in-out, 0s opacity, 0s visibility',
			}

		const visStyle2 = {
      top: isVisible ? '0px' : '-280px',
    	visibility: isVisible ? 'visible' : 'hidden',
      opacity: isVisible ? '1' : '0',
    	transition: isVisible 
    		? '0.4s top ease-in-out, opacity 0s ease-in-out 0s, visibility 0s ease-in-out 0s' 
    		: '0.4s top ease-in-out, opacity 0s ease-in-out 0.5s, visibility 0s ease-in-out 0.5s',
		}

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
 