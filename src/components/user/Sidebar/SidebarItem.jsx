// ** Main modules
import React from 'react';
import { Link } from 'react-router-dom';


export default class SidebarItem extends React.Component {
  constructor(props) {
    super(props);


    this.state = {
      username: this.props.curUser,
      itemName: this.props.itemName,
      isActive: this.props.isActive,
      id: this.props.id,
      listName: this.props.listName,
    }

    this.toggleActive = this.toggleActive.bind(this);
    this.handleActivate = this.props.handleActivate;
    this.getClassName = this.getClassName.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
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

  deleteItem(e) {
    e.preventDefault();

    // Either unfollow Friend through its username
    // or delete Gallery through its id
    if(this.props.listName === 'following'){
      this.props.deleteItem(this.props.itemName);
    }else{
      this.props.deleteItem(this.props.id)
    }

  }

  render(){
    let { id, listName, username} = this.state;
    const itemName = this.props.itemName;

    const url = listName === 'followers' ? 'user' : 'user/gallery';
    const urlID = listName === 'followers' ? itemName : id;

    const className = 'sidebar__item ' + (this.props.isActive ? 'active':'');

    return (
      <React.Fragment>
      {listName === 'following'
        ? <div className='sidebar__item_container noSelect noHover fl al_center js_between'>
              <span className={className} onClick={this.toggleActive}>
                {itemName}
             </span>
            {listName !== 'followers' &&
              <i className='sidebar__item_delete material-icons md-18' onClick={this.deleteItem}>close</i>
            }
          </div>
        : <Link to={{
              pathname: `/${url}/${urlID}`,
              state: {id: id, itemName: itemName, username: username}
            }}  replace
            className='sidebar__item_container fl al_center js_between'>
              <span className={className} onClick={this.toggleActive}>
                {itemName}
              </span>
            {listName !== 'followers' &&
              <i className='sidebar__item_delete material-icons md-18' onClick={this.deleteItem}>close</i>
            }
          </Link>
      }
      </React.Fragment>
    )
  }
}