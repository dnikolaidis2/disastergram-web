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

		this.state = {
			galleries: [
				{name: 'Trees', id: '1', isActive: false},
				{name: 'Mountains', id: '2', isActive: false},
				{name: 'Cars', id: '3', isActive: false},
				{name: 'Animals', id: '4', isActive: false},
				{name: 'Architecture', id: '5', isActive: false},
			],
			friends: [
				{name: 'Bob', id: '1', isActive: false},
				{name: 'Jacob', id: '2', isActive: false},
				{name: 'Sally', id: '3', isActive: false},
				{name: 'Agamemnon', id: '4', isActive: false},
			],
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

	getListModule(listName, list, isVisible) {
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


	handleActivate(id, listName){
		const list = this.state[listName];
		list.forEach( item => {
					item.isActive = (item.id === id ? true : false);
				});

		this.setState({[listName]: list});
	}


	render() {
		const gals = this.state.galleries;
		const isGalVisible = this.state.isGalVisible;
		const friends = this.state.friends;
		const isFriendsVisible = this.state.isFriendsVisible;

		return (
			<div className='sidebar-bg'>
				<div className='sidebar'>
					<div className='sidebar__title'>
						<h2>{this.Auth.getUser()}</h2>
					</div>
					<DropdownBtn text='Friends' isActive={isFriendsVisible} handleClick={this.toggleFriends}/>
					{this.getListModule('friends', friends, isFriendsVisible)}
					<DropdownBtn text='Galleries' isActive={isGalVisible} handleClick={this.toggleGalleries}/>
					{this.getListModule('galleries', gals, isGalVisible)}
				</div>
			</div>
		);
	}

}
