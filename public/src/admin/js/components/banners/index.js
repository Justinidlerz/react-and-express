import React , { Component } from 'react';
import { RouteHandler } from 'react-router';
import Table from '../../../../bootstrap/Table';
import Input from '../../../../bootstrap/Input';
import Label from '../../../../bootstrap/Label';
import Button from '../../../../bootstrap/Button';
import ButtonLink from '../../../../bootstrap/router/ButtonLink';
import Title from '../common/title';
import Pages from '../common/pages';
import request from 'superagent'

class Banners extends Component{
    constructor(props , context){
        super(props , context);
        this.state = {
            list : [],
            total : 0
        }
        this.getBanners(this.props.params.page);
    }
    getBanners (page = 1) {
        this.props.actions.showLoading();
        request.get("/Admin/Ad/getList").query({
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
    deleteBanners(id){
        this.props.actions.openModal("提示","确定删除吗？",function(){
            this.props.actions.showLoading();
            request.post("/Admin/Ad/doDelete").type("form").send({ id })
                .end(function(err, res){
                    if(err || res.body.status != 1){//error
                        let msg = err ? "网络错误" : res.body.msg
                        this.props.actions.alerts(msg , 'error');
                    }else{
                        close();
                        this.props.actions.alerts(res.body.msg);
                        this.getBanners(this.props.params.page);
                    }
                    this.props.actions.hideLoading();
                }.bind(this))
        }.bind(this))
    }

    updateOid( id, e ){
        const oid = e.target.parentNode.previousElementSibling.value;
        this.props.actions.showLoading();
        request.post("/Admin/Ad/doSave").type("form").send({ id , oid })
            .end(function(err, res){
                if(err || res.body.status != 1){//error
                    let msg = err ? "网络错误" : res.body.msg
                    this.props.actions.alerts(msg , 'error');
                }else{
                    this.props.actions.alerts(res.body.msg ,"success");
                }
                this.props.actions.hideLoading();
            }.bind(this))
    }
    render () {
        const page =this.state.total != 0
            ? <Pages getData={this.getBanners.bind(this)} total={this.state.total} activePage={this.props.params.page} parent="Banners" />
            : "";
        return (
            <div>
                <Title title="轮播" parent="Banners" />
                <div className="common-content">
                    <Table>
                        <thead>
                        <tr>
                            <th style={{ width : "25%"}}>排序</th>
                            <th style={{ width : "25%"}}>抬头</th>
                            <th style={{ width : "25%"}}>图片</th>
                            <th style={{ width : "25%"}}>操作</th>
                        </tr>
                        </thead>
                        <tbody>
                        {this.state.list.map((row)=>{
                            return (
                                <tr key={row.aid}>
                                    <td><Input type="text" defaultValue={row.oid} groupStyle={{ width : 90 }} buttonAfter={<Button onClick={this.updateOid.bind(this,row.aid)}>更新</Button>} bsSize="small" /></td>
                                    <td>{row.title}</td>
                                    <td><img src={row.cover} style={{ width : 40 , height : 40 }} /></td>
                                    <td className="contr-box">
                                        <ButtonLink bsStyle="success" bsSize="xsmall" to="BannersEdit" params={{ id : row.aid }}>编辑</ButtonLink>
                                        <Button bsSize="xsmall" bsStyle="warning" onClick={this.deleteBanners.bind(this,row.aid)}>删除</Button>
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

export default Banners;