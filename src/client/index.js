import React from 'react'
import ReactDOM from 'react-dom'
import BrowserRouter from 'react-router-dom/BrowserRouter'
import {
  renderRoutes,
} from 'react-router-config'

import routes from 'client/routes'

const element = document.getElementById('app')

export default class Index extends React.Component {
  render() {
    return (
      <BrowserRouter>
        {renderRoutes(routes)}
      </BrowserRouter>
    )
  }
}

ReactDOM.hydrate(<Index />, element)
