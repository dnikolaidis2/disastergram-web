import React from 'react';

import TableRow from './TableRow'


//@TODO abstractify table

export default class Table extends React.Component {
	constructor(props) {
		super(props);

		this.state = { 
			data: props.data,
		};
	}

	static getDerivedStateFromProps (nextProps, prevState) {
		if(nextProps.data !== prevState.data){
     return { data: nextProps.data};
  	}
	}

	componentDidUpdate(prevProps, prevState) {
	  if(prevProps.data !== this.props.data){

	    this.setState({data: this.props.data});
	  }
	}


	tabRow() {
		return this.state.data.map(obj => {
			return <TableRow c1={obj.id} c2={obj.name} c3={obj.email} />;
		});
	}


	render() {
		return (
	    <div className="container">
        <table className="table table-striped">
          <thead>
            <tr>
              <td>ID</td>
              <td>Name</td>
              <td>email</td>
            </tr>
          </thead>
          <tbody>
            {this.tabRow()}
          </tbody>
        </table>
      </div>
		)
	}
}