import React from 'react'
import PropTypes from 'prop-types'
import get from 'lodash/get'

import MainLayout from 'client/components/MainLayout'
import PodcastList from 'client/components/PodcastList'

class Home extends React.Component {
  static propTypes = {
    podcastListPromise: PropTypes.object.isRequired,
    // getPodcastList: PropTypes.func.isRequired,
  }

  render() {
    const {
      podcastListPromise,
    } = this.props
    let body

    if (!podcastListPromise || podcastListPromise.pending) {
      body = <div> Loading Podcast... </div>
    } else if (podcastListPromise.rejected) {
      console.log('Error loading podcast:', podcastListPromise.reason)
      body = <div> Error loading podcast ! </div>
    } else {
      body = (<PodcastList
        podcasts={get(podcastListPromise.value, 'data', [])}
      />)
    }

    return (
      <MainLayout>
        {body}
      </MainLayout>
    )
  }
}

export default Home
