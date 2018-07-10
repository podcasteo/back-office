import {
  connect,
} from 'react-refetch'

import Home from './Home'

import config from 'client/utils/config'

export default connect(() => ({
  getPodcastList: (offset, first) => ({
    podcastListPromise: {
      url: `${config.get('apiHost')}/podcasts?offset=${offset}&first=${first}`,
      force: true,
      refreshing: true,
    },
  }),
  podcastListPromise: `${config.get('apiHost')}/podcasts?offset=0&first=20`,
}))(Home)
