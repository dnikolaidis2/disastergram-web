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

  // makeCancelable(promise) {
  //   let hasCanceled_ = false;

  //   const wrappedPromise = new Promise ((reslove,reject) => {
  //     promise.then(
  //       val => hasCanceled_ ? reject({isCanceled: true}) : resolve(val),
  //       error => hasCanceled_ ? reject({isCanceled: true}) : reject(error)
  //     );
  //   });

  //   return {
  //     promise: wrappedPromise,
  //     cancel() {
  //       hasCanceled_ = true;
  //     },
  //   };
  // };

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
					console.log('API: added gallery: ' + galName);
				}
				
				return Promise.resolve(res);
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
					console.log('API: GET all friends: 201');
				return Promise.resolve(res);
			})
	}


	getGalleries() {
		const {headers, username, userToken} = this.state;

		const url = `/api/user/${username}/galleries`

		return axios.get(`/api/user/${username}/galleries`, 
				{params: {
					token: userToken
				}},
				{headers: {...headers}},
			)
			.then( res => {
				if (process.env.NODE_ENV ==='development' && res.status === 200)
					console.log('API: GET all galleries: 200');
				return Promise.resolve(res);
			})
	}

 
}