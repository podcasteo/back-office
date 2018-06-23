import {
  connect,
} from 'react-refetch'

import Podcast from './Podcast'

import config from 'client/utils/config'

export default connect((props) => ({
  getPodcast: () => ({
    podcastPromise: {
      url: `${config.get('apiHost')}/podcasts/${props.match.params.id}`,
      force: true,
      refreshing: true,
    },
  }),
  updatePodcast: (newPodcast) => ({
    url: `${config.get('apiHost')}/podcasts/${props.match.params.id}`,
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: localStorage.getItem('Authorization'),
    },
    body: JSON.stringify(newPodcast),
    // andThen: () => ({
    //   podcastPromise: {
    //     url: `${config.get('apiHost')}/podcasts/${props.match.params.id}`,
    //     force: true,
    //     refreshing: true,
    //   },
    // }),
  }),
  podcastPromise: `${config.get('apiHost')}/podcasts/${props.match.params.id}`,
}))(Podcast)
