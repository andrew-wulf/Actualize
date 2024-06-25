import { Container, Row, Col, Stack, Image } from "react-bootstrap"
import { TweetContent } from "./TweetContent";

import { IoMdHeartEmpty } from "react-icons/io";
import { IoMdHeart } from "react-icons/io";
import { FaRetweet } from "react-icons/fa6";
import { FaRegComment } from "react-icons/fa";
import { FaArrowUpFromBracket } from "react-icons/fa6";
import { FaRegBookmark } from "react-icons/fa6";
import { ImStatsBars } from "react-icons/im";

export function Tweet(props) {
  let tweet = props.tweet;


   return (

    <Container key={tweet.id} className='tweet' onClick={() => {window.location.href = `/tweet/${tweet.id}`}}>
      
      <Row>
        <Col>
          <Stack direction='horizontal' gap={4}>
            <Image src={tweet.avi} roundedCircle className='avi'/>
            <Stack>
              <h6>{tweet.display_name}</h6>
              <p>@{tweet.username}</p>
            </Stack>
          </Stack>
        </Col>
      </Row>

      <Row>
        <Col>
          <TweetContent tweet={tweet}/>
        </Col>
      </Row>

      <Row>
        <Col xs={2}>
          <Stack direction="horizontal" gap={2}>
            <FaRegComment/>
            {tweet.replies}
          </Stack>
        </Col>

        <Col xs={2}>
          <Stack direction="horizontal" gap={2}>
            <FaRetweet />
            {tweet.retweets}
          </Stack>
        </Col>

        <Col xs={2}>
          <Stack direction="horizontal" gap={2}>
            <IoMdHeartEmpty />
            {tweet.likes}
          </Stack>
        </Col>

        <Col xs={2}>
          <Stack direction="horizontal" gap={2}>
            <ImStatsBars/>
            23.4M
          </Stack>
        </Col>

        <Col>
          <Stack direction="horizontal" gap={3}>
            <FaArrowUpFromBracket/>
            <FaRegBookmark/>
          </Stack>
        </Col>
      </Row>

    </Container>
  )
}