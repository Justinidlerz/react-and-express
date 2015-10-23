import React, { Component } from 'react';


class Loading extends Component{
    render (){
        return (
            <div className="mask" style={{ display : this.props.show ? "block" : "none" }}>
                <div className="loading" >
                    <div className="wBall wb1">
                        <div className="wInnerBall"></div>
                    </div>
                    <div className="wBall wb2">
                        <div className="wInnerBall"></div>
                    </div>
                    <div className="wBall wb3">
                        <div className="wInnerBall"></div>
                    </div>
                    <div className="wBall wb4">
                        <div className="wInnerBall"></div>
                    </div>
                    <div className="wBall wb5">
                        <div className="wInnerBall"></div>
                    </div>
                </div>
            </div>
        );
    }
}


export default Loading;