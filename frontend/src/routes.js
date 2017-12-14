import React from 'react'
import {
    Route,
    Switch,
} from 'react-router-dom'
import loadable from 'loadable-components'



const getLoadableComponent=(options) => loadable(options)


export default () => <Switch>
    <Route exact path="/" component={getLoadableComponent( () => import('./App'))} />
    <Route exact path="/new" component={getLoadableComponent(() => import('./App2'))} />
</Switch>