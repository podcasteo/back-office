import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import MainLayout from 'client/components/MainLayout'
import PodcastForm from 'client/components/PodcastForm'
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

class Podcast extends React.Component {
  static propTypes = {
    podcastPromise: PropTypes.object.isRequired,
    updatePodcast: PropTypes.func.isRequired,
    updatePodcastPromise: PropTypes.object,
  }

  static defaultProps = {
    updatePodcastPromise: {},
  }

  static prop

  render() {
    const {
      podcastPromise,
      updatePodcast,
      updatePodcastPromise,
    } = this.props
    let body

    if (!updatePodcast || updatePodcast.pending) {
      body = (
        <MainDiv>
          <Loading
            message="Update du podcast en cours"
          />
        </MainDiv>
      )
    } else if (updatePodcast.rejected) {
      body = (
        <MainDiv>
          <ErrorMessage
            {
              ...{
                error: {
                  message: 'Impossible de modifier le podcast de training',
                  reason: updatePodcast.reason,
                },
              }
            }
          />
        </MainDiv>)
    } else if (!podcastPromise || podcastPromise.pending) {
      body = (
        <MainDiv>
          <Loading
            message="Chargement du podcast"
          />
        </MainDiv>
      )
    } else if (podcastPromise.rejected) {
      body = (
        <MainDiv>
          <ErrorMessage
            {
              ...{
                error: {
                  message: 'Impossible de charger le podcast',
                  reason: podcastPromise.reason,
                },
              }
            }
          />
        </MainDiv>)
    } else if (updatePodcastPromise.fulfilled) {
      body = (<PodcastForm
        podcast={updatePodcastPromise.value}
        updatePodcast={updatePodcast}
        updatePodcastPromise={updatePodcastPromise}
      />)
    } else {
      body = (<PodcastForm
        podcast={podcastPromise.value}
        updatePodcast={updatePodcast}
        updatePodcastPromise={updatePodcastPromise}
      />)
    }

    return (
      <MainLayout>
        {body}
      </MainLayout>
    )
  }
}

export default Podcast
