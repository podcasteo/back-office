import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import {
  withRouter,
} from 'react-router-dom'

import Toolbar from 'material-ui/core/Toolbar'
import Fade from 'material-ui/core/Fade'
import Menu from 'material-ui/core/Menu'
import MenuItem from 'material-ui/core/MenuItem'
import Typography from 'material-ui/core/Typography'
import Button from 'material-ui/core/Button'
import AppBar from 'material-ui/core/AppBar'
import IconButton from 'material-ui/core/IconButton'
import AccountCircle from 'material-ui/icons/AccountCircle'

const RootDiv = styled.div`
  && {
    display: flex;
  }
`
const MyTypography = styled(Button)`
  && {
    display: flex;
    align-items: center;
  }
`
const TitleTypo = styled(Typography)`
  && {
    margin-left:5px;
    display: flex;
    align-items: center;
    flex-grow:1;
  }
`
const CenterToolbar = styled.div`
  && {
    display: flex
    flex-grow:3;
  }
`
const LastIcon = styled.div`
  && {
    display: flex;
    justify-content: flex-end;
    flex-grow:1;
  }
`
const MyToolbar = styled(Toolbar)`
  && {
    display: flex;
 }
`

class MainHeader extends React.Component {
  // TODO: history to implement
  static propTypes = {
    history: PropTypes.object.isRequired,
  }
  constructor(props) {
    super(props)

    this.state = {
      anchorEl: null,
    }
  }

  componentDidMount() {
    this.checkAuth()
  }

  handleMenuOpen = (event) => {
    this.setState({
      anchorEl: event.currentTarget,
    })
  }

  handleClick = (url) => {
    // console.log('handleClickAppbar')
    this.props.history.push(`${url}`)
  }

  handleClose = () => {
    this.setState({
      anchorEl: null,
    })
  }

  handleLogout = () => {
    localStorage.removeItem('Authorization')
    this.props.history.push('/login')
  }

  checkAuth = () => {
    if (!localStorage.getItem('Authorization')) {
      this.props.history.push('/login')
    }
  }

  render() {
    const {
      anchorEl,
    } = this.state

    return (
      <header className="main-header">
        <RootDiv>
          <AppBar position="static">
            <MyToolbar>
              <TitleTypo variant="title" color="inherit">
                Podcasteo
              </TitleTypo>
              <CenterToolbar>
                <MyTypography
                  color="inherit"
                  onClick={() => this.handleClick('/')}
                >
                  Podcasts
                </MyTypography>
                <MyTypography
                  color="inherit"
                  onClick={() => this.handleClick('/training')}
                >
                  Training
                </MyTypography>
                <MyTypography
                  color="inherit"
                  onClick={() => this.handleClick('/scripts')}
                >
                  Scripts
                </MyTypography>
                <MyTypography
                  color="inherit"
                  onClick={() => this.handleClick('/parameters')}
                >
                  Parametres
                </MyTypography>
              </CenterToolbar>
              <LastIcon>
                <IconButton
                  aria-owns={anchorEl ? 'fade-menu' : null}
                  aria-haspopup="true"
                  onClick={this.handleMenuOpen}
                  color="inherit"
                  aria-label="Menu"
                >
                  <AccountCircle />
                </IconButton>
                <Menu
                  id="fade-menu"
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={this.handleClose}
                  TransitionComponent={Fade}
                >
                  <MenuItem onClick={this.handleLogout}>Logout</MenuItem>
                </Menu>
              </LastIcon>
            </MyToolbar>
          </AppBar>
        </RootDiv>
      </header>
    )
  }
}

export default withRouter(MainHeader)
