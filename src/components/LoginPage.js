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
			let url = '/user';
			if(typeof this.props.location.state !== 'undefined')
				url = this.props.location.state.url;
			
			return <Redirect to={{pathname:`${url}`}} />
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
		<header id='loginTitle'>
			<h3 style={titleStyle}>Welcome to</h3>
			<span style={titleDisaster}>Disastergram</span>
		</header>
	);
};

const titleStyle = {
	color: "black",
	// textShadow: "0px 3px 5px #585858",
	fontSize: "22px",
	fontWeight: "400",
	fontFamily: "Raleway",
	paddingLeft: "0px"
};

const titleDisaster = {
	color: "#995cd6",//"#e51d1d",
	//textShadow: "0px 0px 10px #9f0000",
	//"#f49511"
	textShadow:"0px 3px 9px 0px #585858",
	fontSize: "40px",
	fontFamily: "Pacifico",
	fontWeight: "100",
	background: "white",
	borderRadius: "5px",
	paddingLeft: "0px",
	paddingRight: "0px"
};


