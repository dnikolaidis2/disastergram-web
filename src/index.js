// ** Main modules
import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Route } from 'react-router-dom';

// ** API imports
import AuthAPI from './api/AuthService.js';

// ** Components
import LoginPage from './components/LoginPage.js'
import UserPage from './components/UserPage.js'

// ** CSS
import './index.css';

import * as serviceWorker from './serviceWorker';

class App extends React.Component {
	constructor(props) {
		super(props);
		this.Auth = new AuthAPI('https://disastergram.network');

		this.updateLoggedIn = this.updateLoggedIn.bind(this);

		this.state = {
			// Assume not logged in, failsafe
			isLoggedIn: false
		}

	}

	componentDidMount() {
		this.updateLoggedIn();
	}


	updateLoggedIn() {
		const status = this.Auth.isLoggedIn()
		// const color = status ? 'color: green':'color: red';
		// console.log('LoggedIn: %c' + status, color);
		this.setState(() => ({ isLoggedIn: status	}));
		return status;
	}

	render() {
		const Auth = this.Auth;
		const updateLoggedIn = this.updateLoggedIn;
		const isLoggedIn = this.state.isLoggedIn;
		return (
				<BrowserRouter>
					<div className='App'> 
						<Route 
							exact path={['/','/login']} 
							render={(props)=> 
								<LoginPage
									{...props} 
									Auth={Auth} 
									updateLoggedIn={updateLoggedIn} 
									isLoggedIn={isLoggedIn}/>
							}/>
						<Route 
							path={['/user', '/feed']} 
							render={(props)=> 
								<UserPage 
									{...props}
									Auth={Auth} 
									updateLoggedIn={this.updateLoggedIn} 
									isLoggedIn={isLoggedIn}/>
							}/>
					</div>
				</BrowserRouter>
			);
	}

}

ReactDOM.render(
	<App />,
	document.getElementById('root')
);



//@TODO fix
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
