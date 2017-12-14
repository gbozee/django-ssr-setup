// require('module-alias/register');
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
import path from 'path'
const bodyParser = require("body-parser");
const { graphqlExpress, graphiqlExpress } = require("apollo-server-express");
const { makeExecutableSchema } = require("graphql-tools");
const app = express();
// Some fake data
const books = [
  {
    title: "Harry Potter and the Sorcerer's stone",
    author: 'J.K. Rowling'
  },
  {
    title: 'Jurassic Park',
    author: 'Michael Crichton'
  }
];
// The GraphQL schema in string form
const typeDefs = `
  type Query { books: [Book], route(path: String): Route }
  type Book { title: String, author: String }
  type Route { html: String, css: String, scripts:[String],styles:[String]}
`;

// The resolvers
const resolvers = {
  Query: { 
    books: () => books,
    route: (_, {path})=>{
        const context = {};

        const sheet = new ServerStyleSheet()
        let modules = []
        const html = ReactDOMServer.renderToString(sheet.collectStyles(
            <Loadable.Capture report={moduleName => {
                modules.push(moduleName) }}>
                <StaticRouter location={path} context={context}>
                    <Routes />
                    </StaticRouter>
                </Loadable.Capture>
            )
        );
        const styleTags = sheet.getStyleTags()
        let bundles = getBundles(stats, ["undefined", ...modules]);
        let styles = bundles.filter(bundle => bundle.file.endsWith(".css"));
        let scripts = bundles.filter(bundle => bundle.file.endsWith(".js"));
        console.log(bundles)
        return {
            html,
            css:styleTags,
            scripts:scripts.map(x=>x.file),
            styles: styles.map(x=>x.file)
        }
} }
};

// Put together a schema
const schema = makeExecutableSchema({
  typeDefs,
  resolvers
});

// Serve client.js and vendor.js
app.use('/static', express.static(__dirname + '/static'));
app.use("/graphql", bodyParser.json(), graphqlExpress({ schema }));

// GraphiQL, a visual editor for queries
app.use("/graphiql", graphiqlExpress({ endpointURL: "/graphql" }));
let modules = [];
// app.get('/manifest.json',(req,res)=> {
//     res.status(200).sendFile(path.resolve(__dirname, "manifest.json"))
// })
// app.get('/service-worker.js', (req, res)=>{
//     res.status(200).sendFile(path.resolve(__dirname, 'service-worker.js'))
// })
// app.get('*', (req, res) => {
//     const context = {};

//     // const appWithRouter = (
        
//     // );
    
//     if (context.url) {
//         res.redirect(context.url);
//         return;
//     }
//     const sheet = new ServerStyleSheet()
//     const html = ReactDOMServer.renderToString(sheet.collectStyles(
//     // const html = ReactDOMServer.renderToString(
//         <Loadable.Capture report={moduleName => {
//             modules.push(moduleName) }}>
//             <StaticRouter location={req.url} context={context}>
//                 <Routes />
//                 </StaticRouter>
//             </Loadable.Capture>
//         )
//     );
//     const styleTags = sheet.getStyleTags()
//     // const styleTags = ""
//     // console.log(modules)
//     let bundles = getBundles(stats, ["undefined", ...modules]);
//     let styles = bundles.filter(bundle => bundle.file.endsWith(".css"));
//     let scripts = bundles.filter(bundle => bundle.file.endsWith(".js"));
//     console.log(bundles) 
//     res.status(200).send(render(html, styleTags, scripts, styles));
// });
Loadable.preloadAll().then(() => {
    app.listen(3000, () => console.log('Demo app listening on port 3000'));
});