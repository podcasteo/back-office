import {
  connect,
} from 'react-refetch'

import TrainingData from './TrainingData'

import config from 'client/utils/config'

export default connect(() => ({
  getTrainingList: (offset, first) => ({
    trainingListPromise: {
      url: `${config.get('apiHost')}/trainings?offset=${offset}&first=${first}`,
      force: true,
      refreshing: true,
    },
  }),
  trainingListPromise: `${config.get('apiHost')}/trainings?offset=0&first=20`,
}))(TrainingData)
