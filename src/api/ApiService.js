import axios from 'axios';

export default class API {

	constructor(domain, Auth) {
		axios.defaults.baseURL = domain;

		this.Auth = Auth;

		this.state = {
			username: this.Auth.getUser(),
			user_id: this.Auth.getID(),
			userToken:  this.Auth.getToken(),
			headers: {
				Accept: 'application/json',
	    	'Content-Type': 'application/json'
			}
		}

		this.updateLocalStorage = this.updateLocalStorage.bind(this)
	}

	updateLocalStorage(name, item) {
		localStorage.setItem(name, item);
	}

	// *** FRIENDS ***

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
				if (process.env.NODE_ENV ==='development') {
					if(res.status < 400){
						console.log('API: ('+res.status+') POST Added user: ' + username);
					}
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
				if (process.env.NODE_ENV ==='development'){
					if(res.status < 400){
						console.log('API: ('+res.status+') GET all friends');
					}
				}
				// No need for this atm
				// this.updateLocalStorage('friends', res.data['Followed users']);

				return Promise.resolve(res);
			})
			.catch( er => {
				console.log(er)
			})

	}

	unfollowFriend(username) {
		const {headers, userToken} = this.state;

		return axios.delete(`/api/user/unfollow`, 
				{data: {
					token: userToken,
					username: username
				}},
				{headers: {...headers}},
			)
			.then( res => {
				if (process.env.NODE_ENV ==='development')
					if(res.status < 400){
						console.log('API: ('+res.status+') DELETE friend:' + username);
					}
				return Promise.resolve(res);
			})
			.catch( er => {
				console.log(er)
			})
	}

	// *** GALLERIES ***

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
				if (process.env.NODE_ENV ==='development'){
					if(res.status < 400){
						console.log('API: ('+res.status+') GET all galleries.');
					}
				}

				// this.updateLocalStorage('galleries', res.data['Galleries']);

				return Promise.resolve(res);
			})
			.catch( er => {
				console.log(er)
			})
	}

	getGallery(galID) {
		const {headers, userToken} = this.state;

		// const url = `/api/user/${username}/galleries`

		return axios.get(`/api/user/gallery/${galID}`, 
				{params: {
					token: userToken
				}},
				{headers: {...headers}},
			)
			.then( res => {
				if (process.env.NODE_ENV ==='development'){
					if(res.status < 400){
						console.log('API: ('+res.status+') GET gallery info with id: ' + galID);
					}
				}
				return Promise.resolve(res);
			})
			.catch( er => {
				console.log(er)
				// return Promise.resolve(res);
			})
	}



	deleteGallery(id) {
		const {headers, userToken} = this.state;

		return axios.delete(`/api/user/gallery/${id}`, 
				{data: {
					token: userToken,
				}},
				{headers: {...headers}},
			)
			.then( res => {
				if (process.env.NODE_ENV ==='development')
					if(res.status === 200){
						console.log('API: (200) DELETE gallery:' + id);
					}
				return Promise.resolve(res);
			})
			.catch( er => {
				console.log(er)
			})

	}

	// *** GAL COMMENTS ***

	addGalComment(galID, text) {
		const {headers, userToken} = this.state;


		return axios.post(`/api/user/gallery/${galID}/comments`, 
				{params: {
					token: userToken,
					body: text,
				}},
				{headers: {...headers}},
			)
			.then( res => {
				if (process.env.NODE_ENV ==='development'){
					if(res.status < 400){
						console.log('API:('+ res.status +') ADD comments. (galID: '+ galID +')');
					}
				}

				return Promise.resolve(res);
			})
			.catch( er => {
				console.log(er)
			})
	}

	getGalComments(galID) {
		const {headers, userToken} = this.state;


		return axios.get(`/api/user/gallery/${galID}/comments`, 
				{params: {
					token: userToken
				}},
				{headers: {...headers}},
			)
			.then( res => {
				if (process.env.NODE_ENV ==='development'){
					if(res.status < 400){
						console.log('API:('+ res.status +') GET comments. (galID: '+ galID +')');
					}
				}

				// this.updateLocalStorage('galleries', res.data['Galleries']);

				return Promise.resolve(res);
			})
			.catch( er => {
				console.log(er)
			})
	}

	// *** IMAGES	***

	uploadImage(image, gall_id){
		const headers = { 
			headers: {'content-type': 'multipart/form-data'}
		};

		var formData = new FormData();
		formData.append('file',image);
		formData.append('token', this.state.userToken)

		axios.post(`/api/user/gallery/${gall_id}/upload`,
				formData,
				headers
			)
      .then((response) => {
        console.log("The file is successfully uploaded");
      })
      .catch((error) => {
      	console.log('An error occured while uploading!')	
  		});
	}
 
}