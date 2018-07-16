import React from 'react'
import PropTypes from 'prop-types'

import MainLayout from 'client/components/MainLayout'
import TrainingForm from 'client/components/TrainingForm'

class Training extends React.Component {
  static propTypes = {
    trainingPromise: PropTypes.object.isRequired,
    updateTraining: PropTypes.func.isRequired,
    updateTrainingPromise: PropTypes.object,
  }

  static defaultProps = {
    updateTrainingPromise: {},
  }

  static prop

  render() {
    const {
      trainingPromise,
      updateTraining,
      updateTrainingPromise,
    } = this.props
    let body

    if (!updateTrainingPromise || updateTrainingPromise.pending) {
      body = <div> Updating Training... </div>
    } else if (updateTrainingPromise.rejected) {
      console.log('Error updating training:', updateTrainingPromise.reason)// eslint-disable-line
      body = <div> Error updating training !</div>
    } else if (!trainingPromise || trainingPromise.pending) {
      body = <div> Loading Training... </div>
    } else if (trainingPromise.rejected) {
      console.log('Error loading training:', trainingPromise.reason)// eslint-disable-line
      body = <div> Error loading training ! </div>
    } else {
      body = (<TrainingForm
        training={trainingPromise.value}
        updateTraining={updateTraining}
        isPending={updateTrainingPromise ? updateTrainingPromise.pending : false}
        isUpdated={updateTrainingPromise ? updateTrainingPromise.fulfilled : false}
      />)
    }

    return (
      <MainLayout>
        {body}
      </MainLayout>
    )
  }
}

export default Training
