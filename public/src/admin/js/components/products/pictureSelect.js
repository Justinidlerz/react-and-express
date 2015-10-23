import React , { Component } from 'react';
import request from 'superagent';
import Droppie from 'react-droppie';
import Button from '../../../../bootstrap/Button';
import Label from '../../../../bootstrap/Label';

class Picture extends Component{
    constructor(props , context){
        super(props , context);
        this.state = {
            cover : ""
        }
    }
    handleImgChange (cover, file){
        this.setState({ cover });
        this.props.setPicFile( this.props.index , file )
    }
    handleDelete (){
        this.props.deletePic( this.props.index )
    }
    render (){
        return (
            <div className="xsmall-droppie" style={{ display : "inline-block" , verticalAlign : "middle" , marginRight : 10 , marginBottom : 10 , border : "1px solid #eee" , textAlign : "center" }}>
                <Droppie onChange={this.handleImgChange.bind(this)} image={this.state.cover} showButton='选择图片' accept="image/png,image/gif,image/jpg" style={{ width : 80 , height : 80 , backgroundRepeat : "no-repeat" }} />
                <Button onClick={this.handleDelete.bind(this)} bsStyle="warning" style={{ marginTop : 10 }} >删除图片</Button>
            </div>
        )
    }
}

class pictureSelect extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            actionList: [],
            pics : [],
            picFiles : [],
            rid : this.props.rid
        }
        this.getActivePicture(this.props.id);
        this.addPics()
    }
    getActivePicture (gid){
        this.props.actions.showLoading();
        request.get("/Admin/GoodsResource/getList").query({ gid })
            .end(function(err, res){
                if(err || res.body.status != 1){//error
                    let msg = err ? "网络错误" : res.body.msg
                    this.props.actions.alerts(msg , 'error');
                }else{
                    this.setState({
                        actionList : res.body.data
                    })
                }
                this.props.actions.hideLoading();
            }.bind(this))
    }
    setPicFile ( index , file ){
        this.state.picFiles.splice( index , 1 , file )
        this.setState({
            picFiles : [...this.state.picFiles]
        })
    }
    addPics (){
        this.state.pics.push(<Picture key={ this.state.pics.length } setPicFile={ this.setPicFile.bind(this) } index={ this.state.pics.length } deletePic={ this.deletePic.bind(this) } />)
        this.state.picFiles.push(null)
        this.setState({
            pics : [...this.state.pics],
            picFiles : [...this.state.picFiles]
        })
    }
    deletePic ( index ){
        this.state.pics.splice( index , 1 , null )
        this.state.picFiles.splice( index , 1 , null )
        this.setState({
            pics : [...this.state.pics],
            picFiles : [...this.state.picFiles]
        })
    }
    startSend( id , cover , index ){
        this.props.actions.showLoading();
        request.post("/Admin/Goods/doUpload")
        .field( "cover" , cover )
        .field( "id" , id )
        .end(function(err, res){
            if(err || res.body.status != 1){//error
                let msg = err ? "网络错误" : res.body.msg
                this.props.actions.alerts(msg , 'error');
            }else{
                this.deletePic ( index );
                this.getActivePicture(this.props.id);
            }
            this.props.actions.hideLoading();
        }.bind(this))
    }
    sendPic (){
        this.state.picFiles.map(( j , i ) => {
            j != null && this.startSend( this.props.id , j , i )
        })
    }
    realDelete( id ){
        this.props.actions.showLoading();
        request.post("/Admin/GoodsResource/doDelete").send({ id }).type("form")
            .end(function(err, res){
                if(err || res.body.status != 1){//error
                    let msg = err ? "网络错误" : res.body.msg
                    this.props.actions.alerts(msg , 'error');
                }else{
                    this.getActivePicture(this.props.id);
                }
                this.props.actions.hideLoading();
            }.bind(this))
    }
    setPivToCover( grid ){
        this.props.actions.showLoading();
        request.post("/Admin/Goods/setCover")
            .send({ grid , gid : this.props.id }).type("form")
            .end(function(err, res){
                if(err || res.body.status != 1){//error
                    let msg = err ? "网络错误" : res.body.msg
                    this.props.actions.alerts(msg , 'error');
                }else{
                    this.props.actions.alerts(res.body.msg , "success");
                    this.setState({
                        rid : grid
                    })
                }
                this.props.actions.hideLoading();
            }.bind(this))
    }
    render (){
        return (
            <div>
                <div>
                    <div style={{ marginBottom : 10 , fontWeight : 'bold'}}>已有图片</div>
                    {this.state.actionList.length == 0
                        ? "暂无图片"
                        : this.state.actionList.map(( j , i ) => {
                        return (<div key={ i }  style={{ display : "inline-block" , verticalAlign : "middle" , marginRight : 10 , marginBottom : 10 , border : "1px solid #eee" , textAlign : "center" }}>
                            <div><img src={ j.resource } style={{ width : 80 , height : 80 }} /></div>
                            <Button bsStyle="warning" bsSize="xsmall" onClick={this.realDelete.bind(this,j.grid)} style={{ marginRight : 5 }}>删除</Button>
                            {this.props.rid == j.grid
                                ? <Label bsStyle="success" bsSize="xsmall">主图</Label>
                                : <Button bsStyle="info" bsSize="xsmall" onClick={this.setPivToCover.bind(this,j.grid)}>设为主图</Button>
                            }
                        </div>)
                    })}
                </div>
                <div style={{ borderTop : '1px solid #eee' , marginTop : 10 }}>
                    <div style={{ margin: "10px 0" , fontWeight : 'bold'}}>添加图片
                        <Button bsStyle="success" bsSize="xsmall" onClick={ this.addPics.bind(this) } style={{ margin : "0 10px"}}>添加</Button>
                        <Button bsStyle="info" bsSize="xsmall" onClick={ this.sendPic.bind(this) }>上传</Button>
                    </div>
                    {this.state.pics.map(( j , i ) => {
                        return j;
                    })}
                </div>
            </div>
        )
    }

}

export default pictureSelect;

