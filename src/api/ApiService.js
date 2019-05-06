import axios from 'axios';


export default class API {

	constructor(domain, Auth) {
		axios.defaults.baseURL = domain;

		this.Auth = Auth;

		this.state = {
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

		return axios.post(`/auth/register`,
			{headers: {...headers}},
		 	{data: {...data}})
			.then( res => {
				if (process.env.NODE_ENV ==='development' && res.status === 203) {
					console.log('Succesfully added friend!');
				}
				
				return Promise.resolve(res);
			})

	}

	getFriends() {
		const {headers, userToken} = this.state;

		return axios.get(`/user/friends`, 
				{params: {
					token: userToken
				}},
				{headers: {...headers}},
			)
			.then( res => {
				if (process.env.NODE_ENV ==='development' && res.status === 201)
					console.log('Successfully received friends list');

				return Promise.resolve(res);
			})

	}

 //  getHeaders() {
	// 	// Set up headers for all requests
	// 	const headers = {
	//     'Accept': 'application/json',
	//     'Content-Type': 'application/json'
	//   };

	//   //headers['Authorization'] = 'Bearer ' + this.getToken();

	//   return headers;

	// }

}