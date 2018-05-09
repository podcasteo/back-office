import React from 'react'
import PropTypes from 'prop-types'

import MainHeader from 'client/components/MainHeader'
import MainFooter from 'client/components/MainFooter'

export default class MainLayout extends React.Component {
  static propTypes = {
    children: PropTypes.any.isRequired,
  };

  render() {
    return (
      <React.Fragment>
        <MainHeader />
        <main className="main-layout">
          {this.props.children}
        </main>
        <MainFooter />
      </React.Fragment>
    )
  }
}
