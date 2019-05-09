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
			username: '',
			password: '',
			confpass: '',
			erPass: '',
			erCPass: '',
			isRegistering: false
		};

		this.handleUsernameChange = this.handleUsernameChange.bind(this);
		this.handlePasswordChange = this.handlePasswordChange.bind(this);
		this.handleConfPassChange = this.handleConfPassChange.bind(this);
		this.handleRegisterChange = this.handleRegisterChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.validateForm = this.validateForm.bind(this);
	}

	// Do some basic Validation
	// @TODO expand
	validateForm() {
		const { username, password, confpass, isRegistering } = this.state;

		if (isRegistering && (password !== confpass)) {
			
			this.setState({
					username: '',
					password: '',
					confpass: '',
					erPass: 'Passwords do not match!'
				});
			return false;
		}

		if (username.length <= 0 && password.length <= 0)
			return false;

		return true;
	}

	// @TODO Probably can migrate these two functions
	handleUsernameChange(username) {
		this.setState({username: username});
	}

	handlePasswordChange(password) {
		this.setState({password: password});
	}

	handleConfPassChange(confpass) {
		this.setState({confpass: confpass});
	}


	handleSubmit(e){
		e.preventDefault();
		if (!this.validateForm())
			return;

		const { username, password, isRegistering } = this.state;

		if(isRegistering) {
			this.Auth._register(username, password)
			.then( res => {
				
				if (res.status === 201)
					// If succesfully registered, then

					this.Auth._login(username, password)
						.then( res => {
							this.Auth._getID();
							// force refresh parents logged in status
							this.updateLoggedIn();
						})			

			})
			return;
		}

		// If not Registering
		this.Auth._login(username, password)
			.then( res => {
				// force refresh parents logged in status
				this.updateLoggedIn();
			})		

		this.Auth._getID();
	}

	handleRegisterChange(){
		this.setState({isRegistering : !this.state.isRegistering})
	}

	render() {
		const { username, password, confpass, erCPass, erPass, isRegistering } = this.state;

		const isVisible = {
			height: isRegistering ? '56px' : '0px',
			visibility: isRegistering ? 'visible' : 'hidden',
			opacity: isRegistering ? '1' : 0
		}

		return (
			<div id='login'>
				<form 
					className="loginForm"
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
						error={erPass}
						/>
					<Input 
						onUser
						id={3}
						value={confpass}
						onValueChange={this.handleConfPassChange}
						style={{...isVisible}}
						type="password"
						label="Confirm Password"
						locked={false}
						active={false}
						error={erCPass}
					/>
					<InputBtn />
				</form>
				<p className='registerPrompt' onClick={this.handleRegisterChange}>Do you want to register?</p>
			</div>
		);
	}

};