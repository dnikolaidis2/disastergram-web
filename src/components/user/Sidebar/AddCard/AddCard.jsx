import React from 'react';

import './addcard.css'

// ** Components
import Input from './../../../inputs/InputBox.jsx';
import InputBtn from './../../../inputs/InputBtn.jsx';

export default class AddCard extends React.Component {

	constructor(props) {
		super(props);

		this.API = this.props.API;

		this.updateParent = this.props.updateParent;

		this.onCloseClick = this.onCloseClick.bind(this);
		this.stopClickPropagation = this.stopClickPropagation.bind(this);
		this.handleSumbit = this.handleSumbit.bind(this);
		this.handleChange = this.handleChange.bind(this);

		this.state = {
			isVisible: this.props.isVisible || false,
			param: '',
			reqType: this.props.reqType,
		}
	}

	handleChange(param) {
		this.setState({param: param});
	}
	
	handleSumbit(e){
		e.preventDefault();

		const { param, reqType } = this.state;
		this.setState({param: ''})
		this.onCloseClick();

		if (reqType === 'friend') {
			this.API.addFriend(param)
				.then ( res => {
					if(typeof res !== 'undefined'){
						console.log('Friend added (jsx)');
						this.updateParent();
					}
				})
		} else {
			this.API.addGallery(param)
				.then ( res => {
					if(typeof res !== 'undefined'){
						console.log('Gallery added (jsx)');
						this.updateParent();
					}
				})
		}
	}

	onCloseClick() {
		this.props.onCloseClick();
	}

	stopClickPropagation(event) {
		event.stopPropagation();
	}

	render() {
		const isVisible = this.props.isVisible;
		const param = this.state.param;
		const reqType = this.props.reqType;

		const contVisStyle = {
      visibility: isVisible ? 'visible' : 'hidden',
      opacity: isVisible ? '1' : 0
		}

		const visStyle = {
      maxHeight: isVisible ? '25%' : '0%',
      visibility: isVisible ? 'visible' : 'hidden',
      opacity: isVisible ? '1' : 0
		}

		return (
			<React.Fragment>
				<div 
					className='add-card__container noSelect' 
					style={contVisStyle}
					onClick={this.onCloseClick}>
						<button className='closebtn' onClick={this.onCloseClick}>
							<i className='fa fa-times light-weight'></i>
						</button>

						<article className='add-card card' style={visStyle} onClick={this.stopClickPropagation}>
							<h2 className='add-card__title'> Add {reqType === 'friend' ? 'Friend' : 'Gallery'}</h2>
							<form
								className='add-card__form'
								autoComplete='off'
								onSubmit={this.handleSumbit}>
								<Input
									id={1}
									value={param}
									onValueChange={this.handleChange}
									type="text"
									label={reqType === 'friend' ? 'Username' : 'Gallery Name'}
									locked={false}
									active={false}/>
								<InputBtn />
							</form>
						</article>
				</div>
			</React.Fragment>

		);


	}

}