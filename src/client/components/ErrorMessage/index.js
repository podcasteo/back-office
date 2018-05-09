import React from 'react'
import PropTypes from 'prop-types'

export default class ErrorMessage extends React.Component {
  static propTypes = {
    error: PropTypes.object,
  };

  static defaultProps = {
    error: {
      message: 'Error',
    },
  }

  render() {
    const {
      error,
    } = this.props

    return (
      <div className="error-message">
        {error.message}
      </div>
    )
  }
}
