import axios from 'axios';


export default class API {

	constructor(domain, Auth) {
		axios.defaults.baseURL = domain;

		this.Auth = Auth;

		this.state = {
			username: this.Auth.getUser(),
			userToken:  this.Auth.getToken(),
			headers: {
				Accept: 'application/json',
	    	'Content-Type': 'application/json'
			}
		}
	}

	addFriend(username) {
		const {headers, userToken} = this.state;

		const data = {
			username: username,
			token: userToken
		}

		return axios.post(`/api/user/follow`,
			{headers: {...headers}},
		 	{data: {...data}})
			.then( res => {
				if (process.env.NODE_ENV ==='development' && res.status === 203) {
					console.log('API: added user: ' + username);
				}
				
				return Promise.resolve(res);
			})
			.catch( er => {
				console.log(er)
			})

	}

	addGallery(galName) {
		const {headers, userToken} = this.state;

		const data = {
			galleryname: galName,
			token: userToken
		}

		return axios.post(`/api/user/gallery`,
			{headers: {...headers}},
		 	{data: {...data}})
			.then( res => {
				if (process.env.NODE_ENV ==='development' && res.status === 203) {
					if(res.status === 201)
						console.log('API: POST gallery: 201. Created: ' + galName);
					if(res.status === 200)
						console.log('API: POST gallery: 200. Already exists: ' + galName);
				}
				return Promise.resolve(res);
			})
			.catch( er => {
				console.log(er)
			})
	}

	getFriends() {
		const {headers, userToken} = this.state;

		return axios.get('/api/user/friends', 
				{params: {
					token: userToken
				}},
				{headers: {...headers}},
			)
			.then( res => {
				if (process.env.NODE_ENV ==='development' && res.status === 201)
					console.log('API: GET all friends: 200');
				return Promise.resolve(res);
			})
			.catch( er => {
				console.log(er)
			})

	}


	getGalleries() {
		const {headers, username, userToken} = this.state;

		// const url = `/api/user/${username}/galleries`

		return axios.get(`/api/user/${username}/galleries`, 
				{params: {
					token: userToken
				}},
				{headers: {...headers}},
			)
			.then( res => {
				if (process.env.NODE_ENV ==='development')
					if(res.status === 200){
						console.log('API: GET all galleries: 200.');
					}
				return Promise.resolve(res);
			})
			.catch( er => {
				console.log(er)
			})
	}
 
}