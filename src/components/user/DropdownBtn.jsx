// ** Main modules
import React from 'react';

export default class DropdownBtn extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			text: this.props.text,
			isActive: this.props.isActive || false,
		}

		this.handleClick = this.props.handleClick;
	}

	render(){
		const text = this.props.text;
		const className = 'dropdown-btn ' + (this.props.isActive ? 'active':'');
	
		return (
			

			<button className={className} onClick={this.handleClick}>
				{text} <i className='fa fa-caret-down'></i>
			</button>
		);
	}

}