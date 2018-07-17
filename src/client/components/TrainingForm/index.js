import React from 'react'
import PropTypes from 'prop-types'
import get from 'lodash/get'
import styled from 'styled-components'

import Typography from 'material-ui/core/Typography'
import Paper from 'material-ui/core/Paper'
import TextField from 'material-ui/core/TextField'
import FormGroup from 'material-ui/core/FormGroup'
import Button from 'material-ui/core/Button'
import FetchStatus from 'client/components/FetchStatus'

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
    align-items: center;
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

class TrainingForm extends React.Component {
  // TODO: notify when saved & update form with excel with data
  static propTypes = {
    updateTraining: PropTypes.func.isRequired,
    updateTrainingPromise: PropTypes.object.isRequired,
  }

  constructor(props) {
    super(props)

    const training = get(props, 'training', {})

    this.state = {
      ...training,
    }
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    })
  }

  handleSave = () => {
    const training = this.state
    const {
      updateTraining,
    } = this.props

    training.id = training._id // eslint-disable-line
    delete training._id  // eslint-disable-line
    updateTraining(training)
  }

  render() {
    return (
      <MainDiv>
        <MainPaper>
          <Typography
            variant="title"
          >
            Informations générales
          </Typography>
          <FormGroup>
            <TextField
              fullwidth="true"
              name="name"
              label="Nom"
              value={this.state.name}
              onChange={this.handleChange}
              margin="normal"
            />
          </FormGroup>
          <LineForm>
            <TextField
              name="producer"
              label="Producteur"
              value={this.state.producer}
              onChange={this.handleChange}
              fullWidth
              margin="normal"
            />
            <MargedTextField
              name="age"
              label="Age"
              type="number"
              value={this.state.age}
              onChange={this.handleChange}
              fullWidth
              margin="normal"
            />
            <MargedTextField
              name="frequency"
              label="Fréquence"
              type="number"
              value={this.state.frequency}
              onChange={this.handleChange}
              fullWidth
              margin="normal"
            />
          </LineForm>
          <MargedTypography
            variant="title"
          >
            Data
          </MargedTypography>
          <LineForm>
            <TextField
              name="nb_avis"
              label="Nombre d'avis"
              type="number"
              fullWidth
              value={this.state.nb_avis}
              onChange={this.handleChange}
              margin="normal"
            />
            <MargedTextField
              name="affiliation"
              label="Affiliation"
              type="number"
              fullWidth
              value={this.state.affiliation}
              onChange={this.handleChange}
              margin="normal"
            />
            <MargedTextField
              name="likes_fb"
              label="Likes Facebook"
              type="number"
              fullWidth
              value={this.state.likes_fb}
              onChange={this.handleChange}
              margin="normal"
            />
            <MargedTextField
              name="follow_twitter"
              label="Follower Twitter"
              type="number"
              fullWidth
              value={this.state.follow_twitter}
              onChange={this.handleChange}
              margin="normal"
            />
            <MargedTextField
              name="follow_animateur"
              label="Follower Animateur"
              type="number"
              fullWidth
              value={this.state.follow_animateur}
              onChange={this.handleChange}
              margin="normal"
            />
          </LineForm>
          <LastButtonAndStatus>
            <Button
              color="primary"
              variant="raised"
              onClick={this.handleSave}
            >
              Sauvegarder toutes les modifications
            </Button>
            <FetchStatus
              promise={this.props.updateTrainingPromise}
            />
          </LastButtonAndStatus>
        </MainPaper>
      </MainDiv>
    )
  }
}

export default TrainingForm
