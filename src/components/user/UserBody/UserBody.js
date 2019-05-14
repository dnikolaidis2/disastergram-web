// ** Main modules
import React from 'react';
//import { Redirect } from 'react-router-dom';

// ** Components

import GalleryShowcase from './GalleryShowcase'
import ImageCard from './ImageCard'



import './userbody.css';

export default class UserBody extends React.Component {

  constructor(props) {
    super(props);

    this.Auth = this.props.Auth;
    this.API = this.props.API;

    this.state = {
      imageCardVis: false,
      galleries: this.props.galleries || [],
      username: '',
      loggedInUser: this.props.loggedInUser,
      curURL: this.props.curURL,
      loading: true,
      redirectFlag: false,
      curUserFlag: true,
    }

    this.TopBanner = this.TopBanner.bind(this);
    this.handleThumbclick = this.handleThumbclick.bind(this);

  }
  

  async getGalleries() {

    let galleries = [];
    let username;
    
    const { curURL, loggedInUser } = this.props;
    // console.log('Current url is : ' + curURL);
      
    // get user's username of whom galleries we want to display
    if( typeof this.props.match.params !== undefined ){
      username = this.props.match.params.username;
    }
    else{
      // if no name in params get logged in users galleries
      username = this.props.loggedInUser
    }

    this.setState({username: username})


    let res;

    if( curURL === '/feed') {
      res = await this.API.getFeedGalleries();
    }
    else if (curURL === '/user') {
      if(loggedInUser === username || username === ''){

        console.log('Check!');
        // If we want to get currently logged in user's galleries
        // then get them from parent element instead;

        galleries = this.props.galleries;
        this.setState({galleries, loading: false, curUserFlag: true});
        return;
      }
      res = await this.API.getGalleries(username);
    }

    if(typeof res !== 'undefined') {
      if(res.status >= 400){
        this.setState({redirectFlag: true})
      }

      galleries = res.data['Galleries'];
      if(res.status === 204 || galleries.length === 0){
        this.setState({galleries: [], loading:false, curUserFlag: false});
        return;
      }
      this.setState({galleries, loading:false, curUserFlag: false});
    }
  }

   componentDidMount(){
    this.getGalleries();

  }

  async componentDidUpdate(prevProps) {
    let curURL = this.props.curURL;

    if(curURL === prevProps.curURL){
      if(this.props.match.url !== prevProps.match.url){
        await this.getGalleries();
      }
    }

    if(curURL !== prevProps.curURL) {
      await this.getGalleries();
    }

    return;
  }



  handleThumbclick(srcURL, imageAuthor, id){
    this.setState({imageCardVis: !this.state.imageCardVis, srcURL, imageAuthor, imageID: id});
  }

  TopBanner() {
		return (
			<picture className='top-banner noSelect'>
				<div className='top-banner_image'/>
				<h1 className='top-banner_title'>Disastergram</h1>
			</picture>    
		);
	}


  render() {
    const { imageCardVis, loading, curUserFlag, srcURL, imageAuthor, imageID } = this.state;
    // if(typeof this.props.match.params !== 'undefined'){

    // }
    let galleries;
    if (curUserFlag){
      galleries = this.props.galleries;
    }
    else {
      galleries = this.state.galleries;
    }
    

    const username = this.API.getUser();

    // const { curURL, loggedInUser } = this.props;
    return(
      <React.Fragment>
        {!loading &&
        <div id='userbody'>
          {this.TopBanner()}
          <div className='userbody__container noSelect'>
            {
              galleries.map( (gal) => {
                return <GalleryShowcase 
                  key={gal.id} 
                  onThumbClick={this.handleThumbclick} 
                  gallery={gal}
                  username={username}
                API={this.API}/>
              })
            }
          </div>
          <ImageCard 
            API={this.API} 
            onCloseClick={this.handleThumbclick} 
            isVisible={imageCardVis}
            imageURL={srcURL}
            author={imageAuthor}
            id={imageID}/>
        </div>
        }
      </React.Fragment>
    );
  }
}
