import React from 'react'
import PropTypes from 'prop-types'

import MainLayout from 'client/components/MainLayout'
import ParameterForm from 'client/components/ParameterForm'

class NotFound extends React.Component {
  static propTypes = {
    parametersPromise: PropTypes.object.isRequired,
    getParameters: PropTypes.func.isRequired,
    updateParameters: PropTypes.func.isRequired,
    updateParametersPromise: PropTypes.object,
  }
  static defaultProps = {
    updateParametersPromise: {},
  }

  render() {
    const {
      parametersPromise,
      getParameters,
      updateParameters,
      updateParametersPromise,
    } = this.props
    let body

    if (!updateParameters || updateParameters.pending) {
      body = <div> Updating Podcast... </div>
    } else if (updateParameters.rejected) {
      console.log('Error updating parameters:', updateParameters.reason)
      body = <div> Error updating parameters !</div>
    } else if (!parametersPromise || parametersPromise.pending) {
      body = <div> Loading Podcast... </div>
    } else if (parametersPromise.rejected) {
      console.log('Error loading parameters:', parametersPromise.reason)
      body = <div> Error loading parameters ! </div>
    } else {
      body = (
        <ParameterForm
          parameters={parametersPromise.value}
          getParameters={getParameters}
          updateParameters={updateParameters}
          isPending={updateParametersPromise ? updateParametersPromise.pending : false}
        />)
    }

    return (
      <MainLayout>
        {body}
      </MainLayout>
    )
  }
}

export default NotFound
