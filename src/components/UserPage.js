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
				
				<Split direction='left' percent='20%'>
						<h1>This is the left pane</h1>
				</Split>
				<Split direction='right' percent='80%'>
						<h1>You are logged in!</h1>
						{isLoggedIn
							? <LogoutBtn func={this.logout} />
							: <Redirect to='/' />
						}
				</Split>


			</div>
		);
	}

}


// Split layout t
function Split(props) {

	const style = {width: props.percent};

	return (
		<div className={'flexbox split ' + props.direction} style={style}>
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
