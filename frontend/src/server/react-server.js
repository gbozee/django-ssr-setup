import React from "react";
import { getComponents as GC } from "./utils";
import ReactDOMServer from "react-dom/server";
import { ServerStyleSheet } from "styled-components";
import Loadable from "react-loadable";
import { StaticRouter } from "react-router-dom";
import Routes from "../routes";

export const cdn = `
<script type="text/javascript" src="https://unpkg.com/@umds/object-assign@4.1.1-beta.24/object-assign.min.js"></script>
<script type="text/javascript" src="https://unpkg.com/react@16.2.0/umd/react.production.min.js"></script>
<script type="text/javascript" src="https://unpkg.com/react-dom@16.2.0/umd/react-dom.production.min.js"></script>
<script type="text/javascript" src="https://unpkg.com/react-router-dom@4.2.2/umd/react-router-dom.min.js"></script>
    `;
export const afterScripts = ` `;
export const getComponent =  (path, context) => {
  const sheet = new ServerStyleSheet();
  const modules = [];
  const html = ReactDOMServer.renderToString(
    sheet.collectStyles(
      <Loadable.Capture
        report={moduleName => {
          modules.push(moduleName);
        }}
      >
        <StaticRouter location={path} context={context}>
          <Routes />
        </StaticRouter>
      </Loadable.Capture>
    )
  );

  return GC(ReactDOMServer.renderToString,path, context);
};
