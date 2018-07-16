import {
  connect,
} from 'react-refetch'

import Training from './Training'

import config from 'client/utils/config'

export default connect((props) => ({
  updateTraining: (newTraining) => ({
    updateTrainingPromise: {
      url: `${config.get('apiHost')}/trainings/`,
      method: 'PUT',
      refresh: true,
      force: true,
      headers: {
        'Content-Type': 'application/json',
        Authorization: localStorage.getItem('Authorization'),
      },
      body: JSON.stringify(newTraining),
      andThen: () => ({
        trainingPromise: {
          url: `${config.get('apiHost')}/trainings/id/${props.match.params.id}`,
          force: true,
          refreshing: true,
        },
      }),
    },
  }),
  trainingPromise: `${config.get('apiHost')}/trainings/id/${props.match.params.id}`,
}))(Training)
