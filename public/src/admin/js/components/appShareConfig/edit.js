import React , { Component } from 'react';
import { RouteHandler } from 'react-router';
import request from 'superagent';
import Title from '../common/title';
import Input from '../../../../bootstrap/Input';
import Button from '../../../../bootstrap/Button';

class AppShareConfigEdit extends Component{
    constructor(props , context) {
        super(props, context);
        this.state = {
            title : "",
            descriptions : "",
            url : ""
        }
        this.getData(this.props.params.type);
    }
    getData ( type ){
        this.props.actions.showLoading();
        request.get("/Api/Share/getData").type("form").query({ type })
            .end(function(err, res){
                if(err || res.body.status != 1){//error
                    let msg = err ? "网络错误" : res.body.msg
                    this.props.actions.alerts(msg , 'error');
                }else{
                    const { title , descriptions , url } = res.body.data
                    this.setState({ title , descriptions , url })
                }
                this.props.actions.hideLoading();
            }.bind(this))
    }
    handleChange(e){
        this.setState({
            [e.target.name] : e.target.value
        })
    }
    handleSubmit( type ){
        this.props.actions.showLoading();
        let obj = Object.assign({} , this.state , { type });
        request.post("/Admin/Share/doSave").type("form").send(obj)
            .end(function(err, res){
                if(err || res.body.status != 1){//error
                    let msg = err ? "网络错误" : res.body.msg
                    this.props.actions.alerts(msg , 'error');
                }else{
                    this.props.actions.alerts(res.body.msg , "success");
                    this._reactInternalInstance._context.router.transitionTo(`AppShareConfigIndex`)
                }
                this.props.actions.hideLoading();
            }.bind(this))
    }
    render () {
        return (
            <div>
                <Title title="App分享" parent="AppShareConfig" type="edit" />
                <div className="common-content">
                    <form className="form-horizontal">
                        <Input type="text" label="标题" value={this.state.title} onChange={ this.handleChange.bind(this) } name="title" labelClassName="col-xs-2" wrapperClassName="col-xs-4" />
                        <Input type="text" label="url地址" value={this.state.url} onChange={ this.handleChange.bind(this) } name="url" labelClassName="col-xs-2" wrapperClassName="col-xs-6" />
                        <Input type="textarea" label="描述" value={this.state.descriptions} onChange={ this.handleChange.bind(this) } name="descriptions" labelClassName="col-xs-2" wrapperClassName="col-xs-6" />
                        <div className="form-group">
                            <label className="control-label col-xs-2"></label>
                            <div className="col-xs-4"><Button bsStyle="primary" onClick={this.handleSubmit.bind(this,this.props.params.type)}>提交</Button></div>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}

export default AppShareConfigEdit;