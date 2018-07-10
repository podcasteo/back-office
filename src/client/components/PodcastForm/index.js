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

class PodcastForm extends React.Component {
  // TODO: notify when saved & update form with excel with data
  static propTypes = {
    isPending: PropTypes.bool,
    updatePodcast: PropTypes.func.isRequired,
  }

  static defaultProps = {
    isPending: false,
  }
  constructor(props) {
    super(props)

    const today = new Date()
    const firstDay = new Date(Date.UTC(today.getFullYear(), today.getMonth(), 1)).toISOString()
    const podcast = get(this.props, 'podcast', {})

    this.state = {
      ...podcast,
      itunesData: find(get(podcast, 'itunes.data', []), (data) => data.date === firstDay) || {
        date: firstDay,
      },
      soundcloudData: find(get(podcast, 'soundcloud.data', []), (data) => data.date === firstDay) || {
        date: firstDay,
      },
      youtubeData: find(get(podcast, 'youtube.data', []), (data) => data.date === firstDay) || {
        date: firstDay,
      },
    }
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

  handleProdviderDataDate = (provider, event) => {
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
    })
  }

  handleSave = () => {
    const podcast = this.state
    const {
      updatePodcast,
    } = this.props

    delete podcast.itunesData
    delete podcast.soundcloudData
    delete podcast.youtubeData

    updatePodcast(podcast)
  }

  render() {
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
        <ExpansionPanel>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography
              variant="title"
            >
            Itunes stats
            </Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Form>
              <TextField
                name="itunes.url"
                label="URL"
                value={get(this.state, 'itunes.url', '')}
                onChange={this.handleChange}
                margin="normal"
              />
              <TextField
                name="itunes.id"
                label="ID"
                value={get(this.state, 'itunes.id', '')}
                onChange={this.handleChange}
                margin="normal"
              />
              <TextField
                name="date"
                label="Date"
                type="date"
                value={get(this.state, 'itunesData.date', new Date().toISOString()).split('T')[0]}
                onChange={(event) => this.handleProdviderDataDate('itunes', event)}
                margin="normal"
              />
              <div>
                <TextField
                  name="lastRelease"
                  label="Date"
                  type="date"
                  value={get(this.state, 'itunesData.lastRelease', new Date().toISOString()).split('T')[0]}
                  onChange={(event) => this.handleProviderData('itunes', event)}
                  margin="normal"
                />
                <TextField
                  name="trackCount"
                  label="Track Count"
                  value={get(this.state, 'itunesData.trackCount', '')}
                  onChange={(event) => this.handleProviderData('itunes', event)}
                  margin="normal"
                />
                <TextField
                  name="ratingCount"
                  label="Rating Count"
                  value={get(this.state, 'itunesData.ratingCount', '')}
                  onChange={(event) => this.handleProviderData('itunes', event)}
                  margin="normal"
                />
                <TextField
                  name="frequency"
                  label="Fréquence"
                  value={get(this.state, 'itunesData.frequency', '')}
                  onChange={(event) => this.handleProviderData('itunes', event)}
                  margin="normal"
                />
                <Button
                  variant="flat"
                  color="secondary"
                  onClick={() => this.saveProviderData('itunes')}
                >
                  Sauvegarder enregistrement
                </Button>
              </div>
            </Form>
          </ExpansionPanelDetails>
        </ExpansionPanel>
        <ExpansionPanel>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography
              variant="title"
            >
            Soundcloud Stats
            </Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Form>
              <TextField
                name="soundcloud.url"
                label="URL"
                value={get(this.state, 'soundcloud.url', '')}
                onChange={this.handleChange}
                margin="normal"
              />
              <TextField
                name="date"
                label="Date"
                type="date"
                value={get(this.state, 'soundcloudData.date', new Date().toISOString()).split('T')[0]}
                onChange={(event) => this.handleProdviderDataDate('soundcloud', event)}
                margin="normal"
              />
              <div>
                <TextField
                  name="trackCount"
                  label="Track Count"
                  value={get(this.state, 'soundcloudData.trackCount', 0)}
                  onChange={(event) => this.handleProviderData('soundcloud', event)}
                  margin="normal"
                />
                <TextField
                  name="followers"
                  label="Followers"
                  value={get(this.state, 'soundcloudData.followers', 0)}
                  onChange={(event) => this.handleProviderData('soundcloud', event)}
                  margin="normal"
                />
                <Button
                  variant="flat"
                  color="secondary"
                  onClick={() => this.saveProviderData('soundcloud')}
                >
                  Sauvegarder enregistrement
                </Button>
              </div>
            </Form>
          </ExpansionPanelDetails>
        </ExpansionPanel>
        <ExpansionPanel>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography
              variant="title"
            >
              Youtube Stats
            </Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Form>
              <TextField
                name="youtube.url"
                label="URL"
                value={get(this.state, 'youtube.url', '')}
                onChange={this.handleChange}
                margin="normal"
              />
              <TextField
                name="date"
                label="Date"
                type="date"
                value={get(this.state, 'youtubeData.date', new Date().toISOString()).split('T')[0]}
                onChange={(event) => this.handleProdviderDataDate('youtube', event)}
                margin="normal"
              />
              <div>
                <TextField
                  name="followers"
                  label="Followers"
                  value={get(this.state, 'youtubeData.followers', 0)}
                  onChange={(event) => this.handleProviderData('youtube', event)}
                  margin="normal"
                />
                <Button
                  variant="flat"
                  color="secondary"
                  onClick={() => this.saveProviderData('youtube')}
                >
                  Sauvegarder enregistrement
                </Button>
              </div>
            </Form>
          </ExpansionPanelDetails>
        </ExpansionPanel>
        <Button
          color="primary"
          onClick={this.handleSave}
          disabled={this.props.isPending}
        >
          Sauvegarder toutes les modifications
        </Button>
      </MainDiv>
    )
  }
}

export default PodcastForm
