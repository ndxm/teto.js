import React, { Component } from 'react'
import { Router } from 'react-router'

import history from 'utils/history'

const routes = {

  path: '/',

  getChildRoutes (location, cb) {
    require.ensure([], (require) => {
      cb(null, require('./childroutes'))
    })
  },

  getIndexRoute (location, cb) {
    require.ensure([], (require) => {
      cb(null, {
        component: require('./dashboard')
      })
    })
  },

  getComponent (location, cb) {
    require.ensure([], (require) => {
      cb(null, require('./component'))
    })
  }

}

export default class Index extends Component {

  // static propTypes = {
  // }

  // constructor (props, context) {
  //   super(props, context)
  // }

  render () {
    return (
      <Router history={history} routes={routes} />
    )
  }

}
