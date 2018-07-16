import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import {
  withRouter,
} from 'react-router-dom'

import TablePaginationActions from './TablePaginationActions'

import {
  withStyles,
} from 'material-ui/core/styles'
import Table from 'material-ui/core/Table'
import TableBody from 'material-ui/core/TableBody'
import TableCell from 'material-ui/core/TableCell'
import TableHead from 'material-ui/core/TableHead'
import TableRow from 'material-ui/core/TableRow'
import TablePagination from 'material-ui/core/TablePagination'
import TableFooter from 'material-ui/core/TableFooter'
import Paper from 'material-ui/core/Paper'

const RootDiv = styled.div`
  display:flex;
  justify-content: center;
  align-items: center;
`
const MyPaper = styled(Paper)`
  && {
    width: 80%;
    margin-top: 15px;
    overflowX: auto;
  }
`
const MyTable = styled(Table)`
  && {
    min-width:700px;
  }
`
const actionsStyles = (theme) => ({
  root: {
    flexShrink: 0,
    color: theme.palette.text.secondary,
    marginLeft: theme.spacing.unit * 2.5,
  },
})

class TrainingList extends React.Component {
  // TODO: add filter and pagination
  static propTypes = {
    history: PropTypes.object.isRequired,
    trainings: PropTypes.object.isRequired,
    getTrainingList: PropTypes.func.isRequired,
  }
  constructor(props) {
    super(props)

    const {
      totalCount,
      pageCount,
    } = props.trainings.pageInfo

    this.state = {
      // order: 'asc',
      // orderBy: 'calories',
      // dataType: 'training',
      totalCount,
      rowsPerPage: pageCount,
      page: 0,
    }
  }

  handleClick = (event, trainingId) => {
    this.props.history.push(`/training/${trainingId}`)
  }

  handleChangePage = (event, page) => {
    this.setState({
      page,
    })
    this.props.getTrainingList(page, this.state.rowsPerPage)
  }

  handleChangeRowsPerPage = (event) => {
    this.setState({
      rowsPerPage: event.target.value,
    })
  }

  render() {
    const TablePaginationActionsWrapped = withStyles(actionsStyles, {
      withTheme: true,
    })(TablePaginationActions)

    return (
      <RootDiv>
        <MyPaper>
          <MyTable>
            <TableHead>
              <TableRow>
                <TableCell> Training </TableCell>
                <TableCell date="true" > Age </TableCell>
                <TableCell> Audience </TableCell>
                <TableCell> Producteur </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {this.props.trainings.data.map((training) => (
                // eslint-disable-next-line
                <TableRow key={training._id} onClick={(event) => this.handleClick(event, training._id)}>
                  <TableCell component="th" scope="raw" >
                    {training.name}
                  </TableCell>
                  <TableCell> {training.age} </TableCell>
                  <TableCell> {training.audience} </TableCell>
                  <TableCell> {training.producer} </TableCell>
                </TableRow>
                ))}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TablePagination
                  colSpan={3}
                  count={this.state.totalCount}
                  rowsPerPage={this.state.rowsPerPage}
                  page={this.state.page}
                  onChangePage={this.handleChangePage}
                  onChangeRowsPerPage={this.handleChangeRowsPerPage}
                  ActionsComponent={TablePaginationActionsWrapped}
                />
              </TableRow>
            </TableFooter>
          </MyTable>
        </MyPaper>
      </RootDiv>
    )
  }
}

export default withRouter(TrainingList)
