import React, { Component } from 'react';
import Pagination from '../../../../bootstrap/Pagination';

class Pages extends Component{
    constructor(props , context){
        super(props , context);
        this.state = {
            activePage: parseInt(this.props.activePage) || 1
        };
    }
    handleSelect(event, selectedEvent){
        this.setState({
            activePage: selectedEvent.eventKey
        });
        this.props.getData(selectedEvent.eventKey);
        this._reactInternalInstance._context.router.transitionTo(`${this.props.parent}Index`,{ page : selectedEvent.eventKey })
    }
    render () {
        const items = Math.ceil(this.props.total / 8);
        return (
            <Pagination
                prev
                next
                first
                last
                ellipsis
                items={items}
                maxButtons={5}
                activePage={this.state.activePage}
                onSelect={this.handleSelect.bind(this)} />
        )
    }
}

export default Pages;