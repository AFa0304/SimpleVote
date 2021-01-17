import React, { Suspense } from 'react';
import styled from 'styled-components';
import { Route } from 'react-router-dom'
import { initializeApp } from 'firebase'
import { firebaseConfig } from './config/firebase-config'
import 'antd/dist/antd.css'

import Loading from './components/Loading'
import background from './assets/images/bg.jpg'

const TopicList = React.lazy(() => import("./container/TopicList"))
const Vote = React.lazy(() => import("./container/Vote"))

export default class App extends React.Component {
  constructor(props) {
    super(props);
    initializeApp(firebaseConfig);
  }
  render() {
    return (
      <Container>
        <Suspense fallback={<Loading />}>
          <Route path="/" exact component={TopicList} />
          <Route path="/vote/:topicID" component={Vote} />
        </Suspense>
      </Container>
    )
  }
}
const Container = styled.main`
  width:100%;
  min-height:100vh;
  position:relative;
  &:before{
    width:100%;
    height:100%;
    position:absolute;
    background-image:${"url(" + background + ")"};
    background-size:cover;
    background-position:center center;
    background-repeat:no-repeat;
    content:"";
    opacity:0.15;
  }
`;