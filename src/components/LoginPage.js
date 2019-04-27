// ** Main modules
import React from 'react';
import { Redirect } from 'react-router-dom';


// ** Components
import Login from './Login.js'

// ** CSS
import './loginpage.css';



/*** ----
 @TODO:
  1. Create Three separate components that
   	will live under "card" component
 	2. Components: "Login", "Register", "Already logged in"
	3. Switch between them
	4. user page

*/

export default class LoginPage extends React.Component {
	constructor(props) {
		super(props);
		this.Auth = this.props.Auth;
		this.updateLoggedIn = this.props.updateLoggedIn;
	}

	

	render() {
		const isLoggedIn = this.props.isLoggedIn;
		if ( isLoggedIn === true ) {
			return <Redirect to='/user' />
		}

		return (
			<div className='loginpage'>
				<FlexBox>
					<Card>
						{LoginTitle()}
						<Login Auth={this.Auth} updateLoggedIn={this.updateLoggedIn}/>
					</Card>
				</FlexBox>
			</div>

			);
	}
}


function FlexBox(props) {
	return(
		<div className='flexbox'>
			{props.children}
		</div>
	);
}

function Card(props) {
	return (
		<div className="card">
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


const titleDisaster = {
	color: "purple",//"#e51d1d",
	//textShadow: "0px 0px 10px #9f0000",
	//"#f49511"
	textShadow:"0px 3px 5px #585858",
	fontSize: "30px",
	fontWeight: "100",
	background: "white",
	borderRadius: "5px",
	paddingLeft: "0px",
	paddingRight: "0px"
};


