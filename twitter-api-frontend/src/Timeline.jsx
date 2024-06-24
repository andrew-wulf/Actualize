import Form from 'react-bootstrap/Form';

import Stack from 'react-bootstrap/Stack';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import Button from 'react-bootstrap/Button';
import { Image } from 'react-bootstrap';

import axios from 'axios';
import { useState, useEffect } from 'react';


import { IoMdHeartEmpty } from "react-icons/io";
import { IoMdHeart } from "react-icons/io";
import { FaRetweet } from "react-icons/fa6";


export function Timeline() {
  
  const [tweets, setTweets] = useState([]);

  const getUserTimeline = () => {
    axios.get('http://localhost:3000/tweets/timeline.json')
      .then(response => {
        console.log(response);
        setTweets(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }
  useEffect(getUserTimeline, []);

  if (tweets && tweets.length > 0) {
    return (
      <Container>
        <Row>
          <Col xs={2}>
          </Col>

          <Col xs={8}>
            <Stack>
              {
                tweets.map(tweet => {
                  let quote = false;
                  if (tweet.is_quote) {

                  }

                  return (
                    <Container key={tweet.id} className='timeline-row'>

                      <Row>
                        <Col>
                          <Stack direction='horizontal' gap={4}>
                            <Image src={tweet.avi} roundedCircle className='avi'/>
                            <Stack>
                              <h5>{tweet.display_name}</h5>
                              <p>@{tweet.username}</p>
                            </Stack>
                          </Stack>
                        </Col>
                      </Row>

                      <Row>
                        <Col>
                          <p>{tweet.text}</p>
                        </Col>
                      </Row>

                      <Row>

                        <Col xs={2}>
                          <Stack direction="horizontal" gap={2}>
                            {tweet.retweets}
                            <FaRetweet />
                          </Stack>
                        </Col>

                        <Col xs={2}>
                          <Stack direction="horizontal" gap={2}>
                            {tweet.likes}
                            <IoMdHeartEmpty />
                          </Stack>
                        </Col>

                        <Col xs={3}>
                          <Stack direction="horizontal" gap={2}>
                            {tweet.replies} replies
                          </Stack>
                        </Col>

                      </Row>

                    </Container>
                  )
                })
              }
            </Stack>
          </Col>
          
          <Col xs={2}>
          </Col>

        </Row>
  
      </Container>
    )
  }
}