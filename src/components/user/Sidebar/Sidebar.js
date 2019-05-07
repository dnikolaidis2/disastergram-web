// ** Main modules
import React from 'react';
//import { Redirect } from 'react-router-dom';

// ** Components
import SidebarItem from './SidebarItem.jsx'
import DropdownBtn from './DropdownBtn.jsx'
import AddCard from './AddCard'

// ** CSS
import './sidebar.css'

export default class Sidebar extends React.Component {

  constructor(props) {
    super(props);

    this.API = this.props.API;
    this.Auth = this.props.Auth;
    this.updateLoggedIn = this.props.updateLoggedIn;

    this.state = {
      lists : {
        friends: [],
        galleries: []
      },
      friendsPromise: null,
      galleriesPromise: null,
      isGalVisible : false,
      isFriendsVisible: false,
      addFriendVis: false,
      addGalleryVis: false,

    }

    this.logout = this.logout.bind(this);
    
    //--- UI
    this.handleActivate = this.handleActivate.bind(this);
    this.getListModule = this.getListModule.bind(this);
    this.toggleGalleries = this.toggleGalleries.bind(this);
    this.toggleFriends = this.toggleFriends.bind(this);
    
    // --- ADDs
    this.AddFriend = this.AddFriend.bind(this);
    this.toggleAddFriend = this.toggleAddFriend.bind(this);
    this.AddGallery = this.AddGallery.bind(this);
    this.toggleAddGallery = this.toggleAddGallery.bind(this);

    // --- GETS
    this.getFriends = this.getFriends.bind(this);
    this.getGalleries = this.getGalleries.bind(this);

    // --- DELETES
    this.unfollowFriend = this.unfollowFriend.bind(this);
    this.deleteGallery = this.deleteGallery.bind(this);

  }

  // --- Data fetching ---

  componentDidMount() {
    const makeCancelable = (promise) => {
      let hasCanceled_ = false;

      const wrappedPromise = new Promise((resolve, reject) => {
        promise.then(
          val => hasCanceled_ ? reject({isCanceled: true}) : resolve(val),
          error => hasCanceled_ ? reject({isCanceled: true}) : reject(error)
        );
      });

      return {
        promise: wrappedPromise,
        cancel() {
          hasCanceled_ = true;
        },
      };
    };


    this.getFriends(makeCancelable);
    this.getGalleries(makeCancelable);
  }

  componentWillUnmount(){
    if( this.state.friendsPromise !== null && this.state.galleriesPromise !== null){
      this.state.friendsPromise.cancel();
      this.state.galleriesPromise.cancel();
    }

  }

  async getFriends() {

    // var cancelablePromise;
    // this.setState({friendsPromise: cancelablePromise});
    // cancelablePromise = makeCancelable(
    //     this.API.getFriends()
    //   );


    // cancelablePromise
    //   .promise
    //   .then( res => {
    //     if(typeof res !== 'undefined') {
    //       console.log(res.status);
    //       if (res.status === 204){
    //         console.log('No friends found');
    //       }

    //       let friends = res.data['Followed users'];
    //       this.setState({lists:{...this.state.lists, friends}})
    //     }
    //   });

    let friends;
    let res = await this.API.getFriends();
    if(typeof res !== 'undefined') {
      friends = res.data['Followed users'];
    }
    this.setState({lists:{...this.state.lists, friends}})
  }

  async getGalleries() {

    // var cancelablePromise;
    // this.setState({galleriesPromise: cancelablePromise});
    // cancelablePromise = makeCancelable(
    //   this.API.getGalleries()
    // );

    // cancelablePromise
    //   .promise
    //   .then( res => {
    //     if(typeof res !== 'undefined') {
    //       let galleries = res.data['Galleries'];
    //       this.setState({lists:{...this.state.lists, galleries}})
    //     }
    //   });

    let galleries;
    let res = await this.API.getGalleries();
    if(typeof res !== 'undefined') {
      galleries = res.data['Galleries'];
      this.setState({lists:{...this.state.lists, galleries}})
    }
  }



  // --- User logout ---

  logout() {
    console.log('Deleting token');
    this.Auth.logout();
    this.updateLoggedIn();
  }

  // --- UI ---

  toggleFriends(){
    // if(!this.state.isFriendsVisible)
    //   this.getFriends();
    this.setState({isFriendsVisible : !this.state.isFriendsVisible});
  }

  toggleGalleries(){
    // if(!this.state.isGalVisible)
    //   this.getGalleries();
    this.setState({isGalVisible : !this.state.isGalVisible});
  }


