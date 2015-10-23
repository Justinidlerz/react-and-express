import React , { Component } from 'react';
import { RouteHandler } from 'react-router';
import request from 'superagent';
import Title from '../common/title';
import Input from '../../../../bootstrap/Input';
import Button from '../../../../bootstrap/Button';

class ProductsEdit extends Component{
    constructor(props , context) {
        super(props, context);
        this.state = {
            url: "",
            title: "",
            price: "",
            descriptions : ""
        }
        this.props.params.id && this.getData(this.props.params.id);
    }
    getData ( id ){
        this.props.actions.showLoading();
        request.get("/Admin/Goods/getData").type("form").query({ id })
            .end(function(err, res){
                if(err || res.body.status != 1){//error
                    let msg = err ? "网络错误" : res.body.msg
                    this.props.actions.alerts(msg , 'error');
                }else{
                    const { url , title , price, descriptions } = res.body.data;
                    this.setState({ url, title, price, descriptions });
                }
                this.props.actions.hideLoading();
            }.bind(this))
    }
    handleSubmit( id ){
        this.props.actions.showLoading();
        let obj = Object.assign({} , this.state , { id });
        request.post("/Admin/Goods/doSave").type("form").send(obj)
            .end(function(err, res){
                if(err || res.body.status != 1){//error
                    let msg = err ? "网络错误" : res.body.msg
                    this.props.actions.alerts(msg , 'error');
                }else{
                    this.props.actions.alerts(res.body.msg , "success");
                    this._reactInternalInstance._context.router.transitionTo(`ProductsIndex`,{ page : 1 })
                }
                this.props.actions.hideLoading();
            }.bind(this))
    }
    handleChange (e){
        this.setState({
            [e.target.name] : e.target.value
        })
    }
    render () {
        return (
            <div>
                <Title title="产品" parent="Products" type={`${this.props.params.id ? "Edit" : "Add"}`} />
                <div className="common-content">
                    <form className="form-horizontal">
                        <Input type="text" label="淘宝链接" value={this.state.url} onChange={ this.handleChange.bind(this) } name="url" labelClassName="col-xs-2" wrapperClassName="col-xs-4" />
                        <Input type="text" label="名称" value={this.state.title} onChange={ this.handleChange.bind(this) } name="title" labelClassName="col-xs-2" wrapperClassName="col-xs-4" />
                        <Input type="text" label="价格" value={this.state.price} onChange={ this.handleChange.bind(this) } name="price" labelClassName="col-xs-2" wrapperClassName="col-xs-4" />
                        <Input type="textarea" label="摘要" value={this.state.descriptions} onChange={ this.handleChange.bind(this) } name="descriptions" labelClassName="col-xs-2" wrapperClassName="col-xs-6" />
                        <div className="form-group">
                            <label className="control-label col-xs-2"></label>
                            <div className="col-xs-4"><Button bsStyle="primary" onClick={this.handleSubmit.bind(this,this.props.params.id)}>提交</Button></div>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}

export default ProductsEdit;