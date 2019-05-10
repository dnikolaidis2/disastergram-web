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
		const isActive = this.props.isActive;
		const text = this.props.text;
		const className = 'dropdown-btn noSelect ' + (isActive ? 'active':'');
		
	  // const expandMoreStyle = {
  	//   'WebkitTransform': isActive ? 'rotate(180deg)': 'rotate(0deg)',
			// 'MozTransform': isActive ? 'rotate(180deg)': 'rotate(0deg)',
			// 'OTransform': isActive ? 'rotate(180deg)': 'rotate(0deg)',
			// 'msTransform': isActive ? 'rotate(180deg)': 'rotate(0deg)',
			// transform: isActive ? 'rotate(180deg)': 'rotate(0deg)',
	  // }

		return (
			// ** DEPRECATED AS BUTTON **
			// Simply a text div now

			<div className={className} onClick={this.handleClick}>
				{text}
			</div>
		);
	}
	// <i className="material-icons" style={expandMoreStyle}>expand_more</i>
}