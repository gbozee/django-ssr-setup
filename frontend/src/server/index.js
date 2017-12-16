
import getComponent, {cdn, afterScripts} from './react-server' //Should be the first line
import Loadable from 'react-loadable'
import express from "express";
import path from "path";
const bodyParser = require("body-parser");
const { graphqlExpress, graphiqlExpress } = require("apollo-server-express");
const { makeExecutableSchema } = require("graphql-tools");

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
  ${bundles.map(bundle => `<link rel="prefetch" href="${bundle}">`).join("\n")}
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

const app = express();
// Some fake data
const books = [
  {
    title: "Harry Potter and the Sorcerer's stone",
    author: "J.K. Rowling"
  },
  {
    title: "Jurassic Park",
    author: "Michael Crichton"
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
    route: (_, { path }) => {
      const context = {};
      return getComponent(context);
    }
  }
};

// Put together a schema
const schema = makeExecutableSchema({
  typeDefs,
  resolvers
});

// Serve client.js and vendor.js
app.use("/static", express.static(__dirname + "/static"));
// app.use("/graphql", bodyParser.json(), graphqlExpress({ schema }));

// // GraphiQL, a visual editor for queries
// app.use("/graphiql", graphiqlExpress({ endpointURL: "/graphql" }));
// let modules = [];
app.get("/manifest.json", (req, res) => {
  res.status(200).sendFile(path.resolve(__dirname, "manifest.json"));
});
app.get("/service-worker.js", (req, res) => {
  res.status(200).sendFile(path.resolve(__dirname, "service-worker.js"));
});
app.get("*", (req, res) => {
  const context = {};
  if (context.url) {
    res.redirect(context.url);
    return;
  }
  const { html, css, scripts, styles } = getComponent(req.url,
    context
  );
  res.status(200).send(render(html, css, scripts, styles));
});
export default app;

Loadable.preloadAll().then(() => {
  app.listen(3000, () => console.log("Demo app listening on port 3000"));
});
