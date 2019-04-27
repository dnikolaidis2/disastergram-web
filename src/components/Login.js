// ** Main modules
import React from 'react';



// ** Components
import Input from './inputs/InputBox.jsx';
import InputBtn from './inputs/InputBtn.jsx';

export default class Login extends React.Component {

	constructor(props) {
		super(props);

		this.Auth = this.props.Auth;
		this.updateLoggedIn = this.props.updateLoggedIn;

		this.state = {
			username: "",
			password: ""
		};

		this.handleUsernameChange = this.handleUsernameChange.bind(this);
		this.handlePasswordChange = this.handlePasswordChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	// Do some basic Validation
	// @TODO expand
	validateForm() {
		return this.state.username.length > 0 && this.state.password.length > 0;
	}

	// @TODO Probably can migrate these two functions
	handleUsernameChange(username) {
		this.setState({username: username});
	}

	handlePasswordChange(password) {
		this.setState({password: password});
	}

	handleSubmit(e){
		e.preventDefault();

		this.Auth.login(this.state.username, this.state.password)
			.then( res => {
				// force refresh parents logged in status
				this.updateLoggedIn();
			})			
		
	}

	render() {
		const username = this.state.username;
		const password = this.state.password;

		return (
			<div id='login'>
				
				<form 
					autoComplete="off" 
					onSubmit={this.handleSubmit}>

					<Input 
						id={1}
						value={username}
						onValueChange={this.handleUsernameChange}
						type="text"
						label="Username"
						locked={false}
						active={false}
						/>
					<Input 
						onUser
						id={2}
						value={password}
						onValueChange={this.handlePasswordChange}
						type="password"
						label="Password"
						locked={false}
						active={false}
						/>
					<InputBtn />

				</form>
			</div>
		);
	}

};