import React, { Component } from 'react';
import ListItems from './ListItems';

export default class HomeUserlist extends Component {
    constructor(props) {
        super(props)
    }
  render() {
    return (
        <div style={{width:"90%",position:"relative"}} className="constainer w-80 d-flex flex-column shadow-lg rounded border border-2 border-dark bd-highlight p-3">
        {this.props.userList.map((user) => {
          console.log(user);
                  return <ListItems key={user.id} username={user.username} userid={user.id} />
        })}
      </div>
    )
  }
}
