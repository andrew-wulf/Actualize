import axios from 'axios'
import './css/header.css'

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


export function Header() {
  return (
    <Container fluid className='header'>
      <Row>
        <Col><h1>Twitter</h1></Col>
        <Col><h3>Sign In</h3></Col>
      </Row>
    </Container>
  )
}