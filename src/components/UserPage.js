// ** Main modules
import React from 'react';
import { Redirect } from 'react-router-dom';

// ** CSS
import './userpage.css';


export default class UserPage extends React.Component {

	constructor(props) {
		super(props);
		this.Auth = this.props.Auth;
		this.updateLoggedIn = this.props.updateLoggedIn;

		this.logout = this.logout.bind(this);
	}

	logout() {
		console.log('Deleting token')
		this.Auth.logout();
		this.updateLoggedIn();
	}

	render() {
		const isLoggedIn = this.props.isLoggedIn;
		return (
			<div className='userpage'>
				<FlexBox>
					<h1>You are logged in!</h1>
					{isLoggedIn
						? <LogoutBtn func={this.logout} />
						: <Redirect to='/' />
					}
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

function LogoutBtn(props) {
	return (
			<button 
				className='logout'
				type='button'
				onClick={props.func}>
					Logout
			</button>
		)

}
