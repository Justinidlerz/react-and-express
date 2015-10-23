import React, { PropTypes, Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Header from '../components/common/header';
import Main from '../components/common/main';
import Alerts from '../components/common/alerts';
import Loading from '../components/common/loading';
import Modals from '../components/common/modals';
import * as action from './actions';

class App extends Component {
    render () {
        const { state , dispatch } = this.props;
        const actions = bindActionCreators(action,dispatch);

        return (
            <div id="app">
                <Loading show={ state.showLoading } />
                <Header actions={ actions } />
                <Main actions={ actions } />
                <Alerts alertArr={ state.ajaxTodo } actions={ actions } />
                <Modals close={ actions.closeModal } data={ state.modalTodo }/>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        state: state
    };
}


export default connect(mapStateToProps)(App);