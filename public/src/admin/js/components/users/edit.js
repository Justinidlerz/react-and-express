import React , { Component } from 'react';
import { RouteHandler } from 'react-router';
import Droppie from 'react-droppie';
import request from 'superagent';
import Title from '../common/title';
import Input from '../../../../bootstrap/Input';
import Button from '../../../../bootstrap/Button';

class UsersEdit extends Component{
    constructor(props , context) {
        super(props, context);
        this.state = {
            rtype : 1,
            sex : 1,
            type : 2,
            cover : "",
            nickname : "",
            email : "",
            phone : "",
            password : "",
            changeCover : false
        }
        this.props.params.id && this.getUser(this.props.params.id);
    }
    getUser( id ){
        this.props.actions.showLoading();
        request.get("/Admin/User/getData").type("form").query({ id })
            .end(function(err, res){
                if(err || res.body.status != 1){//error
                    let msg = err ? "网络错误" : res.body.msg
                    this.props.actions.alerts(msg , 'error');
                }else{
                    this.setState({
                        sex : res.body.data.sex,
                        type : res.body.data.type,
                        cover : res.body.data.cover,
                        nickname : res.body.data.nickname,
                        email :  res.body.data.email,
                        phone : res.body.data.phone
                    })
                }
                this.props.actions.hideLoading();
            }.bind(this))
    }
    handleChange(e){
        this.setState({ [e.target.name] : e.target.value });
    }
    handleImgChange (cover, file){
        this.setState({ cover , changeCover : true });
        this._file = file;
    }
    update (id){
        this.props.actions.showLoading();
        let req = request.post("/Api/User/doSave")
        for(let i in this.state){
            i != "cover" && i != "phone" && req.field( i , this.state[i] );
        }
        id && req.field( "id" , id );
        this.state.changeCover && req.field( "cover" , this._file );
        req.end(function(err, res){
            if(err || res.body.status != 1){//error
                let msg = err ? "网络错误" : res.body.msg
                this.props.actions.alerts(msg , 'error');
            }else{
                this.props.actions.alerts(res.body.msg , "success");
                this._reactInternalInstance._context.router.transitionTo(`UsersIndex`,{ page : 1 })
            }
            this.props.actions.hideLoading();
        }.bind(this))
    }
    render () {
        return (
            <div>
                <Title title="用户" parent="Users" type={`${this.props.params.id ? "Edit" : "Add"}`} />
                <div className="common-content">
                    <form className="form-horizontal">
                        <div className="form-group">
                            <label className="control-label col-xs-2"></label>
                            <div className="col-xs-4">
                                <Droppie onChange={this.handleImgChange.bind(this)} image={this.state.cover} showButton='点击选择头像' accept="image/png,image/gif,image/jpg" />
                            </div>
                        </div>
                        <Input type="text" label="昵称" value={this.state.nickname} onChange={ this.handleChange.bind(this) } name="nickname" labelClassName="col-xs-2" wrapperClassName="col-xs-4" />
                        <Input type="select" label="性别" value={this.state.sex} onChange={ this.handleChange.bind(this) } name="sex" labelClassName="col-xs-2" wrapperClassName="col-xs-4">
                            <option value="1">男</option>
                            <option value="2">女</option>
                        </Input>
                        <Input type="select" name="type" label="权限" value={this.state.type} onChange={ this.handleChange.bind(this) } labelClassName="col-xs-2" wrapperClassName="col-xs-4">
                            <option value="1">管理员</option>
                            <option value="2">普通用户</option>
                        </Input>
                        <Input type="text" label="邮箱" value={this.state.email} onChange={ this.handleChange.bind(this) } name="email" labelClassName="col-xs-2" wrapperClassName="col-xs-4" />
                        <Input type="text" label="手机" value={this.state.phone} disabled name="phone" labelClassName="col-xs-2" wrapperClassName="col-xs-4" />
                        <div className="form-group">
                            <label className="control-label col-xs-2"></label>
                            <div className="col-xs-4"><Button bsStyle="primary" onClick={this.update.bind(this,this.props.params.id)}>提交</Button></div>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}

export default UsersEdit;