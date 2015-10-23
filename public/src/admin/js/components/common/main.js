import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { RouteHandler } from 'react-router';
import Nav from './nav';

class Main extends Component{
    render () {
        return (
            <div className="space" id="main">
                <Nav />
                <div className="space">
                    <RouteHandler actions={ this.props.actions }/>
                </div>
            </div>
        )
    }
}


export default Main;