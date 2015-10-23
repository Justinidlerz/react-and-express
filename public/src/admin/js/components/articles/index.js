import React , { Component } from 'react';
import { RouteHandler } from 'react-router';
import Table from '../../../../bootstrap/Table';
import Input from '../../../../bootstrap/Input';
import Label from '../../../../bootstrap/Label';
import Button from '../../../../bootstrap/Button';
import ButtonLink from '../../../../bootstrap/router/ButtonLink';
import Title from '../common/title';
import Pages from '../common/pages';
import ProductSelect from './productSelect';
import request from 'superagent';


class Articles extends Component{
    constructor(props , context){
        super(props , context);
        this.state = {
            list : [],
            total : 0
        }
        this.getArticles(this.props.params.page);
    }
    getArticles (page = 1) {
        this.props.actions.showLoading();
        request.get("/Admin/Package/getList").query({
            page,
            rows : 8
        }).end(function(err, res){
            if(err || res.body.status != 1){//error
                let msg = err ? "网络错误" : res.body.msg
                this.props.actions.alerts(msg , 'error');
            }else{
                this.setState({
                    list : res.body.data,
                    total : res.body.total
                })
            }
            this.props.actions.hideLoading();
        }.bind(this))
    }
    deleteArticles(id){
        this.props.actions.openModal("提示","确定删除吗？",function(){
            this.props.actions.showLoading();
            request.post("/Admin/Package/doDelete").type("form").send({ id })
                .end(function(err, res){
                    if(err || res.body.status != 1){//error
                        let msg = err ? "网络错误" : res.body.msg
                        this.props.actions.alerts(msg , 'error');
                    }else{
                        this.props.actions.alerts(res.body.msg);
                        this.getArticles(this.props.params.page);
                    }
                    this.props.actions.hideLoading();
                }.bind(this))
        }.bind(this))
    }
    updateOid(id,e){
        const oid = e.target.parentNode.previousElementSibling.value;
        this.props.actions.showLoading();
        request.post("/Admin/Package/doSave").type("form").send({ oid , id })
            .end(function(err, res){
                if(err || res.body.status != 1){//error
                    let msg = err ? "网络错误" : res.body.msg
                    this.props.actions.alerts(msg , 'error');
                }else{
                    this.props.actions.alerts(res.body.msg,"success");
                }
                this.props.actions.hideLoading();
            }.bind(this))
    }
    doArticles(id,isactive){
        this.props.actions.showLoading();
        isactive = isactive == 1 ? 2 : 1;
        request.post("/Admin/Package/doActive").type("form").send({ id , isactive })
            .end(function(err, res){
                if(err || res.body.status != 1){//error
                    let msg = err ? "网络错误" : res.body.msg
                    this.props.actions.alerts(msg , 'error');
                }else{
                    this.props.actions.alerts(res.body.msg,"success");
                    this.getArticles(this.props.params.page);
                }
                this.props.actions.hideLoading();
            }.bind(this))
    }
    changeProduct (id ,e){
        this.props.actions.openModal("商品选择",<ProductSelect actions={this.props.actions} id={id} />)
    }
    render () {
        const page =this.state.total != 0
            ? <Pages getData={this.getArticles.bind(this)} total={this.state.total} activePage={this.props.params.page} parent="Articles" />
            : "";
        return (
            <div>
                <Title title="攻略" parent="Articles" />
                <div className="common-content">
                    <div className="form-group">
                        <div className="col-xs-2"><Input type="text" placeholder="关键字" /></div>
                        <Button bsStyle="primary" >筛选</Button>
                    </div>
                    <Table>
                        <thead>
                        <tr>
                            <th style={{ width : "5%"}}>ID</th>
                            <th style={{ width : "10%"}}>排序</th>
                            <th style={{ width : "20%"}}>标题</th>
                            <th style={{ width : "25%"}}>分类</th>
                            <th style={{ width : "10%"}}>创建者</th>
                            <th style={{ width : "30%"}}>操作</th>
                        </tr>
                        </thead>
                        <tbody>
                        {this.state.list.map((row)=>{
                            return (
                                <tr key={row.pid}>
                                    <td>{row.pid}</td>
                                    <td><Input type="text" defaultValue={row.oid} groupStyle={{ width : 90 }} buttonAfter={<Button onClick={this.updateOid.bind(this,row.pid)}>更新</Button>} bsSize="small" /></td>
                                    <td>{row.title}</td>
                                    <td>{row.categorys.map(( j , i ) => {
                                        return <Label key={ i } style={{ marginRight : 3 }} bsStyle="info">{ j.title }</Label>
                                    })}</td>
                                    <td>{row.adminer}</td>
                                    <td className="contr-box">
                                        <Button bsSize="xsmall" bsStyle="warning" href={`/package/${row.pid}`}>预览</Button>
                                        <Button bsSize="xsmall" bsStyle="success" onClick={ this.changeProduct.bind(this,row.pid) }>商品</Button>
                                        <Button bsSize="xsmall" bsStyle={row.isactive == 1 ? "warning" : "success"} onClick={this.doArticles.bind(this,row.pid,row.isactive)}>{row.isactive == 1 ? "隐藏" : "显示"}</Button>
                                        <ButtonLink bsStyle="success" bsSize="xsmall" to="ArticlesEdit" params={{ id : row.pid }}>编辑</ButtonLink>
                                        <Button bsSize="xsmall" bsStyle="warning" onClick={this.deleteArticles.bind(this,row.pid)}>删除</Button>
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

export default Articles;