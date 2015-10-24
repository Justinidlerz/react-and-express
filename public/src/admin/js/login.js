import '../../../../node_modules/babel-core/polyfill';
import '../css/login.css';

import Input from '../../bootstrap/Input';
import Button from '../../bootstrap/Button';
import Alert from '../../bootstrap/Alert';
import classnames  from 'classnames';
import request from 'superagent';
import React , { Component } from 'react';


const phoneFilter = /^1\d{10}$/;

class LoginForm extends Component {
    constructor(props , context){
        super(props , context);
        this.state = {
            email: "",
            password: "",
            remember : false,
            disabled: true,
            emailPass: null,
            passwordPass: null,
            alertVisible: false,
            msg: "",
            returnTo : "back"
        }
        let reg = new RegExp("(^|\\?|&)jump=([^&]*)(\\s|&|$)", "i");
        if(reg.test(window.location.href)) this.state.returnTo = RegExp.$2.replace(/\+/g, " ");
        window.localStorage && window.localStorage.getItem("_gift_cat_secretkey_") && this.LoginBySecretKey(window.localStorage.getItem("_gift_cat_secretkey_"))
        window.thirdCallback =((data) => {
            window.console && console.log(data);
            window.localStorage && window.localStorage.setItem("_gift_cat_secretkey_",data.data.secretkey);
            if(data.status == 1){
                if(this.state.returnTo != "back" || data.data.type != 1 ){
                    window.location.href = "/index"
                }else{
                    window.location.href = "/Admin/Base/Index"
                }
            }else{
                setTimeout(()=>{alert(data.msg)},0);
            }
        })
    }
    LoginBySecretKey( secretkey ){
        request.get("/Admin/User/doLoginBySecretKey").query({  secretkey })
            .end(function(err, res){
                if(err || res.body.status != 1){//error
                    let msg = err ? "网络错误" : res.body.msg
                    window.localStorage && window.localStorage.setItem("_gift_cat_secretkey_","");
                }else{
                    window.localStorage && window.localStorage.setItem("_gift_cat_secretkey_", res.body.data.secretkey)
                    if (this.state.returnTo != "back" || res.body.data.type != 1) {
                        window.location.href = "/index"
                    } else {
                        window.location.href = "/Admin/Base/Index";
                    }
                }
            }.bind(this))
    }
    handleChange (e){
        const types = e.target.getAttribute("name");
        const value = e.target.value;
        let state = "error";
        let disabled = true;
        if(types == "email" && phoneFilter.test(value)){
            state = "success"
            this.state.passwordPass == "success" && (disabled = false);
        }else if(types == "password" && value !== "") {
             state = "success"
            this.state.emailPass == "success" && (disabled = false);
        }
        this.setState({
            [types +'Pass']: state,
            [types]: value,
            disabled
        })
    }
    handleCheck (){
        const remember = this.state.remember ? false : true;
        this.setState({ remember })
    }
    handleAlertDismiss() {
        this.setState({alertVisible: false});
    }
    handleLogin(){
        let phone = this.state.email;
        let remember = this.state.remember ? 1 : 0;
        let password = this.state.password;
        this.setState({  disabled: true })
        request
            .post("/Api/User/doLoginByPhone").type("form").send({ phone, password , remember })
            .end(function(err, res){
                if(err || res.body.status != 1){//error
                    let msg = err ? "网络错误" : res.body.msg
                    this.setState({
                        alertVisible : true,
                        disabled: false,
                        msg
                    })
                }else{
                    window.localStorage && window.localStorage.setItem("_gift_cat_secretkey_",res.body.data.secretkey)
                    if(this.state.returnTo != "back" || res.body.data.type != 1 ){
                        window.location.href = "/index"
                    }else{
                        window.location.href = "/Admin/Base/Index"
                    }
                }
            }.bind(this))
    }
    handleKeyPress(e){
        if(e.charCode == 13){
            this.handleLogin()
        }
    }
    render(){
        let msgModal = '';
        if (this.state.alertVisible) {
            msgModal = <Alert  bsStyle='danger' onDismiss={this.handleAlertDismiss.bind(this)} >
                <p>{this.state.msg}</p>
            </Alert>
        }
        return (
            <div className="login-box">
                {msgModal}
                <div className="well">
                    <h2>后台登录</h2>
                    <Input type='text' placeholder='手机号码' name="email" onChange={this.handleChange.bind(this)} bsStyle={this.state.emailPass} hasFeedback />
                    <Input type='password' placeholder='密码' name="password" onChange={this.handleChange.bind(this)} bsStyle={this.state.passwordPass} onKeyPress={this.handleKeyPress.bind(this)} hasFeedback />
                    <Input type='checkbox' label='7天内自动登录' value="1" checked={this.state.remember} onChange={this.handleCheck.bind(this)} />
                    <Button bsStyle="primary" bsSize='large' block onClick={this.handleLogin.bind(this)} disabled={this.state.disabled} >登录</Button>
                </div>
            </div>
        );
    }
}

React.render(
    <LoginForm />,
    document.getElementById('root')
);
