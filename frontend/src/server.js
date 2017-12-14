require('module-alias/register');
// in src/server/index.js
import express from 'express';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import {ServerStyleSheet} from 'styled-components'
import { StaticRouter } from 'react-router-dom';
import App from './App';
import { getLoadableState } from 'loadable-components/server';
import Routes from './routes'
// render is used to inject html in a globale template
import render from './render';

const app = express();
// Serve client.js and vendor.js
app.use('/static', express.static(__dirname + '/static'));

app.get('*', async (req, res) => {
    const context = {};
    let modules = [];

    const appWithRouter = (
            <StaticRouter location={req.url} context={context}>
                <Routes />
            </StaticRouter>

    );
    
    if (context.url) {
        res.redirect(context.url);
        return;
    }
    const loadableState = await getLoadableState(appWithRouter);
    const sheet = new ServerStyleSheet()
    const html = ReactDOMServer.renderToString(sheet.collectStyles(appWithRouter));
    const styleTags = sheet.getStyleTags() 

    res.status(200).send(render(html, styleTags, loadableState));
});

    app.listen(3000, () => console.log('Demo app listening on port 3000'));