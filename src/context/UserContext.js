import React, { Component } from "react";
import scoket from "../API/socketHandler";
const UserContext = React.createContext();

export class UserProvider extends Component { 

    constructor(props) {
        super(props);
        this.state = {userList:""};
    }

    render() {
        return (
            <UserContext.Provider userList={this.state.userList} >
                {this.props.children}
            </UserContext.Provider>
        )
    }
}





export default UserContext;

