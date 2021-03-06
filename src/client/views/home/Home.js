import React from 'react'
import PropTypes from 'prop-types'
import get from 'lodash/get'
import styled from 'styled-components'

import Loading from 'client/components/Loading'
import ErrorMessage from 'client/components/ErrorMessage'
import MainLayout from 'client/components/MainLayout'
import PodcastList from 'client/components/PodcastList'

const MainDiv = styled.div`
  && {
    height:100%;
    display:flex;
    align-items: center;
    justify-content: center;
  }
`

class Home extends React.Component {
  static propTypes = {
    podcastListPromise: PropTypes.object.isRequired,
    getPodcastList: PropTypes.func.isRequired,
  }

  render() {
    const {
      podcastListPromise,
      getPodcastList,
    } = this.props
    let body

    if (!podcastListPromise || podcastListPromise.pending) {
      body = (
        <MainDiv>
          <Loading
            message="Loading podcasts dataset"
          />
        </MainDiv>)
    } else if (podcastListPromise.rejected) {
      body = (
        <MainDiv>
          <ErrorMessage
            {
              ...{
                error: {
                  message: 'Impossible de charger les podcasts',
                  reason: podcastListPromise.reason,
                },
              }
            }
          />
        </MainDiv>)
    } else {
      body = (<PodcastList
        podcasts={get(podcastListPromise, 'value', {})}
        getPodcastList={getPodcastList}
      />)
    }

    return (
      <MainLayout>
        {body}
      </MainLayout>
    )
  }
}

export default Home
