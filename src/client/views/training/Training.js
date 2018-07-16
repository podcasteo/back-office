import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import Loading from 'client/components/Loading'
import MainLayout from 'client/components/MainLayout'
import TrainingForm from 'client/components/TrainingForm'
import ErrorMessage from 'client/components/ErrorMessage'

const MainDiv = styled.div`
  && {
    height:100%;
    display:flex;
    align-items: center;
    justify-content: center;
  }
`

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
      body = (
        <MainDiv>
          <Loading
            message="Update du podcast de training en cours"
          />
        </MainDiv>
      )
    } else if (updateTrainingPromise.rejected) {
      body = (
        <MainDiv>
          <ErrorMessage
            {
              ...{
                error: {
                  message: 'Impossible de modifier le podcast de training',
                  reason: updateTrainingPromise.reason,
                },
              }
            }
          />
        </MainDiv>)
    } else if (!trainingPromise || trainingPromise.pending) {
      body = (
        <MainDiv>
          <Loading
            message="Chargement du podcast de training"
          />
        </MainDiv>
      )
    } else if (trainingPromise.rejected) {
      body = (
        <MainDiv>
          <ErrorMessage
            {
              ...{
                error: {
                  message: 'Impossible de charger le podcast de training',
                  reason: trainingPromise.reason,
                },
              }
            }
          />
        </MainDiv>)
    } else if (updateTrainingPromise.fulfilled) {
      body = (<TrainingForm
        training={updateTrainingPromise.value}
        updateTraining={updateTraining}
        isUpdated
      />)
    } else {
      body = (<TrainingForm
        training={trainingPromise.value}
        updateTraining={updateTraining}
        isUpdated={false}
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
