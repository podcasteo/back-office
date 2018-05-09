import config from 'config'
import {
  Helmet,
} from 'react-helmet'
import {
  SheetsRegistry,
} from 'react-jss/lib/jss'
import {
  ServerStyleSheet,
} from 'styled-components'

import rootHtml from 'server/utils/rootHtml'
import template from 'server/utils/template'

export default (req, res) => {
  const context = {}
  const reqUrl = req.url
  const styledComponents = new ServerStyleSheet()
  const registry = new SheetsRegistry()
  const html = rootHtml({
    context,
    registry,
    reqUrl,
    styledComponents,
  })
  const helmet = Helmet.renderStatic()
  const data = {
    clientConfig: config.clientConfig,
    initialState: {},
    renderStats: {},
  }
  const style = {
    styledComponents: styledComponents.getStyleTags(),
    materialUI: registry.toString(),
  }

  if (context.url) {
    res.status(301).send({
      Location: context.url,
    })

    return
  }

  res.send(template({
    html,
    style,
    data,
    helmet,
  }))
}
