import React from 'react'
import PropTypes from 'prop-types'

import CircularProgress from 'material-ui/core/CircularProgress'
import Typography from 'material-ui/core/Typography'

// import styled from 'styled-components'

// const MainDiv = styled.div`
//   margin:25px;
//   display:flex;
//   justify-content: center;
//   align-items: center;
// `

class ScriptStatus extends React.Component {
  static propTypes = {
    promise: PropTypes.object,
  }

  static defaultProps = {
    promise: {},
  }

  // constructor(props) {
  //   super(props)
  //   this.state = {}
  // }

  render() {
    let body
    const {
      promise,
    } = this.props

    // console.log(promise)

    if (promise === {}) {
      body = <span />
    }

    if (promise.pending) {
      body = <CircularProgress />
    }

    if (promise.rejected) {
      body = (
        <div>
          <Typography
            color="error"
          >
            Une erreur est survenue
          </Typography>
          <Typography> {promise.reason.origin}</Typography>
        </div>
      )
    }

    if (promise.fulfilled) {
      body = (
        <Typography
          color="primary"
        >
          Opération réussie !
        </Typography>)
    }

    return (
      <div>
        {body}
      </div>
    )
  }
}

export default ScriptStatus
