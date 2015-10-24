import React from 'react';
import { Route, DefaultRoute, NotFoundRoute } from 'react-router';
import App from './app';
import Home from '../components/home'

import Users from '../components/users/index';
import UsersEdit from '../components/users/edit';

const basePath = "/admin";

const layoutRouter = (
    <Route handler={App}>
        <DefaultRoute handler={Home} />
        <NotFoundRoute handler={Home} />
        <Route name="home" path={`${basePath}`} handler={Home} />

        <Route name="users" path={`${basePath}/users`}>
            <DefaultRoute handler={Users} />
            <Route name="usersIndex" path="index/:page" handler={Users} />
            <Route name="usersAdd" path="add" handler={UsersEdit} />
            <Route name="usersEdit" path="edit/:id" handler={UsersEdit} />
        </Route>
    </Route>
);

export default layoutRouter;