import React, { useState, useCallback, useEffect } from "react";
import useInput from "../hooks/useInput";
import { useUserDispatch, useUserState } from "../context/UserContext";

import styled from "styled-components";

const Container = styled.div`
  padding: 0px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Title = styled.h1`
  color: purple;
  font-size: 4vw;
  padding: 0px;
  text-align: center;
`;

const Btn = styled.input`
  border: none;
  color: white;
  width: 7vw;
  height: 5vh;
  text-decoration: none;
  text-align: center;
  font-size: 1vw;
  margin: 0vh auto 1.5vh;
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 auto;
`;

const InputItem = styled.div`
  margin-bottom: 7vh;
  width: 25vw;
`;

const InputTitle = styled.div`
  font-weight: bold;
  margin-bottom: 1vh;
`;

const ErrorMessage = styled.div`
  color: red;
  font-size: 1vw;
  margin-top: 1vh;
`;

const Input = styled.input`
  width: 25vw;
  height: 5vh;
  text-align: center;
`;

const SignUp = ({ history }) => {
  const [id, onChangeId, setId] = useInput("");
  const [pwd, onChangePwd, setPwd] = useInput("");
  const [confirmPwd, onChangeConfirmPwd, setConfirmPwd] = useInput("");
  const [errorMessage, setErrorMessage] = useState({
    idError: "",
    pwdError: "",
    confirmPwdError: "",
  });
  const { idError, pwdError, confirmPwdError } = errorMessage;
  const [color, setColor] = useState("lightgray");
  const { userList } = useUserState();
  const dispatch = useUserDispatch();

  const inputRegexs = {
    idReg: /^[A-za-z0-9]{5,15}$/g,
    pwdReg: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/g,
  };
  const validationCheck = useCallback(
    (input, regex) => {
      let isValidate = false;
      if (input === "") {
        isValidate = false;
      } else if (regex.test(input)) {
        isValidate = true;
      } else {
        isValidate = false;
      }
      return isValidate;
    },
    [pwd, id]
  );

  const onReset = useCallback(() => {
    setId("");
    setPwd("");
    setConfirmPwd("");
  }, [setId, setPwd, setConfirmPwd]);
  /* 아이디 체크 */
  useEffect(() => {
    const findUser = userList.find((user) => user.id === id);

    if ((!findUser && validationCheck(id, inputRegexs.idReg)) || id === "") {
      setErrorMessage({
        ...errorMessage,
        idError: "",
      });
    } else if (findUser !== undefined) {
      setErrorMessage({
        ...errorMessage,
        idError: "이미 가입된 아이디입니다.",
      });
    } else if (!validationCheck(id, inputRegexs.idReg)) {
      setErrorMessage({
        ...errorMessage,
        idError: "아이디는 영문 또는 숫자로 5~15자 이여야 합니다.",
      });
    }
  }, [id]);
  console.log(idError);
  /* 비밀번호 체크 */
  useEffect(() => {
    if (validationCheck(pwd, inputRegexs.pwdReg) || pwd === "") {
      setErrorMessage({
        ...errorMessage,
        pwdError: "",
      });
    } else {
      setErrorMessage({
        ...errorMessage,
        pwdError:
          "비밀번호는 최소 하나의 문자 및 하나의 숫자로 8자 이상이여야 합니다.",
      });
    }
  }, [pwd]);
  /* 비밀번호 확인 체크 */
  useEffect(() => {
    if (pwd === confirmPwd || confirmPwd === "") {
      setErrorMessage({
        ...errorMessage,
        confirmPwdError: "",
      });
    } else {
      setErrorMessage({
        ...errorMessage,
        confirmPwdError: "비밀번호 확인이 일치하지 않습니다.",
      });
    }
  }, [confirmPwd]);

  /* error !!! */
  /* 모든 입력창이 맞게 입력되었다면 가입 버튼 색을 보라색으로 변경 */
  useEffect(() => {
    if (
      !idError &&
      !pwdError &&
      confirmPwd === pwd &&
      id !== "" &&
      pwd !== "" &&
      confirmPwd !== ""
    ) {
      setColor("purple");
    } else {
      setColor("lightgray");
    }
    console.log(idError);
  }, [id, pwd, confirmPwd]);

  const onSignUp = () => {
    if (!id || !pwd || !confirmPwd) {
      alert("모든 값을 정확하게 입력해주세요");
      return;
    }

    if (idError) {
      alert("아이디가 형식에 맞지 않습니다");
      return;
    } else if (pwdError) {
      alert("비밀번호가 형식에 맞지 않습니다");
      return;
    } else if (confirmPwdError) {
      alert("비밀번호 확인이 일치하지 않습니다.");
      return;
    }

    dispatch({
      type: "CREATE_USER",
      user: {
        id,
        pwd,
      },
    });
    alert("회원 가입 완료");
    onReset();
    history.push("/");
  };

  return (
    <Container>
      <Title>회원가입</Title>
      <InputContainer>
        <InputItem>
          <InputTitle>아이디</InputTitle>
          <Input
            type="text"
            placeholder="아이디를 입력하세요"
            value={id}
            onChange={onChangeId}
            required
          />
          {idError ? <ErrorMessage>{idError}</ErrorMessage> : ""}
        </InputItem>
        <InputItem>
          <InputTitle>비밀번호</InputTitle>
          <Input
            type="password"
            placeholder="비밀번호를 입력하세요"
            value={pwd}
            onChange={onChangePwd}
            required
          />
          {pwdError ? <ErrorMessage>{pwdError}</ErrorMessage> : ""}
        </InputItem>
        <InputItem>
          <InputTitle>비밀번호 확인</InputTitle>
          <Input
            type="password"
            placeholder="비밀번호 확인을 입력하세요"
            value={confirmPwd}
            onChange={onChangeConfirmPwd}
            required
          />
          {confirmPwdError ? (
            <ErrorMessage>{confirmPwdError}</ErrorMessage>
          ) : (
            ""
          )}
        </InputItem>
      </InputContainer>
      <Btn
        type="submit"
        value="가입"
        onClick={onSignUp}
        style={{ backgroundColor: color }}
      />
    </Container>
  );
};

export default SignUp;
