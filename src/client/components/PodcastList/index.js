import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import {
  withRouter,
} from 'react-router-dom'
import get from 'lodash/get'

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
  // TODO: add filter and pagination
  static propTypes = {
    history: PropTypes.object.isRequired,
    podcasts: PropTypes.array.isRequired,
  }

  constructor(props) {
    super(props)
    this.state = {
      order: 'asc',
      orderBy: 'calories',
      dataType: 'training',
    }
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
              // eslint-disable-next-line
              <TableRow key={podcast._id} onClick={(event) => this.handleClick(event, podcast._id)}>
                <TableCell component="th" scope="raw" >
                  {podcast.name}
                </TableCell>
                <TableCell>{ podcast.data ? get(podcast.data[podcast.data.length - 1], 'date') : podcast.createdDate}</TableCell>
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
