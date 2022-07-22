import React, { Component } from "react";

class Toastmsg extends Component {
    constructor(props) {
        super(props);
        this.state = { msgBoxStyle: "container w-50 my-1 text-light rounded-2 p-1 " };

    }

    editMsgStyle=()=>{
        this.setState({ msgBoxStyle: this.state.msgBoxStyle+"bg-"+this.props.bgColor});
    }
    componentDidMount() {
        this.editMsgStyle();
    }
    render() {
    return (
        <div className={this.state.msgBoxStyle}>
            <center><strong>{this.props.showMsg }</strong></center>
        </div>
    )
  }
}

export default Toastmsg;
