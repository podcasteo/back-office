import {
  connect,
} from 'react-refetch'

import ScriptManager from './ScriptManager'

import config from 'client/utils/config'

const MyConnector = connect.defaults({
  handleResponse(response) {
    if (response.headers.get('content-length') === '0' || response.status === 204) {
      return
    }

    const csv = response.text()

    if (response.status >= 200 && response.status < 300) {
      const promise = new Promise((resolve) => {
        resolve(csv)
      })

      return promise // eslint-disable-line
    }

    return csv.then((cause) => Promise.reject(new Error(cause))) // eslint-disable-line
  },
})

export default MyConnector(() => ({
  uploadTrainingsFromCSV: (file) => ({
    uploadTrainingPromise: {
      url: `${config.get('apiHost')}/trainings/csv/upload`,
      method: 'POST',
      headers: {
        'Content-Type': undefined,
        Authorization: localStorage.getItem('Authorization'),
      },
      body: file,
    },
  }),
  downloadTrainingsCSV: () => ({
    downloadTrainingPromise: {
      url: `${config.get('apiHost')}/trainings/csv/download`,
      headers: {
        Authorization: localStorage.getItem('Authorization'),
      },
    },
  }),
  uploadPodcastsFromCSV: (file) => ({
    uploadPodcastsPromise: {
      url: `${config.get('apiHost')}/podcasts/csv/upload/init`,
      method: 'POST',
      headers: {
        'Content-Type': undefined,
        Authorization: localStorage.getItem('Authorization'),
      },
      body: file,
    },
  }),
  uploadRankingFromCSV: (file, date) => ({
    uploadRankingPromise: {
      url: `${config.get('apiHost')}/podcasts/csv/upload/rankings/${date}`,
      method: 'POST',
      headers: {
        'Content-Type': undefined,
        Authorization: localStorage.getItem('Authorization'),
      },
      body: file,
    },
  }),
  uploadProvidersFromCSV: (file, date) => ({
    uploadProvidersPromise: {
      url: `${config.get('apiHost')}/podcasts/csv/upload/providers/${date}`,
      method: 'POST',
      headers: {
        'Content-Type': undefined,
        Authorization: localStorage.getItem('Authorization'),
      },
      body: file,
    },
  }),
  uploadDataikuFromCSV: (file, date) => ({
    uploadDataikuPromise: {
      url: `${config.get('apiHost')}/podcasts/csv/upload/dataiku/${date}`,
      method: 'POST',
      headers: {
        'Content-Type': undefined,
        Authorization: localStorage.getItem('Authorization'),
      },
      body: file,
    },
  }),
  downloadDataikuCSV: (date) => ({
    downloadDataikuPromise: {
      url: `${config.get('apiHost')}/podcasts/csv/download/dataiku/${date}`,
      headers: {
        'Content-Type': 'text/csv',
        Authorization: localStorage.getItem('Authorization'),
      },
    },
  }),
  publishPodcastToProduction: () => ({
    publishPromise: {
      url: `${config.get('apiHost')}/podcasts/publish`,
      method: 'POST',
      headers: {
        'Content-Type': 'text/csv',
        Authorization: localStorage.getItem('Authorization'),
      },
    },
  }),
}))(ScriptManager)
