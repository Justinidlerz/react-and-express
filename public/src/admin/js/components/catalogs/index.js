import React , { Component } from 'react';
import { RouteHandler } from 'react-router';
import Table from '../../../../bootstrap/Table';
import Label from '../../../../bootstrap/Label';
import Button from '../../../../bootstrap/Button';
import ButtonLink from '../../../../bootstrap/router/ButtonLink';
import Title from '../common/title';
import Pages from '../common/pages';
import request from 'superagent';

class Childs extends Component{
    render (){
        return (
            <div style={{ height : this.props.show ? this.props.data.length * 50 : 0 , overflow : "hidden" , transition : '0.8s' }}>
                {this.props.data.map((child , i)=>{
                    let time = new Date()
                    time.setTime(child.dateline * 1000);
                    return (
                        <div key={i} style={{ marginTop : 5 }}>
                            <span style={{ width : "20%" , "display" : "inline-block" }}>{child.csid}</span>
                            <span style={{ width : "20%" , "display" : "inline-block"}}><img src={child.cover} style={{ width : 40 , height : 40 }} /></span>
                            <span style={{ width : "20%" , "display" : "inline-block"}}>{child.title}</span>
                            <span style={{ width : "20%" , "display" : "inline-block"}}>{time.Format()}</span>
                            <span style={{ width : "20%" , "display" : "inline-block"}} className="contr-box">
                                <ButtonLink bsStyle="success" bsSize="xsmall" to="CatalogsEdit" params={{ id : child.csid , type : 2 , cid : this.props.id }}>编辑</ButtonLink>
                                <Button bsSize="xsmall" bsStyle="warning" onClick={this.props.deleteCatalog.bind(this,child.csid,2)}>删除</Button>
                            </span>
                        </div>
                    )
                })}
            </div>
        )
    }
}


class Catalogs extends Component{
    constructor(props , context){
        super(props , context);
        this.state = {
            list : [],
            total : 0
        }
        this.getCatalogs(this.props.params.page);
    }
    getCatalogs(page = 1){
        this.props.actions.showLoading();
        request.get("/Admin/Category/getList").query({
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
    deleteCatalogs(id , type){
        this.props.actions.openModal("提示","确定删除吗？",function(close){
            this.props.actions.showLoading();
            let url = type == 1
                ? "/Admin/Category/doDelete"
                : "/Admin/CategorySmall/doDelete";
            request.post(url).type("form").send({ id })
                .end(function(err, res){
                    if(err || res.body.status != 1){//error
                        let msg = err ? "网络错误" : res.body.msg
                        this.props.actions.alerts(msg , 'error');
                    }else{
                        close()
                        this.props.actions.alerts(res.body.msg);
                        this.getCatalogs(this.props.params.page);
                    }
                    this.props.actions.hideLoading();
                }.bind(this))
        }.bind(this))
    }
    handleShowSecend(index){
        let thisObj = Object.assign({},this.state.list[index],{ showChild : this.state.list[index].showChild ? false : true });
        this.state.list.splice(index,1,thisObj);
        this.setState({
            list : [...this.state.list]
        })
    }
    render () {
        const page =this.state.total != 0
            ? <Pages getData={this.getCatalogs.bind(this)} total={this.state.total} activePage={this.props.params.page} parent="Catalogs" />
            : "";
        return (
            <div>
                <Title title="分类" parent="Catalogs" />
                <div className="common-content">
                    <Table>
                        <thead>
                        <tr>
                            <th style={{ width : "20%"}}>ID</th>
                            <th style={{ width : "20%"}}>图片</th>
                            <th style={{ width : "20%"}}>分类名</th>
                            <th style={{ width : "20%"}}>创建时间</th>
                            <th style={{ width : "20%"}}>操作</th>
                        </tr>
                        </thead>
                        <tbody>
                        {this.state.list.map((row,index)=>{
                            let time = new Date()
                            time.setTime(row.dateline * 1000);
                            return (
                                <tr key={row.cid}>
                                    <td colSpan="5" style={{ width : "100%" }}>
                                        <div style={{ margin : '5px 0' }}>
                                            <span style={{ width : "20%" , "display" : "inline-block" }}>{row.cid}</span>
                                            <span style={{ width : "20%" , "display" : "inline-block"}}></span>
                                            <span style={{ width : "20%" , "display" : "inline-block"}}>{row.title}</span>
                                            <span style={{ width : "20%" , "display" : "inline-block"}}>{time.Format()}</span>
                                            <span style={{ width : "20%" , "display" : "inline-block"}} className="contr-box">
                                                { row.type == 1 && <ButtonLink bsStyle="success" bsSize="xsmall" to="CatalogsEdit" params={{ id : row.cid , type : 1 , cid : 1 }}>编辑</ButtonLink> }
                                                { row.type == 1 && <Button bsSize="xsmall" bsStyle="warning" onClick={this.deleteCatalogs.bind(this,row.cid,1)}>删除</Button> }
                                                { row.childs.length > 0 ? <Button bsSize="xsmall" bsStyle={ row.showChild ? "info" : "success" } onClick={this.handleShowSecend.bind(this,index)} >{row.showChild ? "收起二级" : "展开二级"}</Button> : "" }
                                            </span>
                                        </div>
                                        {row.childs.length > 0 ? <Childs data={ row.childs } id={ row.cid } deleteCatalog={this.deleteCatalogs.bind(this)} show={row.showChild} /> : "" }
                                    </td>
                                </tr>
                            )
                        })}
                        </tbody>
                    </Table>
                    {page}
                </div>
            </div>
        )
    }
}

export default Catalogs;