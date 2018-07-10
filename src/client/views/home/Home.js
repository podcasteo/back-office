import React from 'react'
import PropTypes from 'prop-types'
import get from 'lodash/get'

import MainLayout from 'client/components/MainLayout'
import PodcastList from 'client/components/PodcastList'

class Home extends React.Component {
  static propTypes = {
    podcastListPromise: PropTypes.object.isRequired,
    getPodcastList: PropTypes.func.isRequired,
  }

  render() {
    const {
      podcastListPromise,
      getPodcastList,
    } = this.props
    let body

    if (!podcastListPromise || podcastListPromise.pending) {
      body = <div> Loading Podcast... </div>
    } else if (podcastListPromise.rejected) {
      console.log('Error loading podcast:', podcastListPromise.reason)// eslint-disable-line
      body = <div> Error loading podcast ! </div>
    } else {
      body = (<PodcastList
        podcasts={get(podcastListPromise, 'value', {})}
        getPodcastList={getPodcastList}
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
