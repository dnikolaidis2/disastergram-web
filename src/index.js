import React from 'react';
import ReactDOM from 'react-dom';

import axios from 'axios';

import Input from './components/inputs/InputBox.jsx';
import InputBtn from './components/inputs/InputBtn.jsx'
import './index.css';
import * as serviceWorker from './serviceWorker';


class Login extends React.Component {

	constructor(props) {
		super(props);

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
		alert('You sumbitted: ' + this.state.username + this.state.password);
		e.preventDefault();
	}

	render() {
		const username = this.state.username;
		const password = this.state.password;

		return (
			<div id='login'>
				{LoginTitle()}
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

class TestList extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			persons: []
		}
	}

	componentDidMount() {
		axios.get('https://jsonplaceholder.typicode.com/users')
			.then(res =>{
				const persons = res.data;
				this.setState({ persons });
			})
	}

	render(){
		const persons = this.state.persons;

		return (
			<ul>
				{persons.map( person => <li>{person.name}</li>)}
			</ul>
		)
	}
}


function LoginTitle() {
		return ( 
			<p id='loginTitle'>
				<span style={titleStyle}>Welcome to </span>
				<span style={titleStyle}>disaster</span>
				<span style={titleStyle}>gram</span>
			</p>
		);
};



const titleStyle = {
	color: "black",
	textShadow: "0px 3px 5px #585858",
	fontSize: "30px",
	fontWeight: "100",
	paddingLeft: "2px"
};


{/*"#f49511"*/}
const titleDisaster = {
	color: "white",//"#e51d1d",
	//textShadow: "0px 0px 10px #9f0000",
	fontSize: "30px",
	fontWeight: "light",
	background: "white",
	borderRadius: "5px",
	paddingLeft: "5px",
	paddingRight: "5px"
};


ReactDOM.render(
	<Login />,
	document.getElementById('root')
);





//@TODO fix
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
