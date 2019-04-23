import React from 'react';

export default class TableRow extends React.Component {
  render() {
    return (
        <tr>
          <td>
            {this.props.c1}
          </td>
          <td>
            {this.props.c2}
          </td>
          <td>
            {this.props.c3}
          </td>
        </tr>
    );
  }
}