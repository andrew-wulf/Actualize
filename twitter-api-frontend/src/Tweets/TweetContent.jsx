import { Image, Stack, Container, Row, Col } from "react-bootstrap";


export function TweetContent(props) {
  let tweet = props.tweet;

  if (tweet.image) {
    return (
      <Container>
        <Row>
          <p>{tweet.text}</p>
        </Row>

        <Row>
          <Col xs={1}/>
          <Col xs={10}>
            <Container className="tweet-img-container">
              <Image fluid src={tweet.image} alt="..." />

            </Container>
          </Col>
        </Row>
      </Container>
    )
  }

  else {
    if (tweet.video) {
      return (
      <Container>
        <Row>
          <p>{tweet.text}</p>
        </Row>

        <Row>
          <Col xs={1}/>
          <Col xs={10}>
            <div className="tweet-video-container">
              <iframe className='video' width='500' height='320' 
                title='Youtube player'
                sandbox='allow-same-origin allow-forms allow-popups allow-scripts allow-presentation'
                src={tweet.video}>
              </iframe>
            </div>
          </Col>
        </Row>
      </Container>
      )
    }
    else {
      return (
        <p>{tweet.text}</p>
      )
    }
  }
}