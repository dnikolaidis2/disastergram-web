// ** Main modules
import React from 'react';
import { Redirect } from 'react-router-dom';

// ** CSS
import './userpage.css';


export default class UserPage extends React.Component {

	constructor(props) {
		super(props);

		this.Auth = this.props.Auth;

		this.logout = this.logout.bind(this);
	}

	logout() {
		console.log('I run!')
		this.Auth.logout();
		this.forceUpdate();
	}

	render() {
		return (
			<div className='userpage'>
				<FlexBox>
					<h1>You are logged in!</h1>
					{this.Auth.isLoggedIn() 
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
				onClick={props.func}
			>
				Logout
			</button>
		)

}
