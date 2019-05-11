// ** Main modules
import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

// ** API imports
import API from './../api/ApiService.js';

// ** Components
import Sidebar from './user/Sidebar'
import UserBody from './user/UserBody'
import GalleryBody from './user/UserBody/GalleryBody.jsx'

// ** CSS
import './userpage.css';


export default class UserPage extends React.Component {

  constructor(props) {
    super(props);
    this.Auth = this.props.Auth;
    this.updateLoggedIn = this.props.updateLoggedIn;

    this.API = new API('http://disastergram.nikolaidis.tech', this.Auth);

    this.state = {
      currModule : 'user',
      curUser: this.Auth.getUser(),
      curUserID: this.Auth.getID(),
      galleryName : '',
      galleries: [], 
      loading: true,
    }


    this.logout = this.logout.bind(this);
    this.gotoGallery = this.gotoGallery.bind(this);
    this.refreshGalleries = this.refreshGalleries.bind(this);
  }

  componentDidMount(){
    this.updateLoggedIn();
    this.getGalleries()
  }


  async getGalleries() {

    let galleries = [];
    
    let res = await this.API.getGalleries();
    
    if(typeof res !== 'undefined') {
      galleries = res.data['Galleries'];
      if(res.status === 204){
        this.setState({galleries: [], loading:false})
        return
      }
      this.setState({galleries, loading:false})
    }

  }

  // _galleries(){
  //   return this.state.galleries;
  // }

  logout() {
    console.log('Deleting token')
    this.Auth.logout();
    this.updateLoggedIn();
  }

  refreshGalleries(){
    this.getGalleries();
  }

  gotoGallery(galleryName) {
    this.setState({currModule: 'gallery', galleryName : galleryName})

  }

  render() {
    const API = this.API;
    const Auth = this.Auth;
    const updateLoggedIn = this.updateLoggedIn;

    const isLoggedIn = this.props.isLoggedIn;

    const {curUser, galleryName, galleries, loading } = this.state;
    const currUrl = this.props.location.pathname;
    const { match } = this.props;

    return (
      <React.Fragment>
      {!isLoggedIn
        ? <Redirect to={{
            pathname: `/`, 
            state: {url: currUrl}
          }} />
        : <div className='userpage'>
            <Split direction='left' percent='20%'>
            {!loading &&
              <Sidebar 
                API={API} 
                Auth={Auth} 
                updateLoggedIn={updateLoggedIn} 
                isLoggedIn={isLoggedIn}
                gotoGallery={this.gotoGallery}
                url={match.url}
                refreshGalleries={this.refreshGalleries}
                galleries={galleries}/>
            }
            </Split>
            <Split direction='right'>
              <Switch>
                <Route
                  exact path={[`${match.url}`, `${match.url}/myprofile`]}
                  render={(props) => {
                    return (!loading &&
                      <UserBody 
                        {...props}
                        API={API} 
                        Auth={Auth} 
                        user={curUser}
                        galleries={galleries}/>)
                    }}/>
                <Route
                  path={`${match.url}/gallery/:galID`}
                  render={(props) =>
                    <GalleryBody 
                      {...props}
                      API={API} 
                      galleryName={galleryName}/>
                  }/>
              </Switch>
            </Split>
          </div>
      }
      </React.Fragment>
    );
  }

}


// Split layout
function Split(props) {
  const style = {width: props.percent || 'auto'};
  return (
    <div className={'split ' + props.direction} style={style}>
      {props.children}
    </div>
    );
}

