import React from 'react'
import styled from 'styled-components'

const HomeTitle = styled.div`
  color: red;
  font-size: 32px;
`

class Test extends React.PureComponent {
  render() {
    return (
      <div>
        <HomeTitle>This is TEST</HomeTitle>
      </div>
    )
  }
}

export default Test
