import axios from 'axios'
import './css/header.css'

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Stack from 'react-bootstrap/Stack';
import Image from 'react-bootstrap/Image';

export function Header(props) {
  let user = props.user;
  console.log(user);

  if (user === "" || user === undefined) {
    return (
      <Container fluid className='header'>
        <Row>
          <Col><h1>Twitter</h1></Col>
          <Col><h3>Sign In</h3></Col>
        </Row>
      </Container>
    )
  }
  else {
    return (
      <Container fluid className='header'>
        <Row>
          <Col xs={2}><h1>Twitter</h1></Col>
          <Col xs={6}/>
          <Col>
            <Stack direction='horizontal' gap={2}>
              <h5>@{user.username}</h5>
              <Image src={user.avi} roundedCircle className='avi-header'/>

            </Stack>
          </Col>
        </Row>
      </Container>
    )
  }
}