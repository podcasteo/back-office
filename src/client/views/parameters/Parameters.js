import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import MainLayout from 'client/components/MainLayout'
import ParameterForm from 'client/components/ParameterForm'
import ErrorMessage from 'client/components/ErrorMessage'
import Loading from 'client/components/Loading'

const MainDiv = styled.div`
  && {
    height:100%;
    display:flex;
    align-items: center;
    justify-content: center;
  }
`

class Parameters extends React.Component {
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
      updateParameters,
      updateParametersPromise,
    } = this.props
    let body

    if (!parametersPromise || parametersPromise.pending) {
      body = (
        <MainDiv>
          <Loading
            message="Chargement des parametres"
          />
        </MainDiv>
      )
    } else if (parametersPromise.rejected) {
      body = (
        <MainDiv>
          <ErrorMessage
            {
              ...{
                error: {
                  message: 'Impossible de charger le podcast',
                  reason: parametersPromise.reason,
                },
              }
            }
          />
        </MainDiv>)
    } else if (updateParametersPromise.fulfilled) {
      body = (<ParameterForm
        parameters={updateParametersPromise.value}
        updateParameters={updateParameters}
        updateParametersPromise={updateParametersPromise}
      />)
    } else {
      body = (
        <ParameterForm
          parameters={parametersPromise.value}
          updateParameters={updateParameters}
          updateParametersPromise={updateParametersPromise}
        />)
    }

    return (
      <MainLayout>
        {body}
      </MainLayout>
    )
  }
}

export default Parameters
