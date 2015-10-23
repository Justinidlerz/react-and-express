import React , { Component } from 'react';
import { RouteHandler } from 'react-router';
import Table from '../../../../bootstrap/Table';
import Button from '../../../../bootstrap/Button';
import ButtonLink from '../../../../bootstrap/router/ButtonLink';
import Title from '../common/title';
import Pages from '../common/pages';
import request from 'superagent';


class AppConfig extends Component{
    constructor(props , context){
        super(props , context);
        this.state = {
            list : [],
            total : 0
        }
        this.getData();
    }
    getData() {
        this.props.actions.showLoading();
        request.get("/Admin/Share/getList")
            .end(function(err, res){
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
    returnList () {
        let list = [];
        for(var i in this.state.list){
            list.push(this.state.list[i])
        }
        return list;
    }
    render(){
        return (
            <div>
                <Title title="app分享" noBtn={ true } />
                <div className="common-content">
                    <Table>
                        <thead>
                        <tr>
                            <th style={{ width : "20%"}}>类型</th>
                            <th style={{ width : "60%"}}>抬头</th>
                            <th style={{ width : "20%"}}>操作</th>
                        </tr>
                        </thead>
                        <tbody>
                        {this.returnList().map((row , i )=>{
                            return (
                                <tr key={ i }>
                                    <td>{ row.type }</td>
                                    <td>{ row.title }</td>
                                    <td>
                                        <ButtonLink bsStyle="success" bsSize="xsmall" to="AppShareConfigEdit" params={{ type : row.type }}>编辑</ButtonLink>
                                    </td>
                                </tr>
                            )
                        })}
                        </tbody>
                    </Table>
                </div>
            </div>
        )
    }
}

export default AppConfig;