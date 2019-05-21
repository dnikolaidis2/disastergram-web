// ** Main modules
import React from 'react';
import { Link } from 'react-router-dom';

// ** Components
import SidebarItem from './SidebarItem.jsx'
import DropdownBtn from './DropdownBtn.jsx'
import AddCard from './AddCard'
import FollowersCard from './FollowersCard.jsx'
import FollowingCard from './FollowingCard.jsx'

// ** CSS
import './sidebar.css'

export default class Sidebar extends React.Component {

  constructor(props) {
    super(props);

    this.API = this.props.API;
    this.Auth = this.props.Auth;
    this.updateLoggedIn = this.props.updateLoggedIn;
    this.gotoGallery = this.props.gotoGallery;
    this.refreshGalleries = this.props.refreshGalleries;

    this.state = {
      lists : {
        followers: [],
        following: [],
        galleries: this.props.galleries || [],
      },
      friendsPromise: null,
      galleriesPromise: null,
      isGalVisible : true,
      isFriendsVisible: true,
      addFriendVis: false,
      addGalleryVis: false,

      followersCardVis: false,
      followingCardVis: false,

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
    this.onMouseEnterAddGal = this.onMouseEnterAddGal.bind(this);
    this.onMouseLeaveAddGal = this.onMouseLeaveAddGal.bind(this);

    // --- GETS
    this.getFollowers = this.getFollowers.bind(this);
    this.getFollowing = this.getFollowing.bind(this);
    this.getGalleries = this.getGalleries.bind(this);

    // --- DELETES
    this.unfollow = this.unfollow.bind(this);
    this.deleteGallery = this.deleteGallery.bind(this);

    // --- CARDS
    this.toggleFollowersCard = this.toggleFollowersCard.bind(this);
    this.toggleFollowingCard = this.toggleFollowingCard.bind(this);



  }

  // --- Data fetching ---

  componentDidMount() {

    // const makeCancelable = (promise) => {
    //   let hasCanceled_ = false;

    //   const wrappedPromise = new Promise((resolve, reject) => {
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

    this.getFollowing();
    this.getFollowers();

    // setInterval(this.getFollowing, 2000);
    var interval = setInterval(this.getFollowers, 5000);
    this.setState({interval})

  }

  componentWillUnmount(){
    // @TODO remove
    if( this.state.friendsPromise !== null && this.state.galleriesPromise !== null){
      this.state.friendsPromise.cancel();
      this.state.galleriesPromise.cancel();
    }
    clearInterval(this.state.interval);
  }

  componentDidUpdate(prevProps){

    let gal = this.props.galleries
    if(gal === prevProps.galleries)
      return;

    this.setState((state, props) => ({
      lists:{
        ...this.state.lists, galleries:gal
      }
    }));
  }

  async getFollowers() {

    let followers = [];
    let res = await this.API.getFollowers();

    if (typeof res !== 'undefined') {
      if(res.status < 400) {
        followers = res.data['Followed users'];
        this.setState({lists:{...this.state.lists, followers}})
        return;
      }
    }
    this.setState({lists:{...this.state.lists, followers: []}})

  }

   async getFollowing() {

    let following = [];
    let res = await this.API.getFollowing();

    if (typeof res !== 'undefined') {
      if(res.status < 400) {
        following = res.data['Followed users'];
        this.setState({lists:{...this.state.lists, following}})
        return;
      }
    }
    this.setState({lists:{...this.state.lists, following: []}})

  }

  getGalleries() {
    // get galleries from parent props
    this.refreshGalleries();
  }



  // --- User logout ---

  logout() {
    console.log('Deleting token');
    this.Auth.logout();
    this.updateLoggedIn();
  }

  // --- UI ---

  // *** DEPRECATED ***
  toggleFriends(){
    // this.setState({isFriendsVisible : !this.state.isFriendsVisible});
  }

  toggleGalleries(){
    // this.setState({isGalVisible : !this.state.isGalVisible});
  }


  getListModule(listName, isVisible, deleteItem) {
    let list = this.state.lists[listName];

    if (typeof list === 'undefined') {
      list = [];
    }

    if (list.length === 0){
      const visStyle = {
        maxHeight: isVisible ? '38px' : '0px',
        visibility: isVisible ? 'visible' : 'hidden',
        opacity: isVisible ? '1' : 0
      }
      return (
          <div className='sidebar__list' style={visStyle}>

          </div>
        );
            // {listName === 'following' && this.AddFriend()}
            // {listName === 'galleries' && this.AddGallery()}
    }

    let height;
    if(listName === 'followers'){
      height = (36 * Object.keys(list).length) + 'px';
    }else{
      height = 38 + (36 * Object.keys(list).length) + 'px';
    }

    const visStyle = {
      maxHeight: isVisible ? height : '0px',
      visibility: isVisible ? 'visible' : 'hidden',
      opacity: isVisible ? '1' : '0',
      height: height,
    }

        // {listName === 'following' && this.AddFriend()}
        // {listName === 'galleries' && this.AddGallery()}
    return (
      <div className='sidebar__list' style={visStyle}>
        {list.map((item) => 
          <SidebarItem 
            key={'_' + item.id}
            curUser={this.Auth.getUser()}
            curUrl={this.props.url}
            itemName={item.username || item.galleryname}
            id={item.id}
            isActive={item.isActive} 
            listName={listName}
            handleActivate={this.handleActivate}
            deleteItem={deleteItem}
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
    // this.gotoGallery(id)
    
  }

  activate(id, listName) {

    const list = this.state.lists[listName];
    if(typeof list !== 'undefined'){
      list.forEach( item => {
            item.isActive = (item.id === id ? true : false);
          });
      this.setState({[listName]: list});
    }
    else{
      this.setState({[listName]: []});
    }
  }

  // --- Add friend
  // <i className="material-icons">person_add</i> 
  AddFriend() {
    const className = 'sidebar__item_container fl fl_row al_center noSelect'
    const addStyle = {color: '#888'}
    //<i className='fa fa-plus'></i>
    return(
      <React.Fragment>
        <p className={className} style={addStyle} onClick={this.toggleAddFriend}>
          <i className="material-icons" style={{'paddingRight':'5px'}}>control_point</i> Add Friend
        </p>

      </React.Fragment>
    );
  }

  toggleAddFriend() {
    this.setState({addFriendVis: !this.state.addFriendVis})
  }

  // --- Add Galleries
  // <i className="material-icons">add_to_photos</i> 
  AddGallery() {
    const className = 'sidebar_add fl fl_row al_center noSelect'
    const isHovered = this.state.isHoveredAddGal;
    const addStyle = {
      opacity: isHovered ? '1' : '0',
      left: isHovered ? '100%' : '-50px',
    }

    return(
      <div className='popout noSelect' style={addStyle}  >
        <p className={className} onClick={this.toggleAddGallery}>
          <i className="material-icons" style={{'paddingRight':'5px'}}>control_point</i>Add Gallery
        </p>
      </div>
    );
  }

  toggleAddGallery() {
    this.setState({addGalleryVis: !this.state.addGalleryVis})
  }

  onMouseEnterAddGal() {
    this.setState({isHoveredAddGal:true})
    clearTimeout(this.state.leaveTimeoutAddGal)
  }

  onMouseLeaveAddGal() {
    var leaveTimeoutAddGal = setTimeout( ()=>{
          this.setState({isHoveredAddGal:false})
        }, 400);
    this.setState({leaveTimeoutAddGal})
  }

  // --- Unfollow Friend

  //@TODO implement
  unfollow(username) {
    this.API.unfollowFriend(username)
      .then ( res => {
        if(typeof res !== 'undefined'){
          this.getFollowing();
        }
      });
  }

  // --- Delete Gallery

  deleteGallery(id) {
    this.API.deleteGallery(id)
      .then ( res => {
        if(typeof res !== 'undefined'){
          this.refreshGalleries();
        }
      });
  }


  // --- Followers/Following cards

  toggleFollowersCard(){
    this.setState({followersCardVis : !this.state.followersCardVis})
  }

  toggleFollowingCard(){
    this.setState({followingCardVis : !this.state.followingCardVis})
  }


  render() {
    const {isGalVisible, isFriendsVisible} = this.state;
    const user = this.Auth.getUser()

    const followersCount = this.state.lists.followers.length;
    const followingCount = this.state.lists.following.length;

    return (
      <nav className='sidebar-bg'>
        <div className='sidebar__top'>
          {userPageTitle(user)}
          <div className='sidebar__followers fl fl_row al_center js_center'>
            <p className='followers noSelect' onClick={this.toggleFollowersCard}>Followers: {followersCount}</p>
            <p className='divider noSelect'>|</p>
            <p className='following noSelect' onClick={this.toggleFollowingCard}>Following: {followingCount}</p>
          </div>
          <div className='sidebar__container'>

            <Link to={'/feed'}className='dropdown-btn noSelect'>Home</Link>

            <div className='sidebar__item_cont'
              onMouseEnter={this.onMouseEnterAddGal}
              onMouseLeave={this.onMouseLeaveAddGal}>
              <Link 
                to={`/user/${user}`} replace 
                className='dropdown-btn noSelect'>
                  My Galleries
              </Link>
                {this.AddGallery()}
            </div>
            {this.getListModule('galleries', isGalVisible, this.deleteGallery)}


          </div>
        </div>
        <div className='sidebar__bottom'>
          <LogoutBtn func={this.logout} />
        </div>
        <AddCard
          API={this.API}
          isVisible={this.state.addGalleryVis} 
          onCloseClick={this.toggleAddGallery}
          updateParent={this.getGalleries}
          reqType={'gallery'}/>

        <AddCard 
          API={this.API} 
          isVisible={this.state.addFriendVis} 
          onCloseClick={this.toggleAddFriend}
          updateParent={this.getFollowing}
          reqType={'friend'}/>

        
        <FollowersCard
          followers={this.state.lists.followers} // Followers list
          API={this.API} // API object ref
          isVis={this.state.followersCardVis }// card Visibility
          onCloseClick={this.toggleFollowersCard}    // toggle card vis
          />

        <FollowingCard
          following={this.state.lists.following} // Following list
          API={this.API} // API object ref
          isVis={this.state.followingCardVis }// card Visibility
          onCloseClick={this.toggleFollowingCard}    // toggle card vis
          addFollower={this.toggleAddFriend}
          updateParent={this.getFollowing}
          />
    </nav>
    );
  }

          /*  <Link to={`/feed`} replace className='dropdown-btn noSelect'>Followers</Link>
            {this.getListModule('followers', isFriendsVisible, null)}

            <DropdownBtn text='Following' isActive={isFriendsVisible} handleClick={this.toggleFriends}/>
            {this.getListModule('following', isFriendsVisible, this.unfollow)}*/
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

	// const hrStyle = {width: '85%', 'borderColor': '#888', 'borderStyle':'solid', 'borderWidth': '0.5px'};
  return (
    <div className='sidebar__title noSelect'>
      <header className='sidebar__header fl js_center al_center fl_column'>
        <Link to={`/feed`} replace className='sidebar__disgram'>Disastergram</Link>
        <Link to={`/user/${user}`} replace className='sidebar__username'>{user}</Link>
      </header>
    </div>
  );
}
