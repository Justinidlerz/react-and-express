import React , { Component } from 'react';
import { RouteHandler } from 'react-router';
import Select from 'react-normalized-select';
import Droppie from 'react-droppie';
import request from 'superagent';
import Title from '../common/title';
import Input from '../../../../bootstrap/Input';
import Button from '../../../../bootstrap/Button';

class ArticlesEdit extends Component{
    constructor(props , context) {
        super(props, context);
        this.state = {
            title : "",
            descriptions : "",
            cover : "",
            catalogs : [],
            activeCatalogs : [],
            changeCover : false
        }
        this.getCatalogs();
        this.props.params.id && this.getData(this.props.params.id);
    }
    getCatalogs (){
        this.props.actions.showLoading();
        request.get("/Admin/Category/getList").query({ rows : 100 })
            .end(function(err, res){
                if(err || res.body.status != 1){//error
                    let msg = err ? "网络错误" : res.body.msg
                    this.props.actions.alerts(msg , 'error');
                }else{
                    this.setState({
                        catalogs : res.body.data
                    })
                }
                this.props.actions.hideLoading();
            }.bind(this))
    }
    getData ( id ){
        this.props.actions.showLoading();
        request.get("/Admin/Package/getData").type("form").query({ id })
            .end(function(err, res){
                if(err || res.body.status != 1){//error
                    let msg = err ? "网络错误" : res.body.msg
                    this.props.actions.alerts(msg , 'error');
                }else{
                    const { title , descriptions , cover } = res.body.data;
                    const activeCatalogs = res.body.data.categorys.map(( j , i ) => {
                        return j.csid
                    })
                    this.setState({ title , descriptions , cover , activeCatalogs })
                }
                this.props.actions.hideLoading();
            }.bind(this))
    }
    handleChange(e){
        this.setState({
            [e.target.name] : e.target.value
        })
    }
    handleMultipleChange(e) {
        this.setState({
            activeCatalogs : e.target.value
        })
    }
    handleImgChange (cover, file){
        this.setState({ cover , changeCover : true });
        this._file = file;
    }
    handleSubmit( id ){
        this.props.actions.showLoading();
        let req = request.post("/Admin/Package/doSave")
        for(let i in this.state){
            i != "changeCover" && i != "cover" && i != "activeCatalogs" && i != "catalogs" && req.field( i , this.state[i] );
        }
        req.field( "categorys" , this.state.activeCatalogs);
        id && req.field( "id" , id );
        this.state.changeCover && req.field( "cover" , this._file );
        req.end(function(err, res){
            if(err || res.body.status != 1){//error
                let msg = err ? "网络错误" : res.body.msg
                this.props.actions.alerts(msg , 'error');
            }else{
                this.props.actions.alerts(res.body.msg , "success");
                this._reactInternalInstance._context.router.transitionTo(`ArticlesIndex`,{ page : 1 })
            }
            this.props.actions.hideLoading();
        }.bind(this))
    }
    render () {
        return (
            <div>
                <Title title="攻略" parent="Articles" type={`${this.props.params.id ? "Edit" : "Add"}`} />
                <div className="common-content">
                    <form className="form-horizontal">
                        <div className="form-group">
                            <label className="control-label col-xs-2">封面图片</label>
                            <div className="col-xs-4">
                                <Droppie onChange={this.handleImgChange.bind(this)} image={this.state.cover} showButton='点击选择' accept="image/png,image/gif,image/jpg" />
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="control-label col-xs-2">分类选择</label>
                            <div className="col-xs-4">
                                <div className="form-group">
                                    <Select className="form-control" value={ this.state.activeCatalogs } multiple={true} onChange={ this.handleMultipleChange.bind(this) } name="activeCatalogs">
                                        {this.state.catalogs.map( ( j , i ) => {
                                            return (
                                                <optgroup key={ i } label={ j.title }>
                                                    { j.childs.map(( k , p ) =>{
                                                        return (<option value={ k.csid } key={ p }>{ k.title }</option>)
                                                    })}
                                                </optgroup>
                                            )
                                        })}
                                    </Select>
                                </div>
                            </div>
                        </div>
                        <Input type="text" label="标题" value={this.state.title} onChange={ this.handleChange.bind(this) } name="title" labelClassName="col-xs-2" wrapperClassName="col-xs-4" />
                        <Input type="textarea" label="详细内容" value={this.state.descriptions} onChange={ this.handleChange.bind(this) } name="descriptions" labelClassName="col-xs-2" wrapperClassName="col-xs-6" />
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

export default ArticlesEdit;