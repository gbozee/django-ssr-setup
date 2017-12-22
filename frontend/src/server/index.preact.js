import { getComponent, cdn, afterScripts } from "./preact-server"; //Should be the first line

const { graphqlExpress, graphiqlExpress } = require("apollo-server-express");

import Loadable from "react-loadable";
import express from "express";
import path from "path";
const bodyParser = require("body-parser");
import getRouter from "./router";
const app = express();
// Some fake data
const { router, schema } = getRouter(getComponent, cdn, afterScripts);
// Serve client.js and vendor.js
app.use("/static", express.static(__dirname + "/static"));
app.use("/graphql", bodyParser.json(), graphqlExpress({ schema }));

// // GraphiQL, a visual editor for queries
app.use("/graphiql", graphiqlExpress({ endpointURL: "/graphql" }));
// let modules = [];
app.use("/", router);
export default app;

Loadable.preloadAll().then(() => {
  app.listen(3000, () => console.log("Demo app listening on port 3000"));
});
