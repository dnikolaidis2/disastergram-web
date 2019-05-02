// ** Main modules
import React from 'react';

export default class SidebarItem extends React.Component {
	constructor(props) {
		super(props);


		this.state = {
			item: this.props.item,
			isActive: this.props.isActive,
			id: this.props.id,
			listName: this.props.listName,
		}

		this.toggleActive = this.toggleActive.bind(this);
		this.handleActivate = this.props.handleActivate;
		this.getClassName = this.getClassName.bind(this);
	}


	toggleActive() {
		this.setState({isActive: true});
		this.handleActivate(this.state.id, this.state.listName);
		this.setState({});
	}

	getClassName() {
		const isActive = this.props.isActive && 'active';
		return 'sidebar__item noSelect ' + isActive;
	}


	render(){
		const item = this.props.item;
		const className = 'sidebar__item ' + (this.props.isActive ? 'active':'');

		return (
			<div className={className} onClick={this.toggleActive}>
				{item}
			</div>
		)
	}

}