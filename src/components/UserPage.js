// ** Main modules
import React from 'react';
import { Redirect, Route } from 'react-router-dom';

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
      galleryName : 'Gallery Name'
    }


    this.logout = this.logout.bind(this);
    this.gotoGallery = this.gotoGallery.bind(this);
  }

  logout() {
    console.log('Deleting token')
    this.Auth.logout();
    this.updateLoggedIn();
  }

  gotoGallery(galleryName) {
    this.setState({currModule: 'gallery', galleryName : galleryName})

  }

  render() {
    const API = this.API;
    const Auth = this.Auth;
    const isLoggedIn = this.props.isLoggedIn;
    const updateLoggedIn = this.updateLoggedIn;

    const {currModule, curUser, galleryName } = this.state;

    return (
      <React.Fragment>
      {!isLoggedIn
        ? <Redirect to='/' />
        : <div className='userpage'>
            <Split direction='left' percent='20%'>
              <Sidebar 
                API={API} 
                Auth={Auth} 
                updateLoggedIn={updateLoggedIn} 
                isLoggedIn={isLoggedIn}
                gotoGallery={this.gotoGallery}
                url={'/user'}/>
            </Split>
            <Split direction='right'>
              <Route
                path={['/user', '/user/myprofile']}
                render={(props) =>
                  <UserBody 
                    {...props}
                    API={API} 
                    Auth={Auth} 
                    user={curUser}/>
                  }/>
              <Route
                path={`/user/gallery/:galID`}
                render={(props) =>
                  <GalleryBody 
                    {...props}
                    API={API} 
                    galleryName={galleryName}/>
                }/>
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

