import React from 'react'
import JssProvider from 'react-jss/lib/JssProvider'
import blue from 'material-ui/colors/blue'
import {
  createMuiTheme,
  MuiThemeProvider,
} from 'material-ui/styles'

export const theme = createMuiTheme({
  palette: {
    primary: blue,
  },
})

function withStyle(Component) {
  function WithStyle(props) {
    return (
      <JssProvider>
        <MuiThemeProvider theme={theme}>
          <Component {...props} />
        </MuiThemeProvider>
      </JssProvider>
    )
  }

  return WithStyle
}

export default withStyle
