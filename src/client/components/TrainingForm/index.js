import React from 'react'
import PropTypes from 'prop-types'
import get from 'lodash/get'
import styled from 'styled-components'

import Typography from 'material-ui/core/Typography'
import Paper from 'material-ui/core/Paper'
import TextField from 'material-ui/core/TextField'
import FormGroup from 'material-ui/core/FormGroup'
import Button from 'material-ui/core/Button'
import Snackbar from 'material-ui/core/Snackbar'
import IconButton from 'material-ui/core/IconButton'
import CloseIcon from 'material-ui/icons/Close'

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
    isPending: PropTypes.bool,
    isUpdated: PropTypes.bool,
    updateTraining: PropTypes.func.isRequired,
  }

  static defaultProps = {
    isPending: false,
    isUpdated: false,
  }
  constructor(props) {
    super(props)

    const training = get(this.props, 'training', {})

    console.log('propsTrainForm:', props.isUpdated)

    this.state = {
      ...training,
      open: props.isUpdated,
    }
  }

  handleClose = () => {
    this.setState({
      open: false,
    })
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
            Information générale
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
              value={this.state.age}
              onChange={this.handleChange}
              fullWidth
              margin="normal"
            />
            <MargedTextField
              name="frequency"
              label="Fréquence"
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
              fullWidth
              value={this.state.nb_avis}
              onChange={this.handleChange}
              margin="normal"
            />
            <MargedTextField
              name="affiliation"
              label="Affiliation"
              fullWidth
              value={this.state.affiliation}
              onChange={this.handleChange}
              margin="normal"
            />
            <MargedTextField
              name="likes_fb"
              label="Likes Facebook"
              fullWidth
              value={this.state.likes_fb}
              onChange={this.handleChange}
              margin="normal"
            />
            <MargedTextField
              name="follow_twitter"
              label="Follower Twitter"
              fullWidth
              value={this.state.follow_twitter}
              onChange={this.handleChange}
              margin="normal"
            />
            <MargedTextField
              name="follow_animateur"
              label="Follower Animateur"
              fullWidth
              value={this.state.follow_animateur}
              onChange={this.handleChange}
              margin="normal"
            />
          </LineForm>
          <Button
            color="primary"
            onClick={this.handleSave}
            disabled={this.props.isPending}
          >
            Sauvegarder toutes les modifications
          </Button>
        </MainPaper>
        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          open={this.state.open}
          autoHideDuration={6000}
          onClose={this.handleClose}
          ContentProps={{
            'aria-describedby': 'message-id',
          }}
          message={<span id="message-id">Modification enregistrée</span>}
          action={[
            <IconButton
              key="close"
              aria-label="Close"
              color="inherit"
              onClick={this.handleClose}
            >
              <CloseIcon />
            </IconButton>,
          ]}
        />
      </MainDiv>
    )
  }
}

export default TrainingForm
