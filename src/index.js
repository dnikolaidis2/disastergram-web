// ** Main modules
import React from 'react';
import ReactDOM from 'react-dom';

// ** API imports

// ** Components
import Login from './components/Login.js'


//import Table from './components/Table/Table.jsx'

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
	constructor(props) {


	}

}




// TEST CLASS -- REMOVE

// class TestList extends React.Component {
// 	constructor(props) {
// 		super(props)

// 		this.state = {
// 			people: []
// 		}
// 	}

// 	componentDidMount() {
// 		axios.get('https://jsonplaceholder.typicode.com/users')
// 			.then(res =>{
// 				const people = res.data;
// 				this.setState({ people });
// 			})
// 	}

// 	render(){
// 		const people = this.state.people;

// 		return (
// 			<div id="testlist">
// 				<Table data={people}/>
// 			</div>
// 		)
// 	}
// }

// class TestList extends React.Component {
// 	constructor (props) {
// 		super(props);

// 		this.state = {
// 			pubkey: props.pubkey || "",
// 		}
// 	}

// 	componentDidMount() {
// 		axios.get('http://192.168.1.150:5000/auth/pubkey',{crossDomain: true})
// 			.then(res => {
// 				const pubkey = res.data.public_key;
// 				this.setState({ pubkey });
// 			})
// 	}

// 	render() {
// 		const pubkey = this.state.pubkey;

// 		return (
// 			<div id="testlist">
// 					<p>Public Key: {pubkey}</p>
// 			</div>
// 		)
// 	}
// }


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


ReactDOM.render(
	<FlexBox>
		<Card>
			{LoginTitle()}
			<Login />
		</Card>
	</FlexBox>,
	document.getElementById('root')
);





//@TODO fix
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
