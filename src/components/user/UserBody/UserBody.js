// ** Main modules
import React from 'react';
//import { Redirect } from 'react-router-dom';

export default class UserBody extends React.Component {

  constructor(props) {
    super(props);

    this.Auth = this.props.Auth;


  }



  render() {


    return(
      <section>
        <picture className='top-banner'/>
        <h1>You are logged in!</h1>
      </section>
    );
  }


}