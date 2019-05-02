// ** Main modules
import React from 'react';
import { Redirect } from 'react-router-dom';

// ** Components
import Sidebar from './user/Sidebar'
import UserBody from './user/UserBody'

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
		const Auth = this.Auth;
		const isLoggedIn = this.props.isLoggedIn;
		const updateLoggedIn = this.updateLoggedIn;

		return (
			<div className='userpage'>
				
				<Split direction='left' percent='20%'>
					<Sidebar
						Auth={Auth}
						updateLoggedIn={updateLoggedIn} 
						isLoggedIn={isLoggedIn}/>
				</Split>
				<Split direction='right'>
						<div className='top-banner'/>
						<h1>You are logged in!</h1>
						{!isLoggedIn && <Redirect to='/' />}
				</Split>


			</div>
		);
	}

}


// Split layout t
function Split(props) {
	const style = {width: props.percent || 'auto'};
	return (
		<div className={'split ' + props.direction} style={style}>
			{props.children}
		</div>
		);
}

