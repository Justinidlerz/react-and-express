import React , { Component } from 'react';
import { RouteHandler } from 'react-router';
import Table from '../../../../bootstrap/Table';
import Input from '../../../../bootstrap/Input';
import Label from '../../../../bootstrap/Label';
import Button from '../../../../bootstrap/Button';
import ButtonLink from '../../../../bootstrap/router/ButtonLink';
import Title from '../common/title';
import Pages from '../common/pages';
import ArticleSelect from './articleSelect';
import PictureSelect from './pictureSelect';
import request from 'superagent';


class Products extends Component{
    constructor(props , context){
        super(props , context);
        this.state = {
            list : [],
            total : 0,
            query : ""
        }
        this.getProduct(this.props.params.page);
    }
    getProduct (page = 1 , callback = null) {
        this.props.actions.showLoading();
        request.get("/Admin/Goods/getList").query({
            page,
            rows : 8,
            key : this.state.query
        }).end(function(err, res){
            if(err || res.body.status != 1){//error
                let msg = err ? "网络错误" : res.body.msg
                this.props.actions.alerts(msg , 'error');
            }else{
                this.setState({
                    list : res.body.data,
                    total : res.body.total
                })
                callback && callback.call(this,res.body.data);
            }
            this.props.actions.hideLoading();
        }.bind(this))
    }
    deleteProduct(id){
        this.props.actions.openModal("提示","确定删除吗？",function(close){
            this.props.actions.showLoading();
            request.post("/Admin/Goods/doDelete").type("form").send({ id })
                .end(function(err, res){
                    if(err || res.body.status != 1){//error
                        let msg = err ? "网络错误" : res.body.msg
                        this.props.actions.alerts(msg , 'error');
                    }else{
                        close()
                        this.props.actions.alerts(res.body.msg, "success");
                        this.getProduct(this.props.params.page);
                    }
                    this.props.actions.hideLoading();
                }.bind(this))
        }.bind(this))
    }
    changeAritcles (id ,e){
        this.props.actions.openModal("攻略选择",<ArticleSelect actions={this.props.actions} id={id} />)
    }
    changePic( id , rid ){
        this.props.actions.openModal("图片操作", <PictureSelect actions={this.props.actions} id={id} rid={ rid } />)
    }
    handleQuery (e){
        this.setState({
            query : e.target.value
        });
    }
    render () {
        const page =this.state.total != 0
            ? <Pages getData={this.getProduct.bind(this)} total={this.state.total} activePage={this.props.params.page} parent="Products" />
            : "";
        return (
            <div>
                <Title title="商品" parent="Products" />
                <div className="common-content">
                    <div className="form-group">
                        <div className="col-xs-2"><Input type="text" placeholder="关键字" onChange={this.handleQuery.bind(this)} /></div>
                        <Button bsStyle="primary" onClick={this.getProduct.bind(this,this.props.params.page)} >筛选</Button>
                    </div>
                    <Table>
                        <thead>
                        <tr>
                            <th style={{ width : "15%"}}>ID</th>
                            <th style={{ width : "20%"}}>名称</th>
                            <th style={{ width : "15%"}}>淘宝地址</th>
                            <th style={{ width : "15%"}}>价格</th>
                            <th style={{ width : "15%"}}>创建者</th>
                            <th style={{ width : "20%"}}>操作</th>
                        </tr>
                        </thead>
                        <tbody>
                        {this.state.list.map((row)=>{
                           return (
                                <tr key={row.gid}>
                                    <td>{row.gid}</td>
                                    <td>{ row.title}</td>
                                    <td><a href={row.url}>查看</a></td>
                                    <td>{row.price}</td>
                                    <td>{row.adminer}</td>
                                    <td className="contr-box">
                                        <Button bsStyle="success" bsSize="xsmall" onClick={this.changeAritcles.bind(this,row.gid)} >攻略</Button>
                                        <Button bsStyle="success" bsSize="xsmall" onClick={this.changePic.bind(this,row.gid,row.rid)} >图片</Button>
                                        <ButtonLink bsStyle="success" bsSize="xsmall" to="ProductsEdit" params={{ id : row.gid }}>编辑</ButtonLink>
                                        <Button bsSize="xsmall" bsStyle="warning" onClick={this.deleteProduct.bind(this,row.gid)}>删除</Button>
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

export default Products;