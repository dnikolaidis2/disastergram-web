// ** Main modules
import React from 'react';
//import { Redirect } from 'react-router-dom';

// ** Components
import SidebarItem from './SidebarItem.jsx'

// ** CSS
import './sidebar.css'

export default class Sidebar extends React.Component {

	constructor(props) {
		super(props);

		this.Auth = this.props.Auth;

		this.state = {
			galleries: [
				{name: 'Gallery 1', id: '1', isActive: false},
				{name: 'Gallery 2', id: '2', isActive: false},
				{name: 'Gallery 3', id: '3', isActive: false},
				{name: 'Gallery 4', id: '4', isActive: false},
				{name: 'Gallery 5', id: '5', isActive: false},
		]}

		this.logout = this.logout.bind(this);
		this.handleActivate = this.handleActivate.bind(this);
		this.listGalleries = this.listGalleries.bind(this);
	}

	logout() {
		console.log('Deleting token')
		this.Auth.logout();
		this.updateLoggedIn();
	}

	listGalleries(gals) {
		return (
			<div className='sidebar__list'>
				{gals.map((gal) => 
					<SidebarItem 
						key={gal.id}
						item={gal.name}
						id={gal.id}
						isActive={gal.isActive} 
						handleActivate={this.handleActivate}
						/>
				)}
			</div>
		);
	}

	handleActivate(id){
		let gals = this.state.galleries;

		gals.forEach( item => {
					item.isActive = (item.id === id ? true : false);
				});

		this.setState({galleries: gals});
	}

	render() {
		const galleries = this.state.galleries;

		return (
			<div className='sidebar-bg'>
				<div className='sidebar'>
					<div className='sidebar__title'>
						<h2>{this.Auth.getUser()}</h2>
					</div>
					{this.listGalleries(galleries)}
				</div>
			</div>
		);
	}

}


// function listGalleries(gals) {

// 	return (
// 		<div className='sidebar__list'>
// 			{gals.map((gal) => 
// 				<SidebarItem 
// 					item={gal} 
// 					isActive={false} 
// 					handleActivate={this.handleActivate}
// 					/>)
// 			}
// 		</div>
// 	);



//{gals.map((gal) => listItem(gal) )}	


// function listItem(item) {
// 	return (
// 		<div className='sidebar__item' onClick={toggleItem()} key={item.id}>
// 			{item.name}
// 		</div>
// 	)
// }
