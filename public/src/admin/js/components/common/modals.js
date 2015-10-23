import React ,{ Component } from 'react';
import Modal from '../../../../bootstrap/Modal';
import Button from '../../../../bootstrap/Button';

class Modals extends Component{
    constructor(props , context){
        super(props , context);
    }
    ok(){
        this.props.data.callback(this.close , this.props.data.body);
    }
    close (){
        this.props.data.onClose
            ? this.props.data.onClose( this.props.close , this.props.data.body)
            : this.props.close()
    }
    render () {
        const okBtn = typeof this.props.data.callback == 'function'
            ? <Button bsStyle="success" onClick={this.ok.bind(this)}>确定</Button>
            : "";
        return (
            <Modal show={this.props.data.show} onHide={this.close.bind(this)}>
                <Modal.Header closeButton>
                    <Modal.Title>{this.props.data.title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {this.props.data.body}
                </Modal.Body>
                <Modal.Footer>
                    {okBtn}
                    <Button onClick={this.close.bind(this)}>关闭</Button>
                </Modal.Footer>
            </Modal>
        )
    }
}


export default Modals;