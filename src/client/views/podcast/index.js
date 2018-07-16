import {
  connect,
} from 'react-refetch'

import Podcast from './Podcast'

import config from 'client/utils/config'

export default connect((props) => ({
  updatePodcast: (newPodcast) => ({
    updatePodcastPromise: {
      url: `${config.get('apiHost')}/podcasts`,
      method: 'PUT',
      force: true,
      refreshing: true,
      headers: {
        'Content-Type': 'application/json',
        Authorization: localStorage.getItem('Authorization'),
      },
      body: JSON.stringify(newPodcast),
      andThen: () => ({
        podcastPromise: {
          url: `${config.get('apiHost')}/podcasts/id/${props.match.params.id}`,
          force: true,
          refreshing: true,
        },
      }),
    },
  }),
  podcastPromise: `${config.get('apiHost')}/podcasts/id/${props.match.params.id}`,
}))(Podcast)
