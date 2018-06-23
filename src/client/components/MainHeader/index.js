import React from 'react'
import styled from 'styled-components'
// import PropTypes from 'prop-types'

import Toolbar from 'material-ui/core/Toolbar'
import Typography from 'material-ui/core/Typography'
import AppBar from 'material-ui/core/AppBar'
import Button from 'material-ui/core/Button'
import IconButton from 'material-ui/core/IconButton'
import AccountCircle from 'material-ui/icons/AccountCircle'

const RootDiv = styled.div`
  && {
    flex-grow: 1;
  }
`
const Title = styled.div`
  && {
    flex: 1;
    margin-left: 10px;
  }
`
const LoginButton = styled(IconButton)`
  && {
    margin-left: -12px;
    margin-right: 0px;
  }
`

export default class MainHeader extends React.Component {
  // static propTypes = {
  //   history: PropTypes.object.isRequired,
  // }

  handleClick = () => {
    console.log('handleClickAppbar')
    // this.props.history.push('/test')
  }

  render() {
    return (
      <header className="main-header">
        <RootDiv>
          <AppBar position="static">
            <Toolbar>
              <Typography variant="title" color="inherit">
                Podcasteo
              </Typography>
              <Title>
                <Button
                  color="inherit"
                  onClick={this.handleClick}
                >
                  DataBase
                </Button>
              </Title>
              <LoginButton color="inherit" aria-label="Menu">
                <AccountCircle />
              </LoginButton>
            </Toolbar>
          </AppBar>
        </RootDiv>
      </header>
    )
  }
}
