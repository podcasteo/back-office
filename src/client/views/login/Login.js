import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import Loading from 'client/components/Loading'
import FormGroup from 'material-ui/core/FormGroup'
import Card from 'material-ui/core/Card'
import CardContent from 'material-ui/core/CardContent'
import TextField from 'material-ui/core/TextField'
import Typography from 'material-ui/core/Typography'
import Button from 'material-ui/core/Button'
import Grid from 'material-ui/core/Grid'
import config from 'client/utils/config'

const MainLoginDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  height:100%;
`
const LoginFormGroup = styled(FormGroup)`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`
const LoginButton = styled(Button)`
  margin:10px;
`

class Login extends React.Component {
  static propTypes = {
    history: PropTypes.object.isRequired,
  }

  constructor(props) {
    super(props)

    this.state = {
      email: '',
      password: '',
      authState: '',
      emailError: false,
      passwordError: false,
    }
  }
  handleAuthFail = (response) => {
    // TODO: auth fail info
    console.log(response, this.state.authState)// eslint-disable-line
  }

  handleLogin = (event) => {
    const {
      email,
      password,
    } = this.state

    event.preventDefault()

    if (email === '' || password === '') {
      this.setState({
        emailError: email === '',
        passwordError: password === '',
      })

      return
    }

    this.setState({
      authState: 'pending',
    })

    fetch(`${config.get('apiHost')}/users/login`, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify({
        email,
        password,
      }),
    }).then((res) => {
      if (!res.ok) {
        this.setState({
          authState: 'failed',
        })
        this.handleAuthFail(res.json())

        return
      }

      res.json().then((data) => {
        localStorage.setItem('Authorization', data.token)
        this.props.history.push('/')
      })
    }).catch((err) => {
      // TODO: handle error
      console.log(err) // eslint-disable-line
    })
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    })
  }
  render() {
    const {
      authState,
    } = this.state
    let loginStatus

    if (authState === 'pending') {
      loginStatus = <Loading message="Connexion en cours" />
    } else if (authState === 'failed') {
      loginStatus = <Typography color="error"> Echec de la connexion </Typography>
    }

    return (
      <MainLoginDiv>
        <Grid container justify="center">
          <Card>
            <CardContent>
              <img src="/image/logo.jpg" alt="logo" />
              <form onSubmit={this.handleLogin}>
                <LoginFormGroup>
                  <TextField
                    error={this.state.emailError}
                    label="Email"
                    name="email"
                    onChange={this.handleChange}
                  />
                  <TextField
                    error={this.state.passwordError}
                    label="Password"
                    name="password"
                    type="password"
                    onChange={this.handleChange}
                  />
                  <LoginButton type="submit" variant="raised" color="primary" onClick={this.handleLogin}>
                      Login
                  </LoginButton>
                  {loginStatus}
                </LoginFormGroup>
              </form>
            </CardContent>
          </Card>
        </Grid>
      </MainLoginDiv>
    )
  }
}

export default Login
