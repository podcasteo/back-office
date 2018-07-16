import React from 'react'
import PropTypes from 'prop-types'

import CircularProgress from 'material-ui/core/CircularProgress'
import Typography from 'material-ui/core/Typography'

export default class Loading extends React.Component {
  static propTypes = {
    message: PropTypes.string,
  };

  static defaultProps = {
    message: 'Loading',

  }
  render() {
    return (
      <div>
        <Typography>
          {this.props.message}
        </Typography>
        <CircularProgress size={50} />
      </div>
    )
  }
}
