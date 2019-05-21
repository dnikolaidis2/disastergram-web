import React from 'react';
import { Link } from 'react-router-dom';

export default class FollowersCard extends React.Component{
  constructor(props){
    super(props);

    this.onCloseClick = this.onCloseClick.bind(this);
    this.stopClickPropagation = this.stopClickPropagation.bind(this);
  }

  onCloseClick(){
    this.props.onCloseClick();
  }


  stopClickPropagation(event) {
    event.stopPropagation();
  }

  render(){
    const { followers, isVis} = this.props;


    const contStyle = {
      opacity: isVis ? '1' : '0',
      visibility: isVis ? 'visible' : 'hidden',
    }

    return (
      <div className='followers_card_container' style={contStyle} onClick={this.onCloseClick}>
        <div className='card followers_card fl fl_column al_center' onClick={this.stopClickPropagation}>
          <h2 className='followers_card_header noSelect'>Followers</h2>
          {followers.map( follower => {
              return (
                <p  key={follower.id}className='followers_card_p'>
                  <Link 
                    className='followers_card_link'
                    to={{
                      pathname: `/user/${follower.username}`,
                      state: {id: follower.id, itemName: follower.username, username: follower.username}
                    }} replace
                    onClick={this.onCloseClick}>
                      {follower.username}
                  </Link>
                </p>
                )
            })
          }
        </div>
      </div>
      )
  }
}