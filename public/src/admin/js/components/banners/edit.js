import React , { Component } from 'react';
import { RouteHandler } from 'react-router';
import Droppie from 'react-droppie';
import request from 'superagent';
import Title from '../common/title';
import Input from '../../../../bootstrap/Input';
import Button from '../../../../bootstrap/Button';

class BannersEdit extends Component{
    constructor(props , context) {
        super(props, context);
        this.state = {
            oid : "",
            pid : "",
            gid : "",
            isLoadingPackage : true,
            packageList : [],
            packageListAll : [],
            isLoadingGoods : true,
            goodsList : [],
            goodsListAll : [],
            type : 1,
            cover : "",
            title: "",
            changeCover : false
        }
        this.props.params.id && this.getData(this.props.params.id);
        this.getGoodsList();
        this.getPackageList();
    }
    getPackageList(){
        request.get("/Admin/Package/getList").type("form").query({ all : 1 , field : 'pid,title' })
            .end(function(err, res){
                if(err || res.body.status != 1){//error
                    let msg = err ? "网络错误" : res.body.msg
                    this.props.actions.alerts(msg , 'error');
                }else{
                    this.setState({
                        packageListAll : res.body.data,
                        packageList : res.body.data,
                        isLoadingPackage : false
                    })
                }
            }.bind(this))
    }
    getGoodsList(){
        request.get("/Admin/Goods/getList").type("form").query({ all : 1 ,  field : 'gid,title' })
            .end(function(err, res){
                if(err || res.body.status != 1){//error
                    let msg = err ? "网络错误" : res.body.msg
                    this.props.actions.alerts(msg , 'error');
                }else{
                    this.setState({
                        goodsListAll : res.body.data,
                        goodsList : res.body.data,
                        isLoadingGoods : false
                    })
                }
            }.bind(this))
    }
    getData (id){
        this.props.actions.showLoading();
        request.get("/Admin/Ad/getData").type("form").query({ id })
            .end(function(err, res){
                if(err || res.body.status != 1){//error
                    let msg = err ? "网络错误" : res.body.msg
                    this.props.actions.alerts(msg , 'error');
                }else{
                    const { oid , type , cover , title , gid , pid  } = res.body.data;
                    this.setState({
                        oid , type , cover , title , gid , pid
                    })
                }
                this.props.actions.hideLoading();
            }.bind(this))
    }
    handleImgChange (cover, file){
        this.setState({ cover , changeCover : true });
        this._file = file;
    }
    handleChange(e){
        this.setState({ [e.target.name] : e.target.value });
    }
    handleSubmit ( id ){
        this.props.actions.showLoading();
        let req = request.post("/Admin/Ad/doSave")
        for(let i in this.state){
            i != "changeCover" && i != "cover" && i != "packageList" && i != "goodsList"  && req.field( i , this.state[i] );
        }
        id && req.field( "id" , id );
        this.state.changeCover && req.field( "cover" , this._file );
        req.end(function(err, res){
            if(err || res.body.status != 1){//error
                let msg = err ? "网络错误" : res.body.msg
                this.props.actions.alerts(msg , 'error');
            }else{
                this.props.actions.alerts(res.body.msg , "success");
                this._reactInternalInstance._context.router.transitionTo(`BannersIndex`,{ page : 1 })
            }
            this.props.actions.hideLoading();
        }.bind(this))
    }
    handleFilterChange ( e ){
        this.setState({
            [e.target.name] : this.state[e.target.name + "All"].filter( ( j , i ) => {
                console.log(e.target.value , j.title)
                return j.title.indexOf(e.target.value) !== -1
            })
        })
    }
    render () {
        return (
            <div>
                <Title title="轮播" parent="Banners" type={`${this.props.params.id ? "Edit" : "Add"}`} />
                <div className="common-content">
                    <form className="form-horizontal">
                        <div className="form-group">
                            <label className="control-label col-xs-2"></label>
                            <div className="col-xs-4">
                                <Droppie onChange={this.handleImgChange.bind(this)} image={this.state.cover} showButton='点击选择图片' accept="image/png,image/gif,image/jpg" />
                            </div>
                        </div>
                        <Input type="text" label="抬头" value={this.state.title} onChange={ this.handleChange.bind(this) } name="title" labelClassName="col-xs-2" wrapperClassName="col-xs-4" />
                        <Input type="text" label="排序" value={this.state.oid} onChange={ this.handleChange.bind(this) } name="oid" labelClassName="col-xs-2" wrapperClassName="col-xs-4" />
                        <div className="form-group">
                            <label className="control-label col-xs-2">指向</label>
                            <div className="col-xs-4">
                                <label style={{ paddingTop : 8 , marginRight : 20 }}><input type="radio" name="type" style={{ marginRight : 10 }} checked={this.state.type == 1 ? true : false} value="1" onChange={ this.handleChange.bind(this) } />攻略</label>
                                <label><input type="radio" name="type" style={{ marginRight : 10 }} checked={this.state.type == 2 ? true : false} value="2" onChange={ this.handleChange.bind(this) } />产品</label>
                            </div>
                        </div>
                        <Input type="text" label="攻略过滤" onChange={ this.handleFilterChange.bind(this) } name="packageList" labelClassName="col-xs-2" wrapperClassName="col-xs-4" groupStyle={{ display : this.state.type == 1 ? "block" : "none"}} />
                        {this.state.isLoadingPackage
                            ? <div className="ajax-loading" style={{ display : this.state.type == 1 ? "block" : "none"}}></div>
                            : <Input type="select" label="攻略" value={this.state.pid} onChange={ this.handleChange.bind(this) } name="pid" labelClassName="col-xs-2" wrapperClassName="col-xs-4" groupStyle={{ display : this.state.type == 1 ? "block" : "none"}} >
                                {this.state.packageList.map((j , i)=>{
                                    return <option value={ j.pid } key={ i } >{ j.title }</option>
                                })}
                            </Input>
                        }
                        <Input type="text" label="产品过滤" onChange={ this.handleFilterChange.bind(this) } name="goodsList" labelClassName="col-xs-2" wrapperClassName="col-xs-4" groupStyle={{ display : this.state.type == 2 ? "block" : "none"}} />
                        {this.state.isLoadingGoods
                            ? <div className="ajax-loading" style={{ display : this.state.type == 2 ? "block" : "none"}}></div>
                            : <Input type="select" label="产品" value={this.state.gid} onChange={ this.handleChange.bind(this) } name="gid" labelClassName="col-xs-2" wrapperClassName="col-xs-4" groupStyle={{ display : this.state.type == 2 ? "block" : "none"}} >
                                {this.state.goodsList.map((j , i)=>{
                                    return <option value={ j.gid } key={ i } >{ j.title }</option>
                                })}
                            </Input>
                        }

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

export default BannersEdit;