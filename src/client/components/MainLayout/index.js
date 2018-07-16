import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import MainHeader from 'client/components/MainHeader'
import MainFooter from 'client/components/MainFooter'

const StyledMain = styled.main`
  flex: 1;
`

export default class MainLayout extends React.Component {
  static propTypes = {
    children: PropTypes.any.isRequired,
  };
  render() {
    return (
      <React.Fragment>
        <MainHeader />
        <StyledMain className="main-layout">
          {this.props.children}
        </StyledMain>
        <MainFooter />
      </React.Fragment>
    )
  }
}
