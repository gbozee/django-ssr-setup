import { getBundles } from "react-loadable/webpack";
import stats from "./react-loadable.json";
import React from "react";
import { ServerStyleSheet } from "styled-components";
import Loadable from "react-loadable";
import { StaticRouter } from "react-router-dom";
import Routes from "../routes";

export function getComponents(renderToString, path, context) {
  let modules = [];
  const sheet = new ServerStyleSheet();
  const html = renderToString(
    sheet.collectStyles(
      <Loadable.Capture
        report={moduleName => {
          modules.push(moduleName);
        }}
      >
        <div>
          <StaticRouter location={path} context={context}>
            <Routes />
          </StaticRouter>
        </div>
      </Loadable.Capture>
    )
  );

  const styleTags = sheet.getStyleTags();
  let bundles = getBundles(stats, ["undefined", ...modules]);
  let styles = bundles.filter(bundle => bundle.file.endsWith(".css"));
  let scripts = bundles.filter(bundle => bundle.file.endsWith(".js"));
  return {
    html,
    css: styleTags,
    scripts: [...new Set(scripts.map(x => x.file))],
    styles: [...new Set(styles.map(x => x.file))]
  };
}
