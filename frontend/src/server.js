require('module-alias/register');
// in src/server/index.js
import express from 'express';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import {ServerStyleSheet} from 'styled-components'
import { StaticRouter } from 'react-router-dom';
import App from './App';
import Loadable from "react-loadable";
import Routes from './routes'
// render is used to inject html in a globale template
import render from './render';
import { getBundles } from 'react-loadable/webpack'
import stats from './react-loadable.json';

const app = express();
// Serve client.js and vendor.js
app.use('/static', express.static(__dirname + '/static'));

let modules = [];
app.get('*', (req, res) => {
    const context = {};

    // const appWithRouter = (
        
    // );
    
    if (context.url) {
        res.redirect(context.url);
        return;
    }
    const sheet = new ServerStyleSheet()
    const html = ReactDOMServer.renderToString(sheet.collectStyles(
    // const html = ReactDOMServer.renderToString(
        <Loadable.Capture report={moduleName => {
            modules.push(moduleName) }}>
            <StaticRouter location={req.url} context={context}>
                <Routes />
                </StaticRouter>
            </Loadable.Capture>
        )
    );
    const styleTags = sheet.getStyleTags()
    // const styleTags = ""
    console.log(modules) 
    let bundles = getBundles(stats, modules);
    res.status(200).send(render(html, styleTags, bundles));
});
Loadable.preloadAll().then(() => {
    app.listen(3000, () => console.log('Demo app listening on port 3000'));
});