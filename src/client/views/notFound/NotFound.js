import React from 'react'
import styled from 'styled-components'

const HomeTitle = styled.div`
  color: green;
  font-size: 32px;
`

class NotFound extends React.PureComponent {
  render() {
    return (
      <div>
        <HomeTitle>NOT FOUND</HomeTitle>
      </div>
    )
  }
}

export default NotFound
