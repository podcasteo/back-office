import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import {
  withRouter,
} from 'react-router-dom'

import Table from 'material-ui/core/Table'
import TableBody from 'material-ui/core/TableBody'
import TableCell from 'material-ui/core/TableCell'
import TableHead from 'material-ui/core/TableHead'
import TableRow from 'material-ui/core/TableRow'
import Paper from 'material-ui/core/Paper'

const RootElement = styled(Paper)`
  && {
    width: 100%;
    margin-top: 15px;
    overflowX: auto;
  }
`
const MyTable = styled(Table)`
  && {
    min-width:700px;
  }
`

class PodcastList extends React.Component {
  static propTypes = {
    history: PropTypes.object.isRequired,
    podcasts: PropTypes.array.isRequired,
  }

  handleClick = (event, podcastId) => {
    this.props.history.push(`/podcast/${podcastId}`)
  }
  render() {
    return (
      <RootElement>
        <MyTable>
          <TableHead>
            <TableRow>
              <TableCell> Podcast </TableCell>
              <TableCell date> Dernière Modification</TableCell>
              <TableCell> Catégory </TableCell>
              <TableCell> Image </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {this.props.podcasts.map((podcast) => (
              <TableRow key={podcast._id} onClick={(event) => this.handleClick(event, podcast._id)}>
                <TableCell component="th" scope="raw" >
                  {podcast.name}
                </TableCell>
                <TableCell>{podcast.lastUpdateDate}</TableCell>
                <TableCell>{podcast.categorie}</TableCell>
                <TableCell> <img src={podcast.logo} alt="logo" height="100px" width="100px" /> </TableCell>
              </TableRow>
              ))}
          </TableBody>
        </MyTable>
      </RootElement>
    )
  }
}

export default withRouter(PodcastList)
