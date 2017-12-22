//@ts-check

import path from "path";
import express from "express";
const { makeExecutableSchema } = require("graphql-tools");

const books = [
  { title: "Harry Potter and the Sorcerer's stone", author: "J.K. Rowling" },
  { title: "Jurassic Park", author: "Michael Crichton" }
];
// The GraphQL schema in string form
const typeDefs = `
  type Query { books: [Book], route(path: String): Route }
  type Book { title: String, author: String }
  type Route { html: String, css: String, scripts:[String],styles:[String]}
`;
function renderer(getComponent, cdn, afterScripts) {
  const render = (html, css, bundles, styles) => `
  <!DOCTYPE html> 
  <html lang="en"> 
  <head> 
  <meta charset="utf-8"> 
  <meta name="viewport" content="width=device-width,initial-scale=1,shrink-to-fit=no"> 
  <meta name="theme-color" content="#000000"> 
  <link rel="manifest" href="/manifest.json"> 
  <link rel="shortcut icon" href="/favicon.ico"> 
  <title>React App</title> 
  ${css} 
  ${styles.map(style => `<link href="${style}" rel="stylesheet"/>`).join("\n")}
    ${bundles
      .map(bundle => `<link rel="prefetch" href="${bundle}">`)
      .join("\n")}
      </head> 
    <body> 
  <div id="root">${html}</div> 
      ${cdn}
       ${afterScripts}
  ${bundles.map(bundle => `<script src="${bundle}"></script>`).join("\n")}
  <script>window.main()</script>
    </body> 
  </html>
  `;

  // The resolvers
  const resolvers = {
    Query: {
      books: () => books,
      route: (_, { path }) => {
        const context = {};
        let newPath = path.replace("$", "");
        console.log(newPath);
        console.log(context);
        return getComponent(newPath, context);
      }
    }
  };
  // Put together a schema
  const schema = makeExecutableSchema({
    typeDefs,
    resolvers
  });
  const router = express.Router();

  router.get("/manifest.json", (req, res) => {
    res.status(200).sendFile(path.resolve(__dirname, "manifest.json"));
  });
  router.get("/service-worker.js", (req, res) => {
    res.status(200).sendFile(path.resolve(__dirname, "service-worker.js"));
  });
  router.get("*", (req, res) => {
    const context = {};
    if (context.url) {
      res.redirect(context.url);
      return;
    }
    const { html, css, scripts, styles } = getComponent(req.url, context);
    res.status(200).send(render(html, css, scripts, styles));
  });
  return { router, schema };
}

export default renderer;
