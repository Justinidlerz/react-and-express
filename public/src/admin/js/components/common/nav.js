import React, { Component } from 'react';
import { Link } from 'react-router';

class Nav extends Component{
    render () {
        return (
            <div id="nav">
                <ul>
                    <li><Link to="Home" activeClassName="active">主页</Link></li>
                    <li><Link to="Banners" activeClassName="active">轮播管理</Link></li>
                    <li><Link to="Articles" activeClassName="active">攻略管理</Link></li>
                    <li><Link to="Catalogs" activeClassName="active">分类管理</Link></li>
                    <li><Link to="Products" activeClassName="active">商品管理</Link></li>
                    <li><Link to="Users" activeClassName="active">用户管理</Link></li>
                    <li><Link to="AppShareConfig" activeClassName="active">App分享配置</Link></li>
                </ul>
            </div>
        )
    }
}


export default Nav;