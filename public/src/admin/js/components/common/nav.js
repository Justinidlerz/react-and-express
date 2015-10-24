import React, { Component } from 'react';
import { Link } from 'react-router';

class Nav extends Component{
    render () {
        return (
            <div id="nav">
                <ul>
                    <li><Link to="home" activeClassName="active">主页</Link></li>
                    <li><Link to="users" activeClassName="active">用户管理</Link></li>
                </ul>
            </div>
        )
    }
}


export default Nav;