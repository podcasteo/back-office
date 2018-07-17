import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import IconButton from 'material-ui/core/IconButton'
import LastPageIcon from 'material-ui/icons/LastPage'
import FirstPageIcon from 'material-ui/icons/FirstPage'
import KeyboardArrowLeft from 'material-ui/icons/KeyboardArrowLeft'
import KeyboardArrowRight from 'material-ui/icons/KeyboardArrowRight'

const PaginationDiv = styled.div`
&& {
  width:100%;
  display:flex;
  justify-content: end;
  align-items: end;
}
`

class TablePaginationActions extends React.Component {
  handleFirstPageButtonClick = (event) => {
    const page = 0
    const offset = 0

    this.props.onChangePage(event, page, offset)
  }

  handleBackButtonClick = (event) => {
    const page = this.props.page - 1
    const offset = page * this.props.rowsPerPage

    this.props.onChangePage(event, page, offset)
  }

  handleNextButtonClick = (event) => {
    const page = this.props.page + 1
    const offset = page * this.props.rowsPerPage

    this.props.onChangePage(event, page, offset)
  }

  handleLastPageButtonClick = (event) => {
    const page = Math.max(0, Math.ceil(this.props.count / this.props.rowsPerPage) - 1)
    const offset = page * this.props.rowsPerPage

    this.props.onChangePage(event, page, offset)
  }

  render() {
    const {
      count,
      page,
      rowsPerPage,
      theme,
      hasNextPage,
      hasPreviousPage,
    } = this.props

    return (
      <PaginationDiv>
        <IconButton
          onClick={this.handleFirstPageButtonClick}
          disabled={page === 0}
          aria-label="First Page"
        >
          {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
        </IconButton>
        <IconButton
          onClick={this.handleBackButtonClick}
          disabled={!hasPreviousPage}
          aria-label="Previous Page"
        >
          {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
        </IconButton>
        <IconButton
          onClick={this.handleNextButtonClick}
          disabled={!hasNextPage}
          aria-label="Next Page"
        >
          {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
        </IconButton>
        <IconButton
          onClick={this.handleLastPageButtonClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label="Last Page"
        >
          {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
        </IconButton>
      </PaginationDiv>
    )
  }
}

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onChangePage: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
  theme: PropTypes.object.isRequired,
  hasNextPage: PropTypes.bool.isRequired,
  hasPreviousPage: PropTypes.bool.isRequired,
}

export default TablePaginationActions
