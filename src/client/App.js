import React from 'react'
import PropTypes from 'prop-types'
import {
  injectGlobal,
} from 'styled-components'
import {
  renderRoutes,
} from 'react-router-config'
import {
  Helmet,
} from 'react-helmet'

import withStyle from 'client/utils/withStyle'

// eslint-disable-next-line
const style = injectGlobal`
  html,body,#app,.app-wrapper {
    margin:0;
    padding:0;
    height:100%
  }

  .app-wrapper {
    display:flex;
    flex-direction: column;
  }
`

class App extends React.Component {
  static propTypes = {
    route: PropTypes.object.isRequired,
  }

  componentDidMount() {
    const jssStyles = document.getElementById('jss-server-side')

    if (jssStyles && jssStyles.parentNode) {
      jssStyles.parentNode.removeChild(jssStyles)
    }
  }

  render() {
    return (
      <div className="app-wrapper">
        <Helmet>
          <title>Podcasteo Back-Office</title>
          <meta name="description" content="Podcasteo back office" />
          <meta name="apple-mobile-web-app-capable" content="yes" />
          <meta name="mobile-web-app-capable" content="yes" />
        </Helmet>
        {renderRoutes(this.props.route.routes)}
      </div>
    )
  }
}

export default withStyle(App)
