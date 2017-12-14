import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';

import {
    BrowserRouter as Router,
} from 'react-router-dom'
import Routes from './routes'
import { loadComponents } from 'loadable-components';


const Root = (props)=>(
    <Router>
        <Routes {...props}/>
    </Router>
)
loadComponents().then(()=>{
    ReactDOM.render(<Root />, document.getElementById('root'));
    registerServiceWorker();
})
