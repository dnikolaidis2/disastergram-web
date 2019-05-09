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
    if(this.props.listName === 'friends'){
      this.props.deleteItem(this.props.itemName);
    }else{
      this.props.deleteItem(this.props.id)
    }

  }

  render(){
    let { id, listName, username} = this.state;
    let urlTag = listName === 'friends' ? 'friend' : 'gallery';
    let curUrl = this.props.curUrl;

    const itemName = this.props.itemName;
    const className = 'sidebar__item ' + (this.props.isActive ? 'active':'');

    return (
        <Link 
          to={{
            pathname: `${curUrl}/${urlTag}/${id}`,
            state: {id: id, itemName: itemName, username: username}
          }} 

          className='sidebar__item_container'>
          <span className={className} onClick={this.toggleActive}>
            {itemName}
          </span>
          <span className='sidebar__item_delete'>
            <i className='material-icons md-18' onClick={this.deleteItem}>close</i>
          </span>
        </Link>
    )
  }

}