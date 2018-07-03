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
import TextField from 'material-ui/core/TextField'
import Chip from 'material-ui/core/Chip'
import ExpandMoreIcon from 'material-ui/icons/ExpandMore'
import Button from 'material-ui/core/Button'

const Form = styled.form`
  && {
    width: 100%;
    margin-top: 15px;
    overflowX: auto;
  }
`

class PodcastForm extends React.Component {
  // TODO: bug producers & API bug header url when save
  static propTypes = {
    // podcast: PropTypes.object.isRequired,
    // getPodcast: PropTypes.func.isRequired,
    updatePodcast: PropTypes.func.isRequired,
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

  handleDelete = (data) => () => {
    const producers = [
      ...this.state.producers,
    ]
    const chipToDelete = producers.indexOf(data)

    producers.splice(chipToDelete, 1)
    this.setState({
      producers,
    })
  }

  handleChange = (event) => {
    if (event.target.name === 'producers') {
      const producers = [
        ...this.state.producers,
      ]

      producers.push(event.target.value)
      this.setState({
        producers,
      })
    } else {
      this.setState({
        [event.target.name]: event.target.value,
      })
    }
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
      <div>
        <ExpansionPanel>
          <ExpansionPanelSummary defaultexpanded="true" expandIcon={<ExpandMoreIcon />}>
            <Typography> Information générale </Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Form>
              <TextField
                fullwidth="true"
                name="name"
                label="Nom"
                value={this.state.name}
                onChange={this.handleChange}
                margin="normal"
              />
              <TextField
                fullwidth="true"
                name="slug"
                label="Slug"
                value={this.state.slug}
                onChange={this.handleChange}
                margin="normal"
              />
              <TextField
                name="email"
                label="Email"
                value={this.state.email}
                onChange={this.handleChange}
                margin="normal"
              />
              <TextField
                name="description"
                label="Description"
                value={this.state.description}
                onChange={this.handleChange}
                margin="normal"
              />
              <TextField
                name="logo"
                label="Logo URL"
                value={this.state.logo}
                onChange={this.handleChange}
                margin="normal"
              />
              <TextField
                name="region"
                label="Logo URL"
                value={this.state.region}
                onChange={this.handleChange}
                margin="normal"
              />
              <TextField
                name="woman"
                label="Woman"
                value={this.state.woman}
                onChange={this.handleChange}
                margin="normal"
              />
              <Typography>
                Producers
              </Typography>
              <TextField
                name="producers"
                label="Add producers"
                onChange={this.handleChange}
                margin="normal"
              />
              {this.state.producers.map((data) => (
                <Chip
                  key={data}
                  label={data}
                  onDelete={this.handleDelete(data)}
                />
                ))}
            </Form>
          </ExpansionPanelDetails>
        </ExpansionPanel>
        <ExpansionPanel>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>Itunes stats</Typography>
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
            <Typography> Soundcloud Stats</Typography>
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
            <Typography> Youtube Stats</Typography>
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
        >
          Sauvegarder toutes les modifications
        </Button>
      </div>
    )
  }
}

export default PodcastForm
