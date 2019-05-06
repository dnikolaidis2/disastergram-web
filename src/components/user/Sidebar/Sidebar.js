// ** Main modules
import React from 'react';
//import { Redirect } from 'react-router-dom';

// ** Components
import SidebarItem from './SidebarItem.jsx'
import DropdownBtn from './DropdownBtn.jsx'

// ** CSS
import './sidebar.css'

export default class Sidebar extends React.Component {

  constructor(props) {
    super(props);

    this.Auth = this.props.Auth;
    this.updateLoggedIn = this.props.updateLoggedIn;

    this.state = {
      lists: 
        {galleries : [
          {name: 'Trees', id: '1', isActive: false},
          {name: 'Mountains', id: '2', isActive: false},
          {name: 'Cars', id: '3', isActive: false},
          {name: 'Animals', id: '4', isActive: false},
          {name: 'Architecture', id: '5', isActive: false}
        ],
        friends : [
          {name: 'Bob', id: '1', isActive: false},
          {name: 'Jacob', id: '2', isActive: false},
          {name: 'Sally', id: '3', isActive: false},
          {name: 'Agamemnon', id: '4', isActive: false},
        ]}
      ,
      isGalVisible : false,
      isFriendsVisible: false,

    }

    this.logout = this.logout.bind(this);
    this.handleActivate = this.handleActivate.bind(this);
    this.getListModule = this.getListModule.bind(this);
    this.toggleGalleries = this.toggleGalleries.bind(this);
    this.toggleFriends = this.toggleFriends.bind(this);
  }

  logout() {
    console.log('Deleting token')
    this.Auth.logout();
    this.updateLoggedIn();
  }

  toggleGalleries(){
    this.setState({isGalVisible : !this.state.isGalVisible});
  }

  toggleFriends(){
    this.setState({isFriendsVisible : !this.state.isFriendsVisible});
  }

  getListModule(listName, isVisible) {
    const list = this.state.lists[listName];
    const height = 50 * Object.keys(list).length + 'px';

    const visStyle = {
      maxHeight: isVisible ? height : '0px',
      visibility: isVisible ? 'visible' : 'hidden',
      opacity: isVisible ? '1' : 0
    }

    return (
      <div className='sidebar__list' style={visStyle}>
        {list.map((item) => 
          <SidebarItem 
            key={item.id}
            item={item.name}
            id={item.id}
            isActive={item.isActive} 
            listName={listName}
            handleActivate={this.handleActivate}
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


  render() {
    const isGalVisible = this.state.isGalVisible;
    const isFriendsVisible = this.state.isFriendsVisible;

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