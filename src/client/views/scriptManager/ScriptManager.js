import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import ScriptStatus from './ScriptStatus'

import Button from 'material-ui/core/Button'
import Input from 'material-ui/core/Input'
import TextField from 'material-ui/core/TextField'
import Typography from 'material-ui/core/Typography'
import ExpansionPanel from 'material-ui/core/ExpansionPanel'
import ExpansionPanelDetails from 'material-ui/core/ExpansionPanelDetails'
import ExpansionPanelSummary from 'material-ui/core/ExpansionPanelSummary'
import ExpandMoreIcon from 'material-ui/icons/ExpandMore'
import MainLayout from 'client/components/MainLayout'

const MainDiv = styled.div`

`
const MainPaper = styled.div`
  && {
    padding:25px;
  }
`
const MargedTypography = styled(Typography)`
  && {
    margin-top:15px;
  }
`
const FormAndStatusDiv = styled.div`
  display:flex;
  flex-direction:row;
  justify-content: space-arround;
  align-items: center;
`
const Form = styled.div`
  display:flex;
  flex: 2
  flex-direction:column;
`
const MyButton = styled(Button)`
    margin:15px;
    width:20%;
`
const Status = styled(ScriptStatus)`
  display:flex;
  justify-content: center;
  align-items: center;
  flex: 1
`
const MyInputFile = styled(Input)`
  margin-top:15px;
  margin-bottom:5px;
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
    publishPodcastToProduction: PropTypes.func.isRequired,
    publishPromise: PropTypes.object,
  }

  static defaultProps = {
    uploadTrainingPromise: {},
    downloadTrainingPromise: {},
    uploadPodcastsPromise: {},
    uploadRankingPromise: {},
    uploadProvidersPromise: {},
    uploadDataikuPromise: {},
    downloadDataikuPromise: {},
    publishPromise: {},
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
          <MainPaper>
            <Typography variant="display1">
              Training scripts
            </Typography>
            <ExpansionPanel>
              <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                <Typography variant="title">
                  Upload du training set
                </Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <ScriptDiv>
                  <FormAndStatusDiv>
                    <Form>
                      <Typography>
                        Uploader le fichier comportant les données pour la création du dataset de training
                      </Typography>
                      <MyInputFile
                        name="trainingFile"
                        type="file"
                        onChange={this.handleChangeFile}
                      />
                      <MyButton
                        variant="raised"
                        color="primary"
                        onClick={() => this.handleUpload(this.props.uploadTrainingsFromCSV)}
                      >
                        Upload
                      </MyButton>
                    </Form>
                    <Status
                      promise={this.props.uploadTrainingPromise}
                    />
                  </FormAndStatusDiv>
                </ScriptDiv>
              </ExpansionPanelDetails>
            </ExpansionPanel>
            <ExpansionPanel>
              <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                <Typography
                  variant="title"
                >
                Download du training set
                </Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <ScriptDiv>
                  <FormAndStatusDiv>
                    <Form>
                      <Typography>
                        Télécharger le fichier comportant les données du dataset de training
                      </Typography>
                      <MyButton
                        variant="raised"
                        color="primary"
                        onClick={() => this.handleDownload(this.props.downloadTrainingsCSV)}
                      >
                        Download
                      </MyButton>
                    </Form>
                    <Status
                      promise={this.props.downloadTrainingPromise}
                    />
                  </FormAndStatusDiv>
                </ScriptDiv>
              </ExpansionPanelDetails>
            </ExpansionPanel>
            <MargedTypography variant="display1">
              Datasets scripts
            </MargedTypography>
            <ExpansionPanel>
              <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                <Typography
                  variant="title"
                >
                Upload des podcasts
                </Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <ScriptDiv>
                  <FormAndStatusDiv>
                    <Form>
                      <Typography>
                        Uploader le fichier d&apos;initiatialisation des podcasts
                      </Typography>
                      <MyInputFile
                        name="podcastsFile"
                        type="file"
                        onChange={this.handleChangeFile}
                      />
                      <MyButton
                        variant="raised"
                        color="primary"
                        onClick={() => this.handleUpload(this.props.uploadPodcastsFromCSV)}
                      >
                        Upload
                      </MyButton>
                    </Form>
                    <Status
                      promise={this.props.uploadPodcastsPromise}
                    />
                  </FormAndStatusDiv>
                </ScriptDiv>
              </ExpansionPanelDetails>
            </ExpansionPanel>
            <ExpansionPanel>
              <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                <Typography
                  variant="title"
                >
                Upload des ranking
                </Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <ScriptDiv>
                  <FormAndStatusDiv>
                    <Form>
                      <Typography>
                        Uploader le fichier comportant les informations de
                        rankings des podcasts pour la date choisie
                      </Typography>
                      <TextField
                        name="rankingUploadDate"
                        label="Date"
                        type="date"
                        value={this.state.rankingUploadDate}
                        onChange={this.handleChangeDate}
                        margin="normal"
                      />
                      <MyInputFile
                        name="rankingFile"
                        type="file"
                        onChange={this.handleChangeFile}
                      />
                      <MyButton
                        variant="raised"
                        color="primary"
                        onClick={() => this.handleUpload(this.props.uploadRankingFromCSV)}
                      >
                        Upload
                      </MyButton>
                    </Form>
                    <Status
                      promise={this.props.uploadRankingPromise}
                    />
                  </FormAndStatusDiv>
                </ScriptDiv>
              </ExpansionPanelDetails>
            </ExpansionPanel>
            <ExpansionPanel>
              <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                <Typography
                  variant="title"
                >
                Upload des providers
                </Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <ScriptDiv>
                  <FormAndStatusDiv>
                    <Form>
                      <Typography>
                        Uploader le fichier comportant les informations des
                        providers (youtube, twitter, facebook...) des podcasts
                        pour la date choisie
                      </Typography>
                      <TextField
                        name="providerUploadDate"
                        label="Date"
                        type="date"
                        value={this.state.providerUploadDate}
                        onChange={this.handleChangeDate}
                        margin="normal"
                      />
                      <MyInputFile
                        name="providerFile"
                        type="file"
                        onChange={this.handleChangeFile}
                      />
                      <MyButton
                        variant="raised"
                        color="primary"
                        onClick={() => this.handleUpload(this.props.uploadProvidersFromCSV)}
                      >
                        Upload
                      </MyButton>
                    </Form>
                    <Status
                      promise={this.props.uploadProvidersPromise}
                    />
                  </FormAndStatusDiv>
                </ScriptDiv>
              </ExpansionPanelDetails>
            </ExpansionPanel>
            <ExpansionPanel>
              <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                <Typography
                  variant="title"
                >
                Upload Dataiku
                </Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <ScriptDiv>
                  <FormAndStatusDiv>
                    <Form>
                      <Typography>
                        Uploader le fichier de sortie de dataiku
                      </Typography>
                      <TextField
                        name="dataikuUploadDate"
                        label="Date"
                        type="date"
                        value={this.state.dataikuUploadDate}
                        onChange={this.handleChangeDate}
                        margin="normal"
                      />
                      <MyInputFile
                        name="dataikuFile"
                        type="file"
                        onChange={this.handleChangeFile}
                      />
                      <MyButton
                        variant="raised"
                        color="primary"
                        onClick={() => this.handleUpload(this.props.uploadDataikuFromCSV)}
                      >
                        Upload
                      </MyButton>
                    </Form>
                    <Status
                      promise={this.props.uploadDataikuPromise}
                    />
                  </FormAndStatusDiv>
                </ScriptDiv>
              </ExpansionPanelDetails>
            </ExpansionPanel>
            <ExpansionPanel>
              <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                <Typography
                  variant="title"
                >
                Download Dataiku csv
                </Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <ScriptDiv>
                  <FormAndStatusDiv>
                    <Form>
                      <Typography>
                        Télécharger le fichier au format
                        pour l&apos;import dans dataiku
                      </Typography>
                      <TextField
                        name="dataikuDownloadDate"
                        label="Date"
                        type="date"
                        value={this.state.dataikuDownloadDate}
                        onChange={this.handleChangeDate}
                        margin="normal"
                      />
                      <MyButton
                        variant="raised"
                        color="primary"
                        onClick={() => this.handleDownload(this.props.downloadDataikuCSV)}
                      >
                        Download
                      </MyButton>
                    </Form>
                    <Status
                      promise={this.props.downloadDataikuPromise}
                    />
                  </FormAndStatusDiv>
                </ScriptDiv>
              </ExpansionPanelDetails>
            </ExpansionPanel>
            <ExpansionPanel>
              <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                <Typography
                  variant="title"
                >
                Publier en production
                </Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <ScriptDiv>
                  <FormAndStatusDiv>
                    <Form>
                      <Typography>
                        Publier les dernières modifications
                        sur la base de production
                      </Typography>
                      <MyButton
                        variant="raised"
                        color="primary"
                        onClick={() => this.props.publishPodcastToProduction()}
                      >
                        Publier
                      </MyButton>
                    </Form>
                    <Status
                      promise={this.props.publishPromise}
                    />
                  </FormAndStatusDiv>
                </ScriptDiv>
              </ExpansionPanelDetails>
            </ExpansionPanel>
          </MainPaper>
        </MainDiv>
      </MainLayout>
    )
  }
}

export default ScriptManager
