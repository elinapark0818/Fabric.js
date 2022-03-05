import React from "react";
import styled from "styled-components";
import { Redirect, Route, Switch } from "react-router-dom";
import MyPage from "./component/MyPage";
import SignUp from "./component/SignUp";
import NotFound from "./component/NotFound";
import Login from "./component/Login";
import Home from "./component/Home";
import { useUserState } from "./context/UserContext";
import Header from "./component/Header";
import Modify from "./component/Modify";

// import Fabrictest from "./components/Fabrictest";

const Container = styled.div`
  padding: 2vh 6vh;
`;

const App = () => {
  const { user } = useUserState();

  return (
    <Container>
      <Header />
      {user ? (
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/mypage" component={MyPage} />
          <Route path="/mypage/modify" component={Modify} />
          <Route path="/404" component={NotFound} />
          <Redirect from="*" to="/" />
        </Switch>
      ) : (
        <Switch>
          <Route exact path="/" component={Login} />
          <Route path="/signup" component={SignUp} />
          <Route path="/404" component={NotFound} />
          <Redirect from="*" to="/" />
        </Switch>
      )}
    </Container>
  );
};

export default App;
