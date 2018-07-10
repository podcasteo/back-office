import React from 'react'
import PropTypes from 'prop-types'
import get from 'lodash/get'
import styled from 'styled-components'

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
const MargedTypographie = styled(Typography)`
  &&{
    margin-top:15px;
  }
`

class PodcastForm extends React.Component {
  // TODO: notify when saved & update form with excel with data
  static propTypes = {
    isPending: PropTypes.bool,
    updateParameters: PropTypes.func.isRequired,
  }

  static defaultProps = {
    isPending: false,
  }
  constructor(props) {
    super(props)

    const parameters = get(this.props, 'parameters', {})

    this.state = {
      ...parameters,
    }
    console.log(this.state)
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

    updateParameters(parameters)
  }

  render() {
    console.log('Test:', this.props.isPending)

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
              name="coeff_audience_itunes"
              label="coeff_audience_itunes"
              value={this.state.coeff_audience_itunes}
              onChange={this.handleChange}
              margin="normal"
            />
            <MargedTextField
              fullwidth="true"
              name="coeff_audience_affiliation"
              label="coeff_audience_affiliation"
              value={this.state.coeff_audience_affiliation}
              onChange={this.handleChange}
              margin="normal"
            />
            <MargedTextField
              fullwidth="true"
              name="coeff_audience_reseaux"
              label="coeff_audience_reseaux"
              value={this.state.coeff_audience_reseaux}
              onChange={this.handleChange}
              margin="normal"
            />
          </LineForm>
          <MargedTypographie
            variant="title"
          >
            Coefficients ranking
          </MargedTypographie>
          <LineForm>
            <TextField
              fullwidth="true"
              name="coeff_ranking_audience"
              label="coeff_ranking_audience"
              value={this.state.coeff_ranking_audience}
              onChange={this.handleChange}
              margin="normal"
            />
            <MargedTextField
              fullwidth="true"
              name="coeff_ranking_twitter"
              label="coeff_ranking_twitter"
              value={this.state.coeff_ranking_twitter}
              onChange={this.handleChange}
              margin="normal"
            />
            <MargedTextField
              fullwidth="true"
              name="coeff_ranking_facebook"
              label="coeff_ranking_facebook"
              value={this.state.coeff_ranking_facebook}
              onChange={this.handleChange}
              margin="normal"
            />
            <MargedTextField
              fullwidth="true"
              name="coeff_ranking_twitter_anim"
              label="coeff_ranking_twitter_anim"
              value={this.state.coeff_ranking_twitter_anim}
              onChange={this.handleChange}
              margin="normal"
            />
          </LineForm>
          <MargedTypographie
            variant="title"
          >
            Coefficients trainee
          </MargedTypographie>
          <LineForm>
            <TextField
              fullwidth="true"
              name="coeff_trainee_audience"
              label="coeff_trainee_audience"
              value={this.state.coeff_trainee_audience}
              onChange={this.handleChange}
              margin="normal"
            />
            <MargedTextField
              fullwidth="true"
              name="coeff_trainee_episodes"
              label="coeff_trainee_episodes"
              value={this.state.coeff_trainee_episodes}
              onChange={this.handleChange}
              margin="normal"
            />
            <MargedTextField
              fullwidth="true"
              name="coeff_trainee_age"
              label="coeff_trainee_age"
              value={this.state.coeff_trainee_age}
              onChange={this.handleChange}
              margin="normal"
            />
            <MargedTextField
              fullwidth="true"
              name="coeff_trainee_const"
              label="coeff_trainee_const"
              value={this.state.coeff_trainee_const}
              onChange={this.handleChange}
              margin="normal"
            />
          </LineForm>
          <MargedTypographie
            variant="title"
          >
            Paliers
          </MargedTypographie>
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
          <Button
            color="primary"
            onClick={this.handleSave}
            disabled={this.props.isPending}
          >
            Sauvegarder toutes les modifications
          </Button>
        </MainPaper>
      </MainDiv>
    )
  }
}

export default PodcastForm
