import React ,{ Component } from 'react';
import Alert from '../../../../bootstrap/Alert';

class Alerts extends Component{
    render () {
        return(
            <div id="alerts">
                {this.props.alertArr.map((content,i)=>{
                    return (
                        <Alert id = "alerts" bsStyle={content.style} onDismiss={this.props.actions.dismiss.bind(this,i)} dismissAfter={2000} dismissOpt={i} key={i}>
                            <p>{content.msg}</p>
                        </Alert>
                    )
                })}
            </div>
        );
    }
}

export default Alerts;