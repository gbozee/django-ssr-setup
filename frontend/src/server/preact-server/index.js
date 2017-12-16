import "./patchPreact";
import { getComponents } from "../utils";
import renderToString from "preact-render-to-string";

export const cdn = `
<script type="text/javascript" src="https://unpkg.com/@umds/object-assign@4.1.1-beta.24/object-assign.min.js"></script>
<script type="text/javascript" src="https://unpkg.com/preact@8.2.7/dist/preact.min.js"></script>
<script src="https://unpkg.com/prop-types@15.6/prop-types.js"></script>
<script type="text/javascript" src="https://unpkg.com/preact-compat@3.17.0/dist/preact-compat.min.js"></script>
`;
export const afterScripts = `
<script>
window.React = preactCompat;
window.ReactDOM = preactCompat;</script>
<script type="text/javascript" src="https://unpkg.com/react-router-dom@4.2.2/umd/react-router-dom.min.js"></script>
`

export default (path, context) => {
  return getComponents(renderToString, path, context);
};
