import React from "react";
import styled from "styled-components";
import { useUserState } from "../context/UserContext";

const MainP = styled.p`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Home = () => {
  const { user } = useUserState();

  return (
    <div>
      <MainP>{user.userId}님 환영합니다.</MainP>
    </div>
  );
};

export default Home;
