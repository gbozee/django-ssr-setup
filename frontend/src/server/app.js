import { getComponent, cdn, afterScripts } from "./react-server"; //Should be the first line
const { graphqlExpress, graphiqlExpress } = require("apollo-server-express");

import Loadable from "react-loadable";
import express from "express";
import path from "path";
const bodyParser = require("body-parser");
import getRouter from "./router";
const app = express();
// Some fake data
// Serve client.js and vendor.js
app.use("/static", express.static(__dirname + "/static"));
app.use("/graphql", bodyParser.json(), graphqlExpress({ schema }));

// // GraphiQL, a visual editor for queries
app.use("/graphiql", graphiqlExpress({ endpointURL: "/graphql" }));
// let modules = [];
const { router, schema } = getRouter(getComponent, cdn, afterScripts);
app.use("/", router);
export default app;

