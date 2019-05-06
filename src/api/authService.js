import decode from 'jwt-decode';
import axios from 'axios';

export default class AuthAPI {

	constructor(domain) {

		// @TODO maybe move this to ENV vars
		//this.domain = 'http://disastergram.nikolaidis.tech:5000';
		//axios.defaults.baseURL = 'http://disastergram.nikolaidis.tech:5000/auth'
		axios.defaults.baseURL = domain;
		

		// Binding our methods to our object
		this.login = this.login.bind(this);
		this.refresh = this.refresh.bind(this);	
		this.getHeaders = this.getHeaders.bind(this);	
		this.getToken = this.getToken.bind(this);	
	}

	login(username, password) {
		//** Get a token from the auth server

		// if(process.env.NODE_ENV ==='development'){
		// 	this.setToken('no-token');
		// 	this.setUser('UserName')
		// 	return Promise.resolve(null);
		// }

		const headers = this.getHeaders();

		const data = {
			username: username,
			password: password
		}

		return axios.post(`/auth/login`,
			{headers: {...headers}},
		 	{data: {...data}})
			.then( res => {
				// Save token using localstorage
				this.setToken(res.data.token);
				this.setUser(username);
				
				if (process.env.NODE_ENV ==='development') {
					console.log('Token received!');
					console.log(res.data.token);
				}
				
				return Promise.resolve(res);
			})
	}

	register(username, password) {
		//** Get a token from the auth server

		const headers = this.getHeaders();

		const data = {
			username: username,
			password: password
		}

		return axios.post(`/auth/register`,
			{headers: {...headers}},
		 	{data: {...data}})
			.then( res => {
				// Save token useing localstorage
				
				if (process.env.NODE_ENV ==='development' && res.status === 203) {
					console.log('Succesfully registered!');
				}
				
				return Promise.resolve(res);
			})
	}

	
	refresh() {
		// ** Refresh token function

		const token = this.getToken();
		const headers = this.getHeaders();
		const data = {
			token : token
		}

		return axios.put('/auth/refresh',
			{headers: {...headers}},
		 	data)
			.then( res => {
				this.setToken(res.token);
				return true;
			})
	}


	isLoggedIn() {
		//** Check if the user is already logged in

		// Get token from localStorage
		const token = this.getToken();
		
		// if token is not empty AND is NOT expired, return TRUE
		return !!token && !this.isTokenExpired(token);
	}


	isTokenExpired(token) {
		// if (process.env.NODE_ENV === 'development')
		// 	return false;

		try {
			// Decode jwt token
			const decoded = decode(token);
			
			if (decoded.exp < Date.now() / 1000)
				return true;
			else
				return false;

		}
		catch (err) {
			return false;
		}
	}

 	setToken(idToken) {
      //** Save user token to localStorage
      localStorage.setItem('id_token', idToken);
  }

  getToken() {
      //** Retrieve the user token from localStorage
      return localStorage.getItem('id_token');
  }

	setUser(username) {
		//** Save username to localStorage
    localStorage.setItem('username', username);
	}

	getUser() {
      //** Retrieve the username from localStorage
      return localStorage.getItem('username');
  }


  logout() {
      //** Clear user token and profile data from localStorage
      localStorage.removeItem('id_token');
  }


  getHeaders() {
  	// Set up headers for all requests
		const headers = {
	    'Accept': 'application/json',
      'Content-Type': 'application/json'
    };

    if (this.isLoggedIn()) {
    	headers['Authorization'] = 'Bearer ' + this.getToken();
    }

    return headers;

  }

}