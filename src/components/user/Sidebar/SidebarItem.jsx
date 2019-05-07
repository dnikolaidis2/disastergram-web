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
      this.props.deleteItem(this.props.item);
    }else{
      this.props.deleteItem(this.props.id)
    }

  }

  render(){
    const item = this.props.item;
    const className = 'sidebar__item ' + (this.props.isActive ? 'active':'');

    return (
        <div className='sidebar__item_container'>
          <span className={className} onClick={this.toggleActive}>
            {item}
          </span>
          <span className='sidebar__item_delete'>
            <i className='material-icons md-18' onClick={this.deleteItem}>close</i>
          </span>
        </div>
    )
  }

}