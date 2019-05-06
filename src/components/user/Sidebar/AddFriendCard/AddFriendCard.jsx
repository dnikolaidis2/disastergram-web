import React from 'react';

import './addfriendcard.css'

// ** Components
import Input from './../../../inputs/InputBox.jsx';
import InputBtn from './../../../inputs/InputBtn.jsx';

export default class AddFriendCard extends React.Component {

	constructor(props) {
		super(props);

		this.API = this.props.API;

		this.onCloseClick = this.onCloseClick.bind(this);
		this.stopClickPropagation = this.stopClickPropagation.bind(this);
		this.handleSumbit = this.handleSumbit.bind(this);
		this.handleUsernameChange = this.handleUsernameChange.bind(this);

		this.state = {
			isVisible: this.props.isVisible || false,
			username: '',
		}
	}

	handleUsernameChange(username) {
		this.setState({username: username});
	}
	
	handleSumbit(e){
		e.preventDefault();

		const username = this.state.username;

		this.API.addFriend(username)
			.then ( res => {
				console.log('Friend Actually added');
			})

	}

	onCloseClick() {
		this.props.onCloseClick();
		console.log('isVisible: false')
	}

	stopClickPropagation(event) {
		event.stopPropagation();
	}

	render() {
		const isVisible = this.props.isVisible;
		const username = this.state.username;

		return (
			<React.Fragment>
				{isVisible &&
				<div className='addfriend-card__container' onClick={this.onCloseClick}>
						<button className='closebtn' onClick={this.onCloseClick}><i className='fa fa-times light-weight'></i></button>

						<article className='addfriend-card card' onClick={this.stopClickPropagation}>
							<h2>Add Friend</h2>
							<form
								className='addFriendForm'
								autoComplete='off'
								onSubmit={this.handleSumbit}>
								<Input
									id={1}
									value={username}
									onValueChange={this.handleUsernameChange}
									type="text"
									label="Username"
									locked={false}
									active={false}/>
								<InputBtn />
							</form>
						</article>
				</div>
				}
			</React.Fragment>

		);


	}

}