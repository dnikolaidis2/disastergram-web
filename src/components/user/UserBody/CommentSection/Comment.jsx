// ** Main modules
import React from 'react';

export default class Comment extends React.Component {
	constructor(props) {
		super(props);

		this.API = this.props.API;
		this.updateParent = this.props.updateParent;

		this.state = {
			isHovered : false,
		}

		this.onMouseEnter = this.onMouseEnter.bind(this);
		this.onMouseLeave = this.onMouseLeave.bind(this);

		this.deleteComment = this.deleteComment.bind(this);
	}


	onMouseEnter() {
		this.setState({isHovered:true})
		clearTimeout(this.state.leaveTimeout)
	}

	onMouseLeave() {
		var leaveTimeout = setTimeout( ()=>{
					this.setState({isHovered:false})
				}, 400);
		this.setState({leaveTimeout})
	}

	deleteComment(id, e) {
		if(this.props.type === 'image'){
			this.API.deleteImageComment(id)
				.then( res => {
						this.updateParent();
					})
		}
		else{
			this.API.deleteGalComment(id)
				.then( res => {
					this.updateParent();
				})
		}
	}

		render() {
			let { isHovered } = this.state;

			const { comment, sameUserFlag, style} = this.props;

			const deleteBtnStyle = {
				opacity: isHovered ? '1' : '0',
			}

			return (
				<div 
					className='comment select' 
					key={comment.comment_id}
					onMouseEnter={this.onMouseEnter}
					onMouseLeave={this.onMouseLeave}
					style={style.container}>
						{(sameUserFlag) && 
							<div 
								className='delete-comment-btn noSelect' 
								onClick={this.deleteComment.bind(this, comment.comment_id)}
								style={deleteBtnStyle}>
								<i className="material-icons">delete_outline</i>
							</div>
						}
						<p className='comment__username' style={style.username}>{comment.username}:</p>
						<p className='comment__text' style={style.text}>{comment.body}</p>
				</div>
			)
	}
}