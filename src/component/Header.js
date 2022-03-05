import React from "react";
// import { MainUl, LogoLi, NavDiv, MainLi, SubmitInput } from "./HeaderStyle";
import { Link, withRouter } from "react-router-dom";
import { useUserDispatch, useUserState } from "../context/UserContext";

import styled from "styled-components";

const MainUl = styled.ul`
  padding: 0px;
  list-style: none;
  display: flex;
  justify-content: space-between;
`;
const NavDiv = styled.div`
  display: flex;
  align-items: center;
`;
const LogoLi = styled.li`
  color: purple;
  font-weight: bold;
  font-size: 3vw;
`;

const MainLi = styled.li`
  margin: 0vw 1vw;
`;

const SubmitInput = styled.input`
  background-color: purple;
  border: none;
  color: white;
  width: 8vw;
  height: 5vh;
  text-decoration: none;
  text-align: center;
  font-size: 1vw;
`;

const Header = ({ location }) => {
  const { user } = useUserState();
  const dispatch = useUserDispatch();

  const onLogOut = () => {
    alert("로그아웃 되었습니다.");
    dispatch({
      type: "LOGOUT",
    });
  };
  return (
    <MainUl>
      <Link to="/" style={{ textDecoration: "none" }}>
        <LogoLi>회원가입 및 로그인</LogoLi>
      </Link>
      {user ? (
        <NavDiv>
          <MainLi>{user.userId}님</MainLi>
          {location.pathname !== "/mypage" && (
            <MainLi>
              <Link to="/mypage">
                <SubmitInput type="submit" value="마이 페이지" />
              </Link>
            </MainLi>
          )}
          <MainLi>
            <Link to="/">
              <SubmitInput type="submit" value="로그아웃" onClick={onLogOut} />
            </Link>
          </MainLi>
        </NavDiv>
      ) : location.pathname === "/signup" ? (
        <NavDiv>
          <MainLi>
            <Link to="/">
              <SubmitInput type="submit" value="로그인" />
            </Link>
          </MainLi>
        </NavDiv>
      ) : (
        <NavDiv>
          <MainLi>
            <Link to="/signup">
              <SubmitInput type="submit" value="회원가입" />
            </Link>
          </MainLi>
        </NavDiv>
      )}
    </MainUl>
  );
};

export default withRouter(Header);
