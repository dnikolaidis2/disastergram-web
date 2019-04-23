import React from 'react';
import ReactDOM from 'react-dom';

import axios from 'axios';

import Input from './components/inputs/InputBox.jsx';
import InputBtn from './components/inputs/InputBtn.jsx'
import Table from './components/Table/Table.jsx'
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


// TEST CLASS -- REMOVE

// class TestList extends React.Component {
// 	constructor(props) {
// 		super(props)

// 		this.state = {
// 			people: []
// 		}
// 	}

// 	componentDidMount() {
// 		axios.get('https://jsonplaceholder.typicode.com/users')
// 			.then(res =>{
// 				const people = res.data;
// 				this.setState({ people });
// 			})
// 	}

// 	render(){
// 		const people = this.state.people;

// 		return (
// 			<div id="testlist">
// 				<Table data={people}/>
// 			</div>
// 		)
// 	}
// }

class TestList extends React.Component {
	constructor (props) {
		super(props);

		this.state = {
			pubkey: props.pubkey || "",
		}
	}

	componentDidMount() {
		axios.get('http://192.168.1.150:5000/auth/pubkey',{crossDomain: true})
			.then(res =>{
				const pubkey = res.data.public_key;
				this.setState({ pubkey });
			})
	}

	render(){
		const pubkey = this.state.pubkey;

		return (
			<div id="testlist">
					<p>Public Key: {pubkey}</p>
			</div>
		)
	}
}



function FlexBox(props) {
	return(
		<div className='flexbox'>
			{props.children}
		</div>
	);

}


function LoginTitle() {
	return ( 
		<p id='loginTitle'>
			<span style={titleStyle}>Welcome to </span>
			<span style={titleDisaster}>disaster</span>
			<span style={titleStyle}>gram</span>
		</p>
	);
};



const titleStyle = {
	color: "black",
	textShadow: "0px 3px 5px #585858",
	fontSize: "30px",
	fontWeight: "100",
	paddingLeft: "0px"
};


{/*"#f49511"*/}
const titleDisaster = {
	color: "purple",//"#e51d1d",
	//textShadow: "0px 0px 10px #9f0000",
	textShadow:"0px 3px 5px #585858",
	fontSize: "30px",
	fontWeight: "100",
	background: "white",
	borderRadius: "5px",
	paddingLeft: "0px",
	paddingRight: "0px"
};


ReactDOM.render(
	<FlexBox>
		<TestList />
		<Login />
	</FlexBox>,
	document.getElementById('root')
);





//@TODO fix
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
