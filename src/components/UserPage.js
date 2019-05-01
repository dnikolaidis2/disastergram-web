// ** Main modules
import React from 'react';
import { Redirect } from 'react-router-dom';

// ** Components
import Sidebar from './user/Sidebar.jsx'

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
				
				<Split direction='left' percent='15%'>
					<Sidebar
						Auth={Auth}
						updateLoggedIn={updateLoggedIn} 
						isLoggedIn={isLoggedIn}/>
				</Split>
				<Split direction='right' percent='85%'>
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
		<div className={'split ' + props.direction} style={style}>
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
