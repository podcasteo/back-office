import React from 'react'
import PropTypes from 'prop-types'

import MainLayout from 'client/components/MainLayout'
import PodcastForm from 'client/components/PodcastForm'

class Podcast extends React.Component {
  static propTypes = {
    podcastPromise: PropTypes.object.isRequired,
    getPodcast: PropTypes.func.isRequired,
    updatePodcast: PropTypes.func.isRequired,
  }

  render() {
    const {
      podcastPromise,
      getPodcast,
      updatePodcast,
    } = this.props
    let body

    if (!updatePodcast || updatePodcast.pending) {
      body = <div> Updating Podcast... </div>
    } else if (updatePodcast.rejected) {
      console.log('Error updating podcast:', updatePodcast.reason)
      body = <div> Error updating podcast !</div>
    } else if (!podcastPromise || podcastPromise.pending) {
      body = <div> Loading Podcast... </div>
    } else if (podcastPromise.rejected) {
      console.log('Error loading podcast:', podcastPromise.reason)
      body = <div> Error loading podcast ! </div>
    } else {
      body = (<PodcastForm
        podcast={podcastPromise.value}
        getPodcast={getPodcast}
        updatePodcast={updatePodcast}
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
