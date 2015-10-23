import React from 'react';
import { Route, DefaultRoute } from 'react-router';
import App from './app';
import Home from '../components/home'

import Banners from '../components/banners/index';
import BannersEdit from '../components/banners/edit';

import Articles from '../components/articles/index';
import ArticlesEdit from '../components/articles/edit';

import Catalogs from '../components/catalogs/index';
import CatalogsEdit from '../components/catalogs/edit';

import Products from '../components/products/index';
import ProductsEdit from '../components/products/edit';

import Users from '../components/users/index';
import UsersEdit from '../components/users/edit';

import AppShareConfig from '../components/appShareConfig/index';
import AppShareConfigEdit from '../components/appShareConfig/edit';

const basePath = "/Admin/Base/Index";

const layoutRouter = (
    <Route handler={App}>
        <DefaultRoute handler={Home} />
        <Route name="Home" path={`${basePath}`} handler={Home} />

        <Route name="Banners" path={`${basePath}/Banners`}>
            <DefaultRoute handler={Banners} />
            <Route name="BannersIndex" path="Index/:page" handler={Banners} />
            <Route name="BannersAdd" path="Add" handler={BannersEdit} />
            <Route name="BannersEdit" path="Edit/:id" handler={BannersEdit} />
        </Route>

        <Route name="Articles" path={`${basePath}/Articles`}>
            <DefaultRoute handler={Articles} />
            <Route name="ArticlesIndex" path="Index/:page" handler={Articles} />
            <Route name="ArticlesAdd" path="Add" handler={ArticlesEdit} />
            <Route name="ArticlesEdit" path="Edit/:id" handler={ArticlesEdit} />
        </Route>

        <Route name="Catalogs" path={`${basePath}/Catalogs`}>
            <DefaultRoute handler={Catalogs} />
            <Route name="CatalogsIndex" path="Index/:page" handler={Catalogs} />
            <Route name="CatalogsAdd" path="Add" handler={CatalogsEdit} />
            <Route name="CatalogsEdit" path="Edit/:id/:type/:cid" handler={CatalogsEdit} />
        </Route>

        <Route name="Products" path={`${basePath}/Products`}>
            <DefaultRoute handler={Products} />
            <Route name="ProductsIndex" path="Index/:page" handler={Products} />
            <Route name="ProductsAdd" path="Add" handler={ProductsEdit} />
            <Route name="ProductsEdit" path="Edit/:id" handler={ProductsEdit} />
        </Route>
        <Route name="Users" path={`${basePath}/Users`}>
            <DefaultRoute handler={Users} />
            <Route name="UsersIndex" path="Index/:page" handler={Users} />
            <Route name="UsersAdd" path="Add" handler={UsersEdit} />
            <Route name="UsersEdit" path="Edit/:id" handler={UsersEdit} />
        </Route>
        <Route name="AppShareConfig" path={`${basePath}/AppShareConfig`}>
            <DefaultRoute handler={AppShareConfig} />
            <Route name="AppShareConfigIndex" path="Index" handler={AppShareConfig} />
            <Route name="AppShareConfigEdit" path="Edit/:type" handler={AppShareConfigEdit} />
        </Route>
    </Route>
);

export default layoutRouter;