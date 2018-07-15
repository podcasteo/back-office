import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import ScriptStatus from './ScriptStatus'

import Button from 'material-ui/core/Button'
import Paper from 'material-ui/core/Paper'
import Input from 'material-ui/core/Input'
import TextField from 'material-ui/core/TextField'
import Typography from 'material-ui/core/Typography'
import MainLayout from 'client/components/MainLayout'

const MainDiv = styled(Paper)`
  padding:25px;
  margin:25px;
  display:flex;
  flex-direction:column;

`
const ScriptsDiv = styled.div`
  margin-top:25px;
  display:flex;
  flex-direction:column;
`
const ScriptDiv = styled.div`
  margin-top:15px;
`
// const MainDiv = styled.div`
//   margin:25px;
//   display:flex;
//   justify-content: center;
//   align-items: center;
// `

function fakeClick(obj) {
  const ev = document.createEvent('MouseEvents')

  ev.initMouseEvent(
    'click',
    true,
    false,
    window,
    0,
    0,
    0,
    0,
    0,
    false,
    false,
    false,
    false,
    0,
    null,
  )
  obj.dispatchEvent(ev)
}

class ScriptManager extends React.Component {
  static propTypes = {
    uploadTrainingsFromCSV: PropTypes.func.isRequired,
    uploadTrainingPromise: PropTypes.object,
    downloadTrainingsCSV: PropTypes.func.isRequired,
    downloadTrainingPromise: PropTypes.object,
    uploadPodcastsFromCSV: PropTypes.func.isRequired,
    uploadPodcastsPromise: PropTypes.object,
    uploadRankingFromCSV: PropTypes.func.isRequired,
    uploadRankingPromise: PropTypes.object,
    uploadProvidersFromCSV: PropTypes.func.isRequired,
    uploadProvidersPromise: PropTypes.object,
    uploadDataikuFromCSV: PropTypes.func.isRequired,
    uploadDataikuPromise: PropTypes.object,
    downloadDataikuCSV: PropTypes.func.isRequired,
    downloadDataikuPromise: PropTypes.object,
  }

  static defaultProps = {
    uploadTrainingPromise: {},
    downloadTrainingPromise: {},
    uploadPodcastsPromise: {},
    uploadRankingPromise: {},
    uploadProvidersPromise: {},
    uploadDataikuPromise: {},
    downloadDataikuPromise: {},
  }

  constructor(props) {
    super(props)
    this.state = {
      downloadTrainingStatus: '',
      downloadDataikuStatus: '',
      trainingFile: '',
      podcastsFile: '',
      rankingFile: '',
      providerFile: '',
      dataikuFile: '',
      rankingUploadDate: ' ',
      providerUploadDate: ' ',
      dataikuUploadDate: ' ',
      dataikuDownloadDate: ' ',
    }
  }

  componentDidUpdate() {
    const {
      downloadTrainingPromise,
      downloadDataikuPromise,
    } = this.props

    console.log('train', this.state.downloadTrainingStatus)
    console.log('data', this.state.downloadDataikuStatus)

    if (downloadTrainingPromise.fulfilled && this.state.downloadTrainingStatus === 'pending') {
      this.downloadFile('trainingdata.csv', downloadTrainingPromise.value)
    }

    if (downloadDataikuPromise.fulfilled && this.state.downloadDataikuStatus === 'pending') {
      this.downloadFile('dataiku.csv', downloadDataikuPromise.value)
    }
  }

  downloadFile = (name, data) => {
    const urlObject = window.URL || window.webkitURL || window
    const exportBlob = new Blob([
      data,
    ])

    if (name === 'dataiku.csv') {
      this.setState({
        downloadDataikuStatus: 'done',
      })
    } else {
      console.log('heya', name)
      this.setState({
        downloadTrainingStatus: 'done',
      })
    }

    if ('msSaveBlob' in navigator) {
      // Prefer msSaveBlob if available - Edge supports a[download] but
      // ignores the filename provided, using the blob UUID instead.
      // msSaveBlob will respect the provided filename
      navigator.msSaveBlob(exportBlob, name)
    } else if ('download' in HTMLAnchorElement.prototype) {
      const saveLink = document.createElementNS(
        'http://www.w3.org/1999/xhtml',
        'a',
      )

      saveLink.href = urlObject.createObjectURL(exportBlob)
      saveLink.download = name
      fakeClick(saveLink)
    } // else {
    //   throw new Error('Neither a[download] nor msSaveBlob is available')
    // }
  }

  handleChangeFile = (event) => {
    this.setState({
      [event.target.name]: event.target.files[0],
    })
  }

  handleChangeDate = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    })
  }

  handleUpload = (func) => {
    const {
      uploadTrainingsFromCSV,
      uploadPodcastsFromCSV,
      uploadRankingFromCSV,
      uploadProvidersFromCSV,
      uploadDataikuFromCSV,
    } = this.props
    const formdata = new FormData()

    switch (func) {
      case uploadTrainingsFromCSV:
        if (!this.state.trainingFile) {
          // TODO Manage error
          return
        }

        if (!this.state.trainingFile.type.includes('text')) {
          // TODO Manager error invalid type
          return
        }

        formdata.append('file', this.state.trainingFile)
        uploadTrainingsFromCSV(formdata)

        break

      case uploadPodcastsFromCSV:
        if (this.state.podcastsFile === '') {
          // TODO Manage error
          return
        }

        formdata.append('file', this.state.podcastsFile)
        uploadPodcastsFromCSV(formdata)
        break
      case uploadRankingFromCSV:
        if (this.state.rankingFile === '') {
          // TODO Manage error
          return
        }

        if (this.state.rankingUploadDate === '') {
          // TODO Manage error
          return
        }

        formdata.append('file', this.state.rankingFile)
        uploadRankingFromCSV(formdata, this.state.rankingUploadDate)
        break
      case uploadProvidersFromCSV:
        if (this.state.providerFile === '') {
          // TODO Manage error
          return
        }

        if (this.state.providerUploadDate === ' ') {
          // TODO Manage error
          return
        }

        formdata.append('file', this.state.providerFile)
        uploadProvidersFromCSV(formdata, this.state.providerUploadDate)
        break
      case uploadDataikuFromCSV:
        if (this.state.dataikuFile === '') {
          // TODO Manage error
          return
        }

        if (this.state.dataikuUploadDate === ' ') {
          // TODO Manage error
          return
        }

        formdata.append('file', this.state.dataikuFile)
        uploadDataikuFromCSV(formdata, this.state.dataikuUploadDate)
        break
      default:
    }
  }

  handleDownload = (func) => {
    const {
      downloadTrainingsCSV,
      downloadDataikuCSV,
    } = this.props

    switch (func) {
      case downloadTrainingsCSV:
        this.setState({
          downloadTrainingStatus: 'pending',
        })
        downloadTrainingsCSV()
        break
      case downloadDataikuCSV:
        if (this.state.dataikuDownloadDate === ' ') {
          // TODO err handling
          return
        }

        this.setState({
          downloadDataikuStatus: 'pending',
        })
        downloadDataikuCSV(this.state.dataikuDownloadDate)
        break
      default:
        // console.log('cant handle dowload', func)
    }
  }

  render() {
    return (
      <MainLayout>
        <MainDiv>
          <ScriptsDiv>
            <Typography variant="title">
              Training scripts
            </Typography>
            <ScriptDiv>
              <Typography>
                Upload du training set
              </Typography>
              <div>
                <Input
                  name="trainingFile"
                  type="file"
                  onChange={this.handleChangeFile}
                />
                <Button
                  variant="raised"
                  color="primary"
                  onClick={() => this.handleUpload(this.props.uploadTrainingsFromCSV)}
                >
                  Upload
                </Button>
                <ScriptStatus
                  promise={this.props.uploadTrainingPromise}
                />
              </div>
            </ScriptDiv>
            <ScriptDiv>
              <Typography>
                Download du training set
              </Typography>
              <Button
                variant="raised"
                color="primary"
                onClick={() => this.handleDownload(this.props.downloadTrainingsCSV)}
              >
                Download
              </Button>
              <ScriptStatus
                promise={this.props.downloadTrainingPromise}
              />
            </ScriptDiv>
          </ScriptsDiv>
          <ScriptsDiv>
            <Typography variant="title">
              Datasets scripts
            </Typography>
            <ScriptDiv>
              <Typography>
                Upload des podcasts
              </Typography>
              <div>
                <Input
                  name="podcastsFile"
                  type="file"
                  onChange={this.handleChangeFile}
                />
                <Button
                  variant="raised"
                  color="primary"
                  onClick={() => this.handleUpload(this.props.uploadPodcastsFromCSV)}
                >
                  Upload
                </Button>
                <ScriptStatus
                  promise={this.props.uploadPodcastsPromise}
                />
              </div>
            </ScriptDiv>
            <ScriptDiv>
              <Typography>
                Upload des ranking
              </Typography>
              <div>
                <TextField
                  name="rankingUploadDate"
                  label="Date"
                  type="date"
                  value={this.state.rankingUploadDate}
                  onChange={this.handleChangeDate}
                  margin="normal"
                />
                <Input
                  name="rankingFile"
                  type="file"
                  onChange={this.handleChangeFile}
                />
                <Button
                  variant="raised"
                  color="primary"
                  onClick={() => this.handleUpload(this.props.uploadRankingFromCSV)}
                >
                  Upload
                </Button>
                <ScriptStatus
                  promise={this.props.uploadRankingPromise}
                />
              </div>
            </ScriptDiv>
            <ScriptDiv>
              <Typography>
                Upload des providers
              </Typography>
              <div>
                <TextField
                  name="providerUploadDate"
                  label="Date"
                  type="date"
                  value={this.state.providerUploadDate}
                  onChange={this.handleChangeDate}
                  margin="normal"
                />
                <Input
                  name="providerFile"
                  type="file"
                  onChange={this.handleChangeFile}
                />
                <Button
                  variant="raised"
                  color="primary"
                  onClick={() => this.handleUpload(this.props.uploadProvidersFromCSV)}
                >
                  Upload
                </Button>
                <ScriptStatus
                  promise={this.props.uploadProvidersPromise}
                />
              </div>
            </ScriptDiv>
            <ScriptDiv>
              <Typography>
                Upload Dataiku
              </Typography>
              <div>
                <TextField
                  name="dataikuUploadDate"
                  label="Date"
                  type="date"
                  value={this.state.dataikuUploadDate}
                  onChange={this.handleChangeDate}
                  margin="normal"
                />
                <Input
                  name="dataikuFile"
                  type="file"
                  onChange={this.handleChangeFile}
                />
                <Button
                  variant="raised"
                  color="primary"
                  onClick={() => this.handleUpload(this.props.uploadDataikuFromCSV)}
                >
                  Upload
                </Button>
                <ScriptStatus
                  promise={this.props.uploadDataikuPromise}
                />
              </div>
            </ScriptDiv>
            <ScriptDiv>
              <Typography>
                Download Dataiku csv
              </Typography>
              <div>
                <TextField
                  name="dataikuDownloadDate"
                  label="Date"
                  type="date"
                  value={this.state.dataikuDownloadDate}
                  onChange={this.handleChangeDate}
                  margin="normal"
                />
                <Button
                  variant="raised"
                  color="primary"
                  onClick={() => this.handleDownload(this.props.downloadDataikuCSV)}
                >
                  Download
                </Button>
                <ScriptStatus
                  promise={this.props.downloadDataikuPromise}
                />
              </div>
            </ScriptDiv>
          </ScriptsDiv>
        </MainDiv>
      </MainLayout>
    )
  }
}

export default ScriptManager
