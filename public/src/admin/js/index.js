import 'babel-core/polyfill';
import './components/common/dateFormat';
import '../css/index.css';

import React from 'react';
import { Provider } from 'react-redux';
import Router ,{ HistoryLocation } from 'react-router';
import store from './containers/store';
import routers from './containers/router';

Router.run(routers, HistoryLocation,(Root , routerState) => {
    React.render(
        <Provider store={store}>
            {() => <Root routerState={routerState} />}
        </Provider>,
        document.getElementById('root')
    );
});
