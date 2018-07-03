import React from 'react'
import styled from 'styled-components'
// import PropTypes from 'prop-types'

import Toolbar from 'material-ui/core/Toolbar'
import Typography from 'material-ui/core/Typography'
import AppBar from 'material-ui/core/AppBar'
import IconButton from 'material-ui/core/IconButton'
import AccountCircle from 'material-ui/icons/AccountCircle'
import ScriptManagerIcon from 'material-ui/icons/Backup'
import DataIcon from 'material-ui/icons/Storage'

const RootDiv = styled.div`
  && {
    flex-grow: 1;
  }
`
const IconDiv = styled.div`
  && {
    float: end;
  }
`

export default class MainHeader extends React.Component {
  // TODO: history to implement
  // static propTypes = {
  //   history: PropTypes.object.isRequired,
  // }

  handleClick = () => {
    // console.log('handleClickAppbar')
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
              <IconDiv>
                <IconButton color="inherit" aria-label="Menu">
                  <DataIcon />
                </IconButton>
                <IconButton color="inherit" aria-label="Menu">
                  <ScriptManagerIcon />
                </IconButton>
                <IconButton color="inherit" aria-label="Menu">
                  <AccountCircle />
                </IconButton>
              </IconDiv>
            </Toolbar>
          </AppBar>
        </RootDiv>
      </header>
    )
  }
}
