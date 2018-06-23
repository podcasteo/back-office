import React from 'react'
import StaticRouter from 'react-router-dom/StaticRouter'
import JssProvider from 'react-jss/lib/JssProvider'
import {
  renderToString,
} from 'react-dom/server'
import {
  renderRoutes,
} from 'react-router-config'

import {
  MuiThemeProvider,
} from 'material-ui/core/styles'
import routes from 'client/routes'
import {
  theme,
} from 'client/utils/withStyle'

export default ({
  context,
  registry,
  reqUrl,
  styledComponents,
}) => {
  const router = (
    <StaticRouter context={context} location={reqUrl}>
      <JssProvider registry={registry}>
        <MuiThemeProvider theme={theme} sheetsManager={new Map()}>
          {renderRoutes(routes)}
        </MuiThemeProvider>
      </JssProvider>
    </StaticRouter>
  )

  return renderToString(styledComponents.collectStyles(router))
}
