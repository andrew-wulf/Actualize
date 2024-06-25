import { Tweet } from "./Tweet";
import { QuoteTweet } from "./QuoteTweet";

import { Container, Stack, Col, Row } from "react-bootstrap";

export function TweetsIndex(props) {
  let tweets = props.tweets;
  console.log('tweets: ', tweets)

  if (tweets && tweets.length > 0) {
    return (
            <Stack>
              {
                tweets.map(tweet => {

                  if (tweet.is_quote) {
                    return (
                      <QuoteTweet tweet={tweet}/>
                    )
                  }
                  else {

                    return (
                      <Tweet tweet={tweet}/>
                    )
                  }

                })
              }
            </Stack>

    )
  }
}