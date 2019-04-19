import React from "react";
import { TransitionMotion, spring } from "react-motion";
import './inputbtn.css'

export default class InputBtn extends React.Component {
  constructor(props) {
    super(props);
	}

	render(){
    return (
    	<div id="inputBtnDiv">
    		<input id="inputBtn" type="submit" value="Submit" />
  		</div>
		);
	}
}	
