import React from 'react'
import PropTypes from 'prop-types'
import get from 'lodash/get'
import styled from 'styled-components'

import FetchStatus from 'client/components/FetchStatus'
import TextField from 'material-ui/core/TextField'
import Typography from 'material-ui/core/Typography'
import FormGroup from 'material-ui/core/FormGroup'
import Button from 'material-ui/core/Button'
import Paper from 'material-ui/core/Paper'

const MainDiv = styled.div`
  && {
    display: flex;
    justify-content: center;
  }
`
const MainPaper = styled(Paper)`
  && {
    margin: 15px;
    padding: 15px;
    display:flex;
    flex-direction: column;
  }
`
const LastButtonAndStatus = styled.div`
  && {
    display:flex;
    align-items: center;
    justify-content: space-between
  }
`
const LineForm = styled.div`
  &&{
    display:flex;
  }
`
const MargedTextField = styled(TextField)`
  &&{
    margin-left:15px;
  }
`
const MargedTypography = styled(Typography)`
  &&{
    margin-top:15px;
  }
`

class ParameterForm extends React.Component {
  // TODO: notify when saved & update form with excel with data
  static propTypes = {
    updateParameters: PropTypes.func.isRequired,
    updateParametersPromise: PropTypes.object.isRequired,
  }

  constructor(props) {
    super(props)

    const parameters = get(this.props, 'parameters')

    parameters.audiences_step = get(parameters, 'audiences_step', '').toString()
    parameters.network_step = get(parameters, 'network_step', '').toString()
    parameters.itunes_step = get(parameters, 'itunes_step', '').toString()
    parameters.frequency_step = get(parameters, 'frequency_step', '').toString()

    this.state = {
      ...parameters,
    }
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    })
  }

  handleSave = () => {
    const parameters = this.state
    const {
      updateParameters,
    } = this.props
    const keys = Object.keys(parameters)
    const parsedParam = {}

    keys.forEach((key) => {
      if (!key.includes('step')) {
        parsedParam[key] = parameters[key]

        return
      }

      const valueArray = parameters[key].split(',')
      const parsed = []
      let tmp

      for (let i = 0; i < valueArray.length; i++) {
        tmp = parseFloat(valueArray[i])

        if (!Number.isNaN(tmp)) {
          parsed.push(tmp)
        }
      }

      parsedParam[key] = parsed
    })
    updateParameters(parsedParam)
  }

  render() {
    return (
      <MainDiv>
        <MainPaper>
          <Typography
            variant="title"
          >
            Coefficients audience
          </Typography>
          <LineForm>
            <TextField
              fullwidth="true"
              type="number"
              name="coeff_audience_itunes"
              label="coeff_audience_itunes"
              value={this.state.coeff_audience_itunes}
              onChange={this.handleChange}
              margin="normal"
            />
            <MargedTextField
              fullwidth="true"
              type="number"
              name="coeff_audience_affiliation"
              label="coeff_audience_affiliation"
              value={this.state.coeff_audience_affiliation}
              onChange={this.handleChange}
              margin="normal"
            />
            <MargedTextField
              fullwidth="true"
              type="number"
              name="coeff_audience_reseaux"
              label="coeff_audience_reseaux"
              value={this.state.coeff_audience_reseaux}
              onChange={this.handleChange}
              margin="normal"
            />
          </LineForm>
          <MargedTypography
            variant="title"
          >
            Coefficients ranking
          </MargedTypography>
          <LineForm>
            <TextField
              fullwidth="true"
              type="number"
              name="coeff_ranking_audience"
              label="coeff_ranking_audience"
              value={this.state.coeff_ranking_audience}
              onChange={this.handleChange}
              margin="normal"
            />
            <MargedTextField
              type="number"
              fullwidth="true"
              name="coeff_ranking_itunes"
              label="coeff_ranking_itunes"
              value={this.state.coeff_ranking_itunes}
              onChange={this.handleChange}
              margin="normal"
            />
            <MargedTextField
              type="number"
              fullwidth="true"
              name="coeff_ranking_facebook"
              label="coeff_ranking_facebook"
              value={this.state.coeff_ranking_facebook}
              onChange={this.handleChange}
              margin="normal"
            />
          </LineForm>
          <LineForm>
            <MargedTextField
              fullwidth="true"
              type="number"
              name="coeff_ranking_twitter"
              label="coeff_ranking_twitter"
              value={this.state.coeff_ranking_twitter}
              onChange={this.handleChange}
              margin="normal"
            />
            <MargedTextField
              fullwidth="true"
              type="number"
              name="coeff_ranking_twitter_anim"
              label="coeff_ranking_twitter_anim"
              value={this.state.coeff_ranking_twitter_anim}
              onChange={this.handleChange}
              margin="normal"
            />
          </LineForm>
          <MargedTypography
            variant="title"
          >
            Coefficients trainee
          </MargedTypography>
          <LineForm>
            <TextField
              fullwidth="true"
              type="number"
              name="coeff_trainee_audience"
              label="coeff_trainee_audience"
              value={this.state.coeff_trainee_audience}
              onChange={this.handleChange}
              margin="normal"
            />
            <MargedTextField
              fullwidth="true"
              type="number"
              name="coeff_trainee_episodes"
              label="coeff_trainee_episodes"
              value={this.state.coeff_trainee_episodes}
              onChange={this.handleChange}
              margin="normal"
            />
            <MargedTextField
              fullwidth="true"
              name="coeff_trainee_age"
              type="number"
              label="coeff_trainee_age"
              value={this.state.coeff_trainee_age}
              onChange={this.handleChange}
              margin="normal"
            />
            <MargedTextField
              fullwidth="true"
              type="number"
              name="coeff_trainee_const"
              label="coeff_trainee_const"
              value={this.state.coeff_trainee_const}
              onChange={this.handleChange}
              margin="normal"
            />
          </LineForm>
          <MargedTypography
            variant="title"
          >
            Paliers
          </MargedTypography>
          <FormGroup>
            <TextField
              fullwidth="true"
              name="audiences_step"
              label="audiences_step"
              value={this.state.audiences_step}
              onChange={this.handleChange}
              margin="normal"
            />
          </FormGroup>
          <FormGroup>
            <TextField
              fullwidth="true"
              name="frequency_step"
              label="frequency_step"
              value={this.state.frequency_step}
              onChange={this.handleChange}
              margin="normal"
            />
          </FormGroup>
          <FormGroup>
            <TextField
              fullwidth="true"
              name="itunes_step"
              label="itunes_step"
              value={this.state.itunes_step}
              onChange={this.handleChange}
              margin="normal"
            />
          </FormGroup>
          <FormGroup>
            <TextField
              fullwidth="true"
              name="network_step"
              label="network_step"
              value={this.state.network_step}
              onChange={this.handleChange}
              margin="normal"
            />
          </FormGroup>
          <LastButtonAndStatus>
            <Button
              color="primary"
              onClick={this.handleSave}
            >
              Sauvegarder les modifications
            </Button>
            <FetchStatus
              promise={this.props.updateParametersPromise}
            />
          </LastButtonAndStatus>
        </MainPaper>
      </MainDiv>
    )
  }
}

export default ParameterForm
