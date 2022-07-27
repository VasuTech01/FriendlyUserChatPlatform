import React, { Component } from 'react';

class VideoBox extends Component {
    render() {
        return (
            <div style={{width:"60%",height:"80vh",border:"6px solid black"}} className="m-1" >
                <div style={{width:"100%",height:"100%",border:"2px solid green"}}>
                     <video  id='remote-video' style={{height:"100%",width:"100%",border:"2px solid yellow"}}  autoPlay={true} />
                </div> 
                <div style={{width:"35%",height:"25%",border:"2px solid black",position:"relative",left:"30%",bottom:"30%",zIndex:"8"}}>   
                    <video id="local-video" style={{height:"100%",width:"100%"}} />
                </div>
            </div>
        );
    }
}

export default VideoBox;