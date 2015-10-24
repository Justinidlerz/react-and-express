import React, { Component } from 'react';
import request from 'superagent';

class Header extends Component{
    handleLogout (){
        this.props.actions.showLoading();
        request.get("/Api/User/doLogout").end(function(err, res){
            if(err || res.body.status != 1){//error
                let msg = err ? "网络错误" : res.body.msg
                this.props.actions.alerts(msg , 'error');
            }else{
                window.localStorage && window.localStorage.setItem("_gift_cat_secretkey_","");
                window.location.reload(true);
            }
            this.props.actions.hideLoading();
        }.bind(this))
    }
    //
    render () {
        return (
            <div id="header">
                <a className="btn-header logo" href="/"><h3>后台管理</h3></a>
                <a className="btn-header logout" onClick={this.handleLogout.bind(this)}><h4>退出</h4></a>
            </div>
        )
    }
}


export default Header;