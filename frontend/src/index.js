import React from "react";
import ReactDOM from "react-dom";
import registerServiceWorker from "./registerServiceWorker";

import { BrowserRouter as Router } from "react-router-dom";
import Routes from "./routes";
// import { loadComponents } from 'loadable-components';
import Loadable from "react-loadable";

const Root = props => (
  <Router>
    <Routes {...props} />
  </Router>
);
// ReactDOM.render(<Root />, document.getElementById('root'));
// // loadComponents().then(()=>{
// // })
registerServiceWorker();
window.main = () => {
  Loadable.preloadReady().then(() => {
    ReactDOM.hydrate(<Root />, document.getElementById("root"));
  });
};
