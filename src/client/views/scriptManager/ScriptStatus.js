import React from 'react'
import PropTypes from 'prop-types'
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

    if (promise === {}) {
      body = <span />
    }

    if (promise.pending) {
      body = <div> pending </div>
    }

    if (promise.reject) {
      body = <div> reject </div>
    }

    if (promise.fulfilled) {
      body = <div> fulfilled </div>
    }

    return (
      <div>
        {body}
      </div>
    )
  }
}

export default ScriptStatus
