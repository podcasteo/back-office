import React from 'react'
// import PropTypes from 'prop-types'
// import get from 'lodash/get'
import styled from 'styled-components'

import Button from 'material-ui/core/Button'
import Paper from 'material-ui/core/Paper'
import Input from 'material-ui/core/Input'
import TextField from 'material-ui/core/TextField'
import MainLayout from 'client/components/MainLayout'

const MyPaper = styled(Paper)`
  && {
    background-color:black;
    height: 100%;
  }
`
const MainDiv = styled.div`
  margin:25px;
  display:flex;
  justify-content: center;
  align-items: center;
`
const ScriptDiv = styled.div`
  margin: 0px
`
const ScriptsDiv = styled.div`
display:flex;
`

class Home extends React.Component {
  // static propTypes = {
  //   //podcastListPromise: PropTypes.object.isRequired,
  //   // getPodcastList: PropTypes.func.isRequired,
  // }
  render() {
    return (
      <MainLayout>
        <MainDiv>
          <ScriptsDiv>
            <ScriptDiv>
              Exporter pour dataiku
              <div>
                <TextField
                  type="date"
                />
                <Button variant="raised" color="primary"> Importer </Button>
              </div>
            </ScriptDiv>
            <ScriptDiv>
                Importer résultat dataiku
              <div>
                <Input
                  type="file"
                />
                <Button variant="raised" color="primary"> Exporter </Button>
              </div>
            </ScriptDiv>
            <ScriptDiv>
              Importer une liste de podcast
              <div>
                <Input
                  type="file"
                />
                <Button variant="raised" color="primary"> Importer </Button>
              </div>
            </ScriptDiv>
            <ScriptDiv>
              Publier les modifications en ligne
              <div>
                <Button variant="raised" color="primary"> Publier </Button>
              </div>
            </ScriptDiv>
          </ScriptsDiv>
        </MainDiv>
        <MyPaper>
          AZE
        </MyPaper>
      </MainLayout>
    )
  }
}

export default Home