  getListModule(listName, isVisible) {
    let list = this.state.lists[listName];

    if (typeof list === 'undefined') {
      list = [];
    }

    if (list.length === 0){
      const visStyle = {
        maxHeight: isVisible ? '33px' : '0px',
        visibility: isVisible ? 'visible' : 'hidden',
        opacity: isVisible ? '1' : 0
      }
      return (
          <div className='sidebar__list' style={visStyle}>
            {listName === 'friends' ? this.AddFriend() : this.AddGallery()}s
          </div>
        );
    }

    let height = 33 + (36 * Object.keys(list).length) + 'px';
    const visStyle = {
      maxHeight: isVisible ? height : '0px',
      visibility: isVisible ? 'visible' : 'hidden',
      opacity: isVisible ? '1' : '0',
      height: height,
    }

    return (
      <div className='sidebar__list' style={visStyle}>
        {listName === 'friends' ? this.AddFriend() : this.AddGallery()}
        {list.map((item) => 
          <SidebarItem 
            key={item.id}
            item={item.username || item.galleryname}
            id={item.id}
            isActive={item.isActive} 
            listName={listName}
            handleActivate={this.handleActivate}
            deleteItem={listName === 'friends' ? this.unfollowFriend : this.deleteGallery}
            />
        )}
      </div>
    );
  }

  handleActivate(id, listName) {
    const lists = this.state.lists

    // Iterate through all lists
    // For all other lists, set all inactive
    for (var list in lists) {
      if (list !== listName)
        this.activate(-1, list)
    }
    this.activate(id, listName);
    
  }

  activate(id, listName) {
    const list = this.state.lists[listName];
    list.forEach( item => {
          item.isActive = (item.id === id ? true : false);
        });
    this.setState({[listName]: list});
  }

  // --- Add friend

  AddFriend() {
    const className = 'sidebar__item_container'
    //<i className='fa fa-plus'></i>
    return(
      <React.Fragment>
        <p className={className} onClick={this.toggleAddFriend}>
          + Add Friend
        </p>
        <AddCard 
          API={this.API} 
          isVisible={this.state.addFriendVis} 
          onCloseClick={this.toggleAddFriend}
          updateParent={this.getFriends}
          reqType={'friend'}/>
      </React.Fragment>
    );
  }

  toggleAddFriend() {
    this.setState({addFriendVis: !this.state.addFriendVis})
  }

  // --- Add Galleries

  AddGallery() {
    const className = 'sidebar__item_container'
    return(
      <React.Fragment>
        <p className={className} onClick={this.toggleAddGallery}>
          + Add Gallery
        </p>
        <AddCard 
          API={this.API}
          isVisible={this.state.addGalleryVis} 
          onCloseClick={this.toggleAddGallery}
          updateParent={this.getGalleries}
          reqType={'gallery'}/>
      </React.Fragment>
    );
  }

  toggleAddGallery() {
    this.setState({addGalleryVis: !this.state.addGalleryVis})
  }

  // --- Unfollow Friend

  //@TODO implement
  unfollowFriend(username) {
    this.API.unfollowFriend(username)
      .then ( res => {
        if(typeof res !== 'undefined'){
          this.getFriends();
        }
      });
  }

  // --- Delete Gallery

  deleteGallery(id) {
    this.API.deleteGallery(id)
      .then ( res => {
        if(typeof res !== 'undefined'){
          this.getGalleries();
        }
      });
  }




  render() {
    const {isGalVisible, isFriendsVisible} = this.state;

    return (
      <nav className='sidebar-bg'>
        <div className='sidebar__top'>
          {userPageTitle(this.Auth.getUser())}
          <div className='sidebar__container'>
            <DropdownBtn text='Friends' isActive={isFriendsVisible} handleClick={this.toggleFriends}/>
            {this.getListModule('friends', isFriendsVisible)}
            <DropdownBtn text='My Galleries' isActive={isGalVisible} handleClick={this.toggleGalleries}/>
            {this.getListModule('galleries', isGalVisible)}
          </div>
        </div>
        <div className='sidebar__bottom'>
          <LogoutBtn func={this.logout} />
        </div>
      </nav>
    );
  }

}

function LogoutBtn(props) {
  return (
      <button 
        className='logoutBtn'
        type='button'
        onClick={props.func}>
          Logout
      </button>
    )
}

function userPageTitle(user){

	const hrStyle = {width: '85%', 'borderColor': '#555555', 'borderStyle':'solid'};

  return (

    <div className='sidebar__title noSelect'>
      <h2 className='sidebar__disgram'>Disastergram</h2>
      <hr style={hrStyle}></hr>
      <h3 className='sidebar__username'>{user}</h3>
    </div>
    );

}