import React from 'react';
//import { Redirect } from 'react-router-dom';

// *** CSS
import './commentsection.css'
import Input from './../../../inputs/InputBox.jsx';


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
			},
			loading: true,
			commentToAdd: '',
		}


		this.getComments = this.getComments.bind(this);
		this.determineAnimStyle = this.determineAnimStyle.bind(this);
		this.setStyle = this.setStyle.bind(this);
		this.handleCommentChange = this.handleCommentChange.bind(this);
		this.handleCommentSubmit = this.handleCommentSubmit.bind(this);
	}

	componentDidMount(){
		this.setStyle(this.props.type);
		this.getComments(this.props.type, this.props.id);

	}

	async getComments(type, id) {
		var res;
		// Get Appropriate data from server	
		if (type === 'gallery' || type === 'galshowcase') {
			res = await this.API.getGalComments(id);
		}
		else if (type === 'image') {
			res = await this.API.getImageComments(id);
			// this.setState({comments: [], loading:false});
		}


		// Handle response
		if (typeof res !== 'undefined') {
			const comments = res.data['comments'];

			// If no comments
      if(res.status === 204){
      	console.log('No comments found!')
        this.setState({comments: [], loading:false});
        return;
      }
      this.setState({comments, loading:false});
		}
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
		else if (type === 'galshowcase')
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
			<div className='comment select' key={comment.comment_id} style={commentStyle.container}>
				<p className='comment__username' style={commentStyle.username}>{comment.username}:</p>
				<p className='comment__text' style={commentStyle.text}>{comment.body}</p>
			</div>
		)
	}

	determineAnimStyle(x){
		const comments = this.state.comments;

		let height = 95 + (75 * Object.keys(comments).length) +'px';

		const isVisible = this.props.isVisible;


		switch(x) {
			case 'section':
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

	// *** Comment Handling ***

	handleCommentChange(commentToAdd) {
		this.setState({commentToAdd: commentToAdd});
	}

	handleCommentSubmit(e){
		e.preventDefault();

		this.setState({commentToAdd : ''})
		this.API.addGalComment(this.props.id, this.state.commentToAdd)
			.then( res => {
				if(typeof res !== 'undefined'){
					if(res.status < 400){
						console.log('Comment added!');
						this.refreshComments();
					}
				}
			})
	}

	refreshComments(){
		this.getComments(this.props.type, this.props.id);
	}

	render() {
		const commentToAdd = this.state.commentToAdd;
		const loading = this.state.loading;
		const comments = this.state.comments;
		let visStyle = this.determineAnimStyle('section');
		let visStyle2 = this.determineAnimStyle('container')

		const type = this.props.type;

		// 'image' means that the bg of the module is white
		// bg is white in other cases. Change className accordingly (style changes in css file)
		const classAddField = `comment-section__add__field ${type === 'image' ? 'whiteBG' : 'blackBG' }`;
		// const classCont = `comment-section__container ${ type === 'image' ? 'whiteBG' : 'blackBG' }`;


		return(
			<section className='comment-section' style={visStyle}>
				<div className='comment-section__container' style={visStyle2}>
					{!loading &&
						comments.map( comment => {
							return this.showComment(comment, visStyle2);
						})
					}
					<div className='comment-section__add'>
						<form
							className='comment-section__add__form fl js_center al_center'
							autoComplete='off'
							onSubmit={this.handleCommentSubmit}>
							<Input
								id={1}
								class={classAddField}
								value={commentToAdd}
								onValueChange={this.handleCommentChange}
								type="text"
								label={'Add a comment...'}
								locked={false}
								active={false}/>
							<input className='commentAdd-Btn' type="submit" value="Submit"/>
						</form>
					</div>
				</div>
			</section>
		)
	}

}
 