// ** Main modules
import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, browserHistory} from 'react-router';

// ** Components
import LoginPage from './components/LoginPage.js'

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

*/

class App extends React.Component {
	render() {
		return (
				<LoginPage />
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
