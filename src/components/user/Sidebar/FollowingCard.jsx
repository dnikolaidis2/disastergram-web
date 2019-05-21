import React from 'react';
import { Link } from 'react-router-dom';

export default class FollowingCard extends React.Component{
  constructor(props){
    super(props);

    this.onCloseClick = this.onCloseClick.bind(this);
    this.stopClickPropagation = this.stopClickPropagation.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
  }

  onCloseClick(){
    this.props.onCloseClick();
  }


  stopClickPropagation(event) {
    event.stopPropagation();
  }

  deleteItem(username, e) {
    e.preventDefault();

    this.props.API.unfollowFriend(username)
      .then( res => {

          if (res.status < 400){
            this.props.updateParent();
          }
      });

  }

  render(){
    const { following, isVis} = this.props;


    const contStyle = {
      opacity: isVis ? '1' : '0',
      visibility: isVis ? 'visible' : 'hidden',
    }

    return (
      <div className='following_card_container' style={contStyle} onClick={this.onCloseClick}>
        <div className='card following_card fl fl_column al_center' onClick={this.stopClickPropagation}>
          <h2 className='following_card_header noSelect'>Followed Users</h2>
          {following.map( following => {
              return (
                <div key={following.id} className='following_car_row fl fl_row js_between al_center' >
                  <p key={following.id+'_'} className='following_card_p noSelect'>
                    {following.username}
                  </p>
                  <p key={following.id+'__'} className='card_delete noSelect' onClick={this.deleteItem.bind(this, following.username)}>
                    <i className='material-icons'>delete_outline</i>
                  </p>
                </div>
                )
            })
          }
          <h4 className='add_follower' onClick={this.props.addFollower}>+ Add Follower</h4>
        </div>
      </div>
      )
  }
}