import React from 'react'
import PropTypes from 'prop-types'
import find from 'lodash/find'
import findIndex from 'lodash/findIndex'
import get from 'lodash/get'
import styled from 'styled-components'

import ExpansionPanel from 'material-ui/core/ExpansionPanel'
import ExpansionPanelSummary from 'material-ui/core/ExpansionPanelSummary'
import ExpansionPanelDetails from 'material-ui/core/ExpansionPanelDetails'
import Typography from 'material-ui/core/Typography'
import Switch from 'material-ui/core/Switch'
import TextField from 'material-ui/core/TextField'
import FormGroup from 'material-ui/core/FormGroup'
import FormControlLabel from 'material-ui/core/FormControlLabel'
import ExpandMoreIcon from 'material-ui/icons/ExpandMore'
import Button from 'material-ui/core/Button'
import Snackbar from 'material-ui/core/Snackbar'
import IconButton from 'material-ui/core/IconButton'
import CloseIcon from 'material-ui/icons/Close'

const providersList = [
  'twitter',
  'facebook',
  'youtube',
  'itunes',
  'animateur',
]
const Form = styled.form`
  && {
    width: 100%;
    margin-top: 15px;
    overflowX: auto;
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
const MainDiv = styled.div`
  && {
    margin: 15px;
  }
`

function getFirstDay() {
  const today = new Date()

  return new Date(Date.UTC(today.getFullYear(), today.getMonth(), 1))
}

class PodcastForm extends React.Component {
  // TODO: notify when saved & update form with excel with data
  static propTypes = {
    isPending: PropTypes.bool,
    isUpdated: PropTypes.bool,
    updatePodcast: PropTypes.func.isRequired,
  }

  static defaultProps = {
    isPending: false,
    isUpdated: false,
  }
  constructor(props) {
    super(props)

    const podcast = get(props, 'podcast', {})

    this.state = {
      ...podcast,
      open: props.isUpdated,
    }
  }

  componentDidMount() {
    const today = new Date()
    const firstDay = new Date(Date.UTC(today.getFullYear(), today.getMonth(), 1)).toISOString()
    const podcast = get(this.props, 'podcast', {})

    this.setState({ // eslint-disable-line
      itunesData: find(get(podcast, 'itunes.data', []), (data) => data.date === firstDay) || {
        date: firstDay,
      },
      twitterData: find(get(podcast, 'twitter.data', []), (data) => data.date === firstDay) || {
        date: firstDay,
      },
      youtubeData: find(get(podcast, 'youtube.data', []), (data) => data.date === firstDay) || {
        date: firstDay,
      },
      animateurData: find(get(podcast, 'animateur.data', []), (data) => data.date === firstDay) || {
        date: firstDay,
      },
      facebookData: find(get(podcast, 'facebook.data', []), (data) => data.date === firstDay) || {
        date: firstDay,
      },
    })
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    })
  }

  handleCheck = (checkedInput) => {
    this.setState({
      [checkedInput]: !this.state.checkedInput,
    })
  }

  handleProviderDataDate = (provider, event) => {
    const date = new Date(event.target.value)
    const firstDay = new Date(Date.UTC(date.getFullYear(), date.getMonth(), 1)).toISOString()

    this.setState({
      [`${provider}Data`]: find(this.state[provider].data, (data) => data.date === firstDay) || {
        date: firstDay,
      },
    })
  }

  handleProviderData = (provider, event) => {
    const providerData = get(this.state, `${provider}Data`, {})

    this.setState({
      [`${provider}Data`]: {
        ...providerData,
        [event.target.name]: event.target.value,
      },
    })
  }

  saveProviderData = (provider) => {
    const providerDataArray = get(this.state, `${provider}.data`, [])
    const providerData = get(this.state, `${provider}Data`, {})
    const oldDataIndex = findIndex(get(this.state, `${provider}.data`, []), (data) => data.date === providerData.date)

    if (oldDataIndex > -1) {
      providerDataArray[oldDataIndex] = providerData
    } else {
      providerDataArray.push(providerData)
    }

    this.setState({
      [provider]: {
        ...this.state[provider],
        data: providerDataArray,
      },
      openRecord: true,
    })
  }

  handleClose = () => {
    this.setState({
      open: false,
      openRecord: false,
    })
  }

  handleSave = () => {
    const podcast = this.state
    const {
      updatePodcast,
    } = this.props

    providersList.forEach((value) => {
      delete podcast[`${value}Data`]

      if (podcast[`${value}`]) {
        podcast[`${value}`].id = podcast[`${value}`]._id // eslint-disable-line
        delete podcast[`${value}`]._id // eslint-disable-line
        podcast[value].data.forEach((data) => {
          if (data._id) { // eslint-disable-line
            data.id = data._id // eslint-disable-line
            delete data._id // eslint-disable-line
          }
        })
      }
    })

    delete podcast.open
    delete podcast.uuid

    podcast.id = podcast._id // eslint-disable-line
    delete podcast._id  // eslint-disable-line

    console.log('podcast:', podcast)
    updatePodcast(podcast)
  }

  render() {
    const ProviderDataArray = providersList.map((provider) =>
      (
        <ExpansionPanel key={provider}>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography
              variant="title"
            >
              {provider[0].toUpperCase() + provider.slice(1)} stats
            </Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Form>
              <FormGroup>
                <TextField
                  name={`${provider}.url`}
                  fullWidth
                  label="URL"
                  value={get(this.state, `${provider}.url`, '')}
                  onChange={this.handleChange}
                  margin="normal"
                />
                <TextField
                  name={`${provider}.slug`}
                  fullWidth
                  label="Slug"
                  value={get(this.state, `${provider}.slug`, '')}
                  onChange={this.handleChange}
                  margin="normal"
                />
              </FormGroup>
              <TextField
                name="date"
                label="Date"
                type="date"
                value={get(this.state, `${provider}Data.date`, getFirstDay().toISOString()).split('T')[0]}
                onChange={(event) => this.handleProviderDataDate(`${provider}`, event)}
                margin="normal"
              />
              <LineForm>
                <TextField
                  name="lastRelease"
                  label="Dernière parution"
                  type="date"
                  value={get(this.state, `${provider}Data.lastRelease`, ' ').split('T')[0]}
                  onChange={(event) => this.handleProviderData(`${provider}`, event)}
                  margin="normal"
                />
                <TextField
                  name="trackCount"
                  label="Track Count"
                  value={get(this.state, `${provider}Data.trackCount`, '')}
                  onChange={(event) => this.handleProviderData(`${provider}`, event)}
                  margin="normal"
                />
                <TextField
                  name="ratingCount"
                  label="Rating Count"
                  value={get(this.state, `${provider}Data.ratingCount`, '')}
                  onChange={(event) => this.handleProviderData(`${provider}`, event)}
                  margin="normal"
                />
                <TextField
                  name="frequency"
                  label="Fréquence"
                  value={get(this.state, `${provider}Data.frequency`, '')}
                  onChange={(event) => this.handleProviderData(`${provider}`, event)}
                  margin="normal"
                />
                <TextField
                  name="follower"
                  label="Followers"
                  value={get(this.state, `${provider}Data.follower`, '')}
                  onChange={(event) => this.handleProviderData(`${provider}`, event)}
                  margin="normal"
                />
              </LineForm>
              <Button
                variant="flat"
                color="secondary"
                onClick={() => this.saveProviderData(`${provider}`)}
              >
                Sauvegarder enregistrement
              </Button>
            </Form>
          </ExpansionPanelDetails>
        </ExpansionPanel>
      ))

    return (
      <MainDiv>
        <ExpansionPanel>
          <ExpansionPanelSummary defaultexpanded="true" expandIcon={<ExpandMoreIcon />}>
            <Typography
              variant="title"
            >
              Information générale
            </Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Form>
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
                  name="slug"
                  label="Slug"
                  value={this.state.slug}
                  onChange={this.handleChange}
                  fullWidth
                  margin="normal"
                />
                <MargedTextField
                  name="region"
                  label="Region"
                  value={this.state.region}
                  onChange={this.handleChange}
                  fullWidth
                  margin="normal"
                />
                <MargedTextField
                  name="producers"
                  label="Producteurs"
                  value={this.state.producers}
                  onChange={this.handleChange}
                  fullWidth
                  margin="normal"
                />
              </LineForm>
              <FormGroup>
                <TextField
                  name="description"
                  label="Description"
                  multiline
                  value={this.state.description}
                  onChange={this.handleChange}
                  margin="normal"
                />
              </FormGroup>
              <FormGroup>
                <FormControlLabel
                  control={
                    <Switch
                      checked={this.state.haveWomen}
                      onChange={() => this.handleCheck('haveWomen')}
                      value="haveWomen"
                    />
                  }
                  label="Femme dans le podcast"
                />
                <FormControlLabel
                  control={
                    <Switch
                      checked={this.state.haveLeadWomen}
                      onChange={() => this.handleCheck('haveLeadWomen')}
                      value="haveLeadWomen"
                      color="primary"
                    />
                  }
                  label="Femme en charge du podcast"
                />
              </FormGroup>
            </Form>
          </ExpansionPanelDetails>
        </ExpansionPanel>
        {ProviderDataArray}
        <Button
          color="primary"
          onClick={this.handleSave}
          disabled={this.props.isPending}
        >
          Sauvegarder toutes les modifications
        </Button>
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
        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          open={this.state.openRecord}
          autoHideDuration={2000}
          onClose={this.handleClose}
          ContentProps={{
            'aria-describedby': 'message-id',
          }}
          message={<span id="message-id">Saisie prête pour la sauvegarde</span>}
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

export default PodcastForm
