import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { Router, Route, IndexRoute } from 'react-router'

import store from 'store'
import routes from 'routes'
import history from 'utils/history'

import App from 'app'

import styles from 'static/themes/default/styles/index.scss'

const asyncLoader = component => (location, cb) => {
  require(`app/${component}`)(function (c) {
    cb(null, c)
  })
}

const walkRoutes = (sets) =>
  Object.keys(sets).map((path) => {
    const value = sets[path]

    return (
      <Route key={path} path={path} getComponent={asyncLoader(value.component)}>
        { value.indexroute &&
          <IndexRoute getComponent={asyncLoader(value.indexroute)} /> }
        { value.childroutes &&
          walkRoutes(value.childroutes) }
      </Route>
    )
  })

const container = document.getElementById('app')

container.className = styles.app

render(
  <Provider key="provider" store={store}>
    <Router history={history}>
      <Route component={App}>
        { walkRoutes(routes) }
      </Route>
    </Router>
  </Provider>
  , container
)
