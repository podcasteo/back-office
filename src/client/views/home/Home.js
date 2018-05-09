import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import Button from 'material-ui/Button'

import MainLayout from 'client/components/MainLayout'

const HomeTitle = styled.div`
  color: blue;
  font-size: 32px;
`

class Home extends React.Component {
  static propTypes = {
    history: PropTypes.object.isRequired,
  }

  onClick() {
    this.props.history.push('/test')
  }

  render() {
    return (
      <MainLayout>
        <HomeTitle>This is HOME</HomeTitle>
        <Button variant="raised" color="primary" onClick={() => this.onClick()}>
          Go to test
        </Button>
      </MainLayout>
    )
  }
}

export default Home
