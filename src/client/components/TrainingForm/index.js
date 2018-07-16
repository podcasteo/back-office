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
const ButtonDiv = styled.div`
  &&{
    display:flex;
    align-items: center;
    justify-content: center;
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
// const MyButton = styled(Button)`
//   &&{
//     width: 50px;
//   }
// `

class TrainingForm extends React.Component {
  // TODO: notify when saved & update form with excel with data
  static propTypes = {
    isUpdated: PropTypes.bool,
    updateTraining: PropTypes.func.isRequired,
  }

  static defaultProps = {
    isUpdated: false,
  }
  constructor(props) {
    super(props)

    const training = get(props, 'training', {})

    this.state = {
      open: props.isUpdated,
      ...training,
    }
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    })
  }

  handleClose = () => {
    this.setState({
      open: false,
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
          <ButtonDiv>
            <Button
              color="primary"
              variant="raised"
              onClick={this.handleSave}
            >
              Sauvegarder toutes les modifications
            </Button>
          </ButtonDiv>
        </MainPaper>
        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          open={this.state.open}
          autoHideDuration={3000}
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
