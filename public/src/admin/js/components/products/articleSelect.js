import React , { Component } from 'react';
import request from 'superagent';
import Button from '../../../../bootstrap/Button';
import Input from '../../../../bootstrap/Input';

class ArticleSelect extends Component{
    constructor(props , context){
        super(props , context);
        this.state = {
            list : [],
            listAll : [],
            isLoadingAll : true,
            isLoadingActive : true,
            actionList : []
        }
        this.getActionArticleById(this.props.id);
        this.getAllArticle();
    }
    getActionArticleById(gid) {
        this.setState({ isLoadingActive : true })
        request.get("/Admin/PackageGoods/getList").query({ gid })
            .end(function(err, res){
                if(err || res.body.status != 1){//error
                    let msg = err ? "网络错误" : res.body.msg
                    this.props.actions.alerts(msg , 'error');
                }else{
                    this.setState({
                        actionList : res.body.data,
                        isLoadingActive : false
                    })
                }
            }.bind(this))
    }
    getAllArticle (){
        request.get("/Admin/Package/getList").query({  all : 1 , field : "pid,title" })
            .end(function(err, res){
                if(err || res.body.status != 1){//error
                    let msg = err ? "网络错误" : res.body.msg
                    this.props.actions.alerts(msg , 'error');
                }else{
                    this.setState({
                        list : res.body.data,
                        listAll : res.body.data,
                        isLoadingAll : false
                    })
                }
            }.bind(this))
    }
    setArticle ( pid , out = 0 ){
        this.props.actions.showLoading();
        request.post("/Admin/PackageGoods/doRelation")
            .send({ gid : this.props.id , pid , out }).type('form')
            .end(function(err, res){
                if(err || res.body.status != 1){//error
                    let msg = err ? "网络错误" : res.body.msg
                    this.props.actions.alerts(msg , 'error');
                }else{
                    this.getActionArticleById(this.props.id);
                }
                this.props.actions.hideLoading();
            }.bind(this))
    }
    handleChange (e){
        this.setState({
            list : this.state.listAll.filter( ( j ) => {
                return j.title.indexOf(e.target.value) !== -1
            })
        })
    }
    render (){
        return (
            <div className="aritcleSelect">
                <div>
                    <div style={{ marginBottom : 10 , fontWeight : 'bold'}}>已选攻略</div>
                    {this.state.isLoadingActive
                        ? <div className="ajax-loading"></div>
                        : this.state.actionList.length == 0
                            ? "暂未选择攻略"
                            : this.state.actionList.map((k , p) => {
                                    return <Button bsStyle="primary" bsSize="xsmall" key={ p } onClick={ this.setArticle.bind(this , k.pid , 1) }>{ k.title }</Button>
                            })
                    }
                </div>
                <div style={{ borderTop : '1px solid #eee' , marginTop : 10 }}>
                    <div style={{ marginBottom : 10 , fontWeight : 'bold'}}>攻略列表</div>
                    <Input type="text" label="筛选" onChange={ this.handleChange.bind(this) } labelClassName="col-xs-2" wrapperClassName="col-xs-4" groupStyle={{ display : "block" , height : 40}} />
                    {this.state.isLoadingAll
                        ? <div className="ajax-loading"></div>
                        : this.state.list.map(( j , i ) => {
                            let isActive = false
                            for(var p = 0 ; p < this.state.actionList.length ; p++){
                                if( j.pid == this.state.actionList[p].pid){
                                    isActive = true
                                    continue;
                                }
                            }
                            if(isActive) return <Button bsStyle="primary" bsSize="xsmall" key={ i } onClick={ this.setArticle.bind(this , j.pid , 1) }>{ j.title }</Button>
                            else return <Button bsStyle="success" bsSize="xsmall" key={ i } onClick={ this.setArticle.bind(this , j.pid , 0) }>{ j.title }</Button>
                        })
                    }
                </div>
            </div>
        )
    }
}


export default ArticleSelect;