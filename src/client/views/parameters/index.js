import {
  connect,
} from 'react-refetch'

import Parameters from './Parameters'

import config from 'client/utils/config'

export default connect(() => ({
  getParameters: () => ({
    parametersPromise: {
      url: `${config.get('apiHost')}/parameters`,
      force: true,
      refreshing: true,
    },
  }),
  updateParameters: (newParameters) => ({
    updateParameterPromise: {
      url: `${config.get('apiHost')}/parameters`,
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: localStorage.getItem('Authorization'),
      },
      body: JSON.stringify(newParameters),
      andThen: () => ({
        parametersPromise: {
          url: `${config.get('apiHost')}/parameters`,
          force: true,
          refreshing: true,
        },
      }),
    },
  }),
  parametersPromise: `${config.get('apiHost')}/parameters`,
}))(Parameters)
