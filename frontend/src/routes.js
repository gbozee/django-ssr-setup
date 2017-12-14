import React from 'react'
import {
    Route,
    Switch,
} from 'react-router-dom'
// import loadable from 'loadable-components'
import Loadable from 'react-loadable'

const Loading = () =><div>Loading...</div>

// const getLoadableComponent=(options) => 
// Loadable({ loader: options, 
//     loading: Loading,
//  });

// loadable(options)

const App = Loadable({loader:() => import('./App'),loading:Loading})
const App2 = Loadable({loader:() => import('./App2'),loading:Loading})

export default () => <Switch>
    <Route exact path="/" component={App} />
    <Route exact path="/new" component={App2} />
</Switch>