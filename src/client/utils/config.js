import root from 'window-or-global'
import get from 'lodash/get'

const initData = root.__INIT_DATA_FROM_SERVER_RENDER__ || { // eslint-disable-line
  clientConfig: require('config').get('clientConfig'), // eslint-disable-line
}

export default {
  clientConfig: initData.clientConfig,
  get: (str) => get(initData.clientConfig, str),
}
