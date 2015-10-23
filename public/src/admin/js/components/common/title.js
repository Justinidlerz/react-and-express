import React, { Component } from 'react';
import ButtonLink from '../../../../bootstrap/router/ButtonLink';

class Title extends Component{
    render () {
        let titlePrefix = `${this.props.title}管理`;
        let activeName = `添加${this.props.title}>>`;
        let gotoLink = `${this.props.parent}Add`;
        if(this.props.type){
            titlePrefix = this.props.type == "Add"
                ? `添加${this.props.title}`
                : `编辑${this.props.title}`;
            activeName = "<<返回列表";
            gotoLink = this.props.parent;
        }
        return (
            <div className="common-title">
                <h2>{titlePrefix}</h2>
                {   !this.props.noBtn &&
                    <ButtonLink to={gotoLink} bsStyle='info'>
                        {activeName}
                    </ButtonLink>
                }
            </div>
        )
    }
}

export default Title;