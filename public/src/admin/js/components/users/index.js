import React , { Component } from 'react';
import { RouteHandler } from 'react-router';
import Table from '../../../../bootstrap/Table';
import Label from '../../../../bootstrap/Label';
import Button from '../../../../bootstrap/Button';
import Input from '../../../../bootstrap/Input';
import ButtonLink from '../../../../bootstrap/router/ButtonLink';
import Title from '../common/title';
import Pages from '../common/pages';
import request from 'superagent';

class Users extends Component{
    constructor(props , context){
        super(props , context);
        this.state = {
            userData : [],
            total : 0,
            newPwd : "",
            newPwd1 : ""
        }
        this.getUsers(this.props.params.page);
    }
    deleteUser(uid){
        this.props.actions.openModal("提示","确定删除吗？",function(close){
            this.props.actions.showLoading();
            close();
            request.post("/Admin/User/doDelete").type("form").send({ uid })
                .end(function(err, res){
                    if(err || res.body.status != 1){//error
                        let msg = err ? "网络错误" : res.body.msg
                        this.props.actions.alerts(msg , 'error');
                    }else{
                        this.props.actions.alerts(res.body.msg , 'success');
                        this.getUsers(this.props.params.page);
                    }
                    this.props.actions.hideLoading();
                }.bind(this))
        }.bind(this))
    }
    handlePasswordInput (e){
        this.setState({
            [e.target.name] : e.target.value
        })
    }
    changePassword(uid){
        this.setState({
            newPwd : "",
            newPwd1 : ""
        })
        const passwordInput = (
            <div className="form-horizontal">
                <Input type="password" label="新密码" onChange={this.handlePasswordInput.bind(this)} name="newPwd" labelClassName="col-xs-2" wrapperClassName="col-xs-4" />
                <Input type="password" label="确认密码" onChange={this.handlePasswordInput.bind(this)} name="newPwd1" labelClassName="col-xs-2" wrapperClassName="col-xs-4" />
            </div>
        );
        this.props.actions.openModal("修改密码",passwordInput,function(close){
            if(this.state.newPwd == this.state.newPwd1 && this.state.newPwd != ""){//两次输入密码匹配
                this.props.actions.showLoading();
                request.post("/Admin/User/doSave").type("form").send({
                    uid,
                    password : this.state.newPwd,
                    repassword : this.state.newPwd1
                }).end(function(err, res){
                    if(err || res.body.status != 1){//error
                        let msg = err ? "网络错误" : res.body.msg
                        this.props.actions.alerts(msg , 'error');
                    }else{
                        this.props.actions.alerts(res.body.msg , 'success');
                        close()
                    }
                    this.props.actions.hideLoading();
                }.bind(this))
            }else{
                this.props.actions.alerts("密码不匹配或为空，请重新输入！" , 'error');
            }
        }.bind(this))
    }
    setUserToAdmin (uid,type){
        this.props.actions.showLoading();
        request.post("/Admin/User/doAdminer").type("form").send({ uid , type })
            .end(function(err, res){
            if(err || res.body.status != 1){//error
                let msg = err ? "网络错误" : res.body.msg
                this.props.actions.alerts(msg , 'error');
            }else{
                this.props.actions.alerts(res.body.msg);
                this.getUsers(this.props.params.page);
            }
            this.props.actions.hideLoading();
        }.bind(this))
    }
    getUsers (page = 1) {
        this.props.actions.showLoading();
        request.get("/Admin/User/getList").query({
            page,
            rows : 8
        }).end(function(err, res){
            if(err || res.body.status != 1){//error
                let msg = err ? "网络错误" : res.body.msg
                this.props.actions.alerts(msg , 'error');
            }else{
                this.setState({
                    userData : res.body.data,
                    total : res.body.total
                })
            }
            this.props.actions.hideLoading();
        }.bind(this))
    }
    render () {
        const page =this.state.total != 0
            ? <Pages getData={this.getUsers.bind(this)} total={this.state.total} activePage={this.props.params.page} parent="Users" />
            : "";
        return (
            <div>
                <Title title="用户" parent="Users" />
                <div className="common-content">
                    <Table>
                        <thead>
                        <tr>
                            <th style={{ width : "10%"}}>ID</th>
                            <th style={{ width : "15%"}}>昵称</th>
                            <th style={{ width : "20%"}}>邮箱</th>
                            <th style={{ width : "20%"}}>手机</th>
                            <th style={{ width : "35%"}}>操作</th>
                        </tr>
                        </thead>
                        <tbody>
                            {this.state.userData.map((row)=>{
                                const adminLabel = row.type == 1 ? <Label bsStyle="primary">管理员</Label> : "";
                                const adminBtn = row.type == 1
                                    ? <Button bsSize="xsmall" bsStyle="danger" onClick={this.setUserToAdmin.bind(this,row.uid,2)}>取消管理员</Button>
                                    : <Button bsSize="xsmall" bsStyle="success" onClick={this.setUserToAdmin.bind(this,row.uid,1)}>设为管理员</Button>;
                                return (
                                    <tr key={row.uid}>
                                        <td>{row.uid}</td>
                                        <td>{ row.nickname } { adminLabel }</td>
                                        <td>{row.email}</td>
                                        <td>{row.phone}</td>
                                        <td className="contr-box">
                                            <ButtonLink bsStyle="success" bsSize="xsmall" to="UsersEdit" params={{ id : row.uid }}>编辑</ButtonLink>
                                            <Button bsSize="xsmall" bsStyle="warning" onClick={this.deleteUser.bind(this,row.uid)}>删除</Button>
                                            <Button bsSize="xsmall" bsStyle="info" onClick={this.changePassword.bind(this,row.uid)}>修改密码</Button>
                                            { adminBtn }
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </Table>
                </div>
                {page}
            </div>
        )
    }
}

export default Users;