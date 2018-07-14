import React from 'react'
import PropTypes from 'prop-types'
import get from 'lodash/get'
import styled from 'styled-components'

import Loading from 'client/components/Loading'
import ErrorMessage from 'client/components/ErrorMessage'
import MainLayout from 'client/components/MainLayout'
import TrainingList from 'client/components/TrainingList'

const MainDiv = styled.div`
  && {
    height:100%;
    display:flex;
    align-items: center;
    justify-content: center;
  }
`

class Home extends React.Component {
  static propTypes = {
    trainingListPromise: PropTypes.object.isRequired,
    getTrainingList: PropTypes.func.isRequired,
  }

  render() {
    const {
      trainingListPromise,
      getTrainingList,
    } = this.props
    let body

    if (!trainingListPromise || trainingListPromise.pending) {
      body = (
        <MainDiv>
          <Loading
            message="Loading Training dataset"
          />
        </MainDiv>
      )
    } else if (trainingListPromise.rejected) {
      body = (
        <MainDiv>
          <ErrorMessage
            {
              ...{
                error: {
                  message: 'Impossible de charger le training set',
                  reason: trainingListPromise.reason,
                },
              }
            }
          />
        </MainDiv>)
    } else {
      body = (<TrainingList
        trainings={get(trainingListPromise, 'value', {})}
        getTrainingList={getTrainingList}
      />)
    }

    return (
      <MainLayout>
        {body}
      </MainLayout>
    )
  }
}

export default Home
