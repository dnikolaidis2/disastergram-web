// ** Main modules
import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Route } from 'react-router-dom';

// ** API imports
import AuthAPI from './api/authService.js';

// ** Components
import LoginPage from './components/LoginPage.js'
import UserPage from './components/UserPage.js'

// ** CSS
import './index.css';

import * as serviceWorker from './serviceWorker';


/*** ----
 @TODO:
  1. Create Three separate components that
   	will live under "card" component
 	2. Components: "Login", "Register", "Already logged in"
	3. Switch between them
	4. user page



	**** @TODO!IMPORTANT Will need to fix Routing on NGINX ****

*/

class App extends React.Component {
	constructor(props) {
		super(props);
		this.Auth = new AuthAPI('http://disastergram.nikolaidis.tech');

	}

	render() {
		const Auth = this.Auth
		//<Route path={'/login,/'} component={LoginPage}/>
		return (
				<BrowserRouter>
					<div className='App'> 
						<Route exact path={['/','/login']} render={()=> <LoginPage Auth={Auth} />} />
						<Route path={'/user'} render={()=> <UserPage Auth={Auth} />} />
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
