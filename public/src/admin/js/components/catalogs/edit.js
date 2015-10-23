import React , { Component } from 'react';
import { RouteHandler } from 'react-router';
import Droppie from 'react-droppie';
import request from 'superagent';
import Title from '../common/title';
import Input from '../../../../bootstrap/Input';
import Button from '../../../../bootstrap/Button';

class CatalogsEdit extends Component{
    constructor(props , context) {
        super(props, context);
        this.state = {
            list : [],
            title : "",
            fid : this.props.params.cid,
            cover : "",
            isactive : 1,
            changeCover : false
        };
        this.getParentList();
        this.props.params.id && this.getData(this.props.params.id);
    }
    getParentList (){
        this.props.actions.showLoading();
        request.get("/Admin/Category/getList")
            .query({ all : 1 , field : "cid,title" })
            .end(function(err, res){
                if(err || res.body.status != 1){//error
                    let msg = err ? "网络错误" : res.body.msg
                    this.props.actions.alerts(msg , 'error');
                }else{
                    this.setState({
                        list : res.body.data
                    })
                }
                this.props.actions.hideLoading();
            }.bind(this))
    }
    getData ( id ){
        this.props.actions.showLoading();
        let url = this.props.params.type == 1
            ? "/Admin/Category/getData"
            : "/Admin/CategorySmall/getData";
        request.get(url).type("form").query({ id })
            .end(function(err, res){
                if(err || res.body.status != 1){//error
                    let msg = err ? "网络错误" : res.body.msg
                    this.props.actions.alerts(msg , 'error');
                }else{
                    let { cover , title , isactive , fid } = res.body.data;
                    fid = fid ? parseInt(fid) : 0
                    this.setState({
                        cover , title , isactive , fid
                    })
                }
                this.props.actions.hideLoading();
            }.bind(this))
    }
    handleChange(e){
        this.setState({
            [e.target.name] : e.target.value
        })
    }
    handleImgChange (cover, file){
        this.setState({ cover , changeCover : true });
        this._file = file;
    }
    handleSubmit ( id ){
        this.props.actions.showLoading();
        const url = this.state.fid == 0 ? "/Admin/Category/doSave" : "/Admin/CategorySmall/doSave"
        let req = request.post(url)
        for(let i in this.state){
            i != "list" && i != "changeCover" && i != "cover" && req.field( i , this.state[i] );
        }
        id && req.field( "id" , id );
        this.state.changeCover && req.field( "cover" , this._file );
        req.end(function(err, res){
            if(err || res.body.status != 1){//error
                let msg = err ? "网络错误" : res.body.msg
                this.props.actions.alerts(msg , 'error');
            }else{
                this.props.actions.alerts(res.body.msg , "success");
                this._reactInternalInstance._context.router.transitionTo(`CatalogsIndex`,{ page : 1 })
            }
            this.props.actions.hideLoading();
        }.bind(this))
    }
    render () {
        return (
            <div>
                <Title title="分类" parent="Catalogs" type={`${this.props.params.id ? "Edit" : "Add"}`} />
                <div className="common-content">
                    <form className="form-horizontal">
                        <div className="form-group" style={{ display : this.state.fid != 0 ? "block" : "none"}} >
                            <label className="control-label col-xs-2">选择图片</label>
                            <div className="col-xs-4">
                                <Droppie onChange={this.handleImgChange.bind(this)} image={this.state.cover} showButton='点击选择图片' accept="image/png,image/gif,image/jpg" />
                            </div>
                        </div>
                        <Input type="text" label="分类名称" value={this.state.title} onChange={ this.handleChange.bind(this) } name="title" labelClassName="col-xs-2" wrapperClassName="col-xs-4" />
                        <div className="form-group">
                            <label className="control-label col-xs-2">状态</label>
                            <div className="col-xs-4">
                                <label style={{ paddingTop : 8 , marginRight : 20 }}><input type="radio" name="isactive" style={{ marginRight : 10 }} checked={this.state.isactive == 1 ? true : false} value="1" onChange={ this.handleChange.bind(this) } />启用</label>
                                <label><input type="radio" name="isactive" style={{ marginRight : 10 }} checked={this.state.isactive == 2 ? true : false} value="2" onChange={ this.handleChange.bind(this) } />停用</label>
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="control-label col-xs-2">分类类型</label>
                            <div className="col-xs-4">
                                <label style={{ paddingTop : 8 , marginRight : 20 }}><input type="radio" name="type" style={{ marginRight : 10 }} checked={this.state.type == 0 ? true : false} value="0" onChange={ this.handleChange.bind(this) } disabled={this.props.params.id ? true : false } />顶级分类</label>
                                <label><input type="radio" name="type" style={{ marginRight : 10 }} checked={this.state.type != 0 ? true : false} value="1" onChange={ this.handleChange.bind(this) } disabled={this.props.params.id ? true : false } />二级分类</label>
                            </div>
                        </div>
                        <Input type="select" label="父类名称" value={this.state.fid} onChange={ this.handleChange.bind(this) } name="fid" labelClassName="col-xs-2" wrapperClassName="col-xs-4" groupStyle={{ display : this.state.fid != 0 ? "block" : "none"}}>
                            <optgroup label="大图分类">
                                {this.state.list.map((j , i) =>{
                                    if( j.type == 2 ) return <option value={ j.cid } key={i}>{ j.title }</option>
                                })}
                            </optgroup>
                            <optgroup label="其他分类">
                                {this.state.list.map((j , i) =>{
                                    if( j.type == 1 ) return <option value={ j.cid } key={i}>{ j.title }</option>
                                })}
                            </optgroup>
                        </Input>
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

export default CatalogsEdit;