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
      // curUser: this.props.curUser,
      // curURL: this.props.curURL,
      loading: true,
      redirectFlag: false,
    }

    this.TopBanner = this.TopBanner.bind(this);
    this.handleThumbclick = this.handleThumbclick.bind(this);

  }
  

  async getGalleries() {
    let galleries = [];
    let username;
    
    const { curURL, curUser } = this.props;
    console.log('Current url is : ' + curURL);
      
    // get user's username of whom galleries we want to display
    if( typeof this.props.match.params !== undefined ){
      let username = this.props.match.params.username;
    }

    // if no name in params get logged in users galleries
    username = this.props.curUser
    this.setState({username: username})


    let res;

    if( curURL === '/feed') {
      res = await this.API.getFeedGalleries();
    }
    else if (curURL === '/user') {
      if(curUser === username || username === ''){
        galleries = this.props.galleries;
        this.setState({galleries, loading: false})
        return;
      }
        // If we want to get currently logged in user's galleries
        // then get them from parent element instead;

      res = await this.API.getGalleries();
    }

    if(typeof res !== 'undefined') {
      if(res.status >= 400){
        this.setState({redirectFlag: true})
      }

      galleries = res.data['Galleries'];
      if(res.status === 204 || galleries.length === 0){
        this.setState({galleries: [], loading:false})
        return
      }
      this.setState({galleries, loading:false})
    }
  }

   componentDidMount(){


    this.getGalleries();

  }

  componentDidUpdate(prevProps) {

    let curURL = this.props.curURL
    if(curURL === prevProps.curURL)
      return;
    this.getGalleries();
  }



  handleThumbclick(){
    this.setState({imageCardVis: !this.state.imageCardVis})
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
    const { imageCardVis, loading } = this.state;
    // if(typeof this.props.match.params !== 'undefined'){

    // }
    const galleries = this.state.galleries;
    const username = this.API.getUser();

    const { curURL, curUser } = this.props;
    // console.log('Current url is : ' + curURL);
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
            isVisible={imageCardVis}/>
        </div>
        }
      </React.Fragment>
    );
  }
}
