import React from 'react'
import styled from 'styled-components'

const Footer = styled.div`
  padding-left: 60px;
  padding-right: 60px;
  padding-top: 20px;
  padding-bottom: 20px;
`

export default class MainFooter extends React.Component {
  render() {
    return (
      <footer className="main-footer">
        <Footer />
      </footer>
    )
  }
}
