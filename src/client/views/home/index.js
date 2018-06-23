import {
  connect,
} from 'react-refetch'

import Home from './Home'

import config from 'client/utils/config'

export default connect(() => ({
  getPodcastList: () => ({
    podcastListPromise: {
      url: `${config.get('apiHost')}/podcasts`,
      force: true,
      refreshing: true,
    },
  }),
  podcastListPromise: `${config.get('apiHost')}/podcasts`,
}))(Home)
