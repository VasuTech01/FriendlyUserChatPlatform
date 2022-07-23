import React, { Component } from "react";

import HomeUserlist from "./homeUserlist";
import  socket  from "../../API/socketHandler";

class Home extends Component {

    constructor(props) {
        super(props);
      this.state = { userList: [] };
      this.socket = socket;
    }
  componentDidMount() {
    socket.emit("get-user-list",socket.id,(res) => {
      this.setState({ userList: res });
      console.log(this.state.userList);
    });

  }
  
  render() {
    return (
      <center style={{width:"60%",left:"20%",position:"relative"}}  >
        <HomeUserlist userList={this.state.userList} />
      </center>
    );
  }
}

export default Home;
