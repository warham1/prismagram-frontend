import React, { useState } from "react";
import styled from "styled-components";
import Input from "./../Components/Input";
import Button from "../Components/Button";

const Wrapper = styled.div`
  min-height: 80vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const Box = styled.div`
  ${props => props.theme.whiteBox}
  border-radius: 0px;
  width: 100%;
  max-width: 350px;
`;

const StateChanger = styled(Box)`
  text-align: center;
  padding: 20px 0px;
`;

const Link = styled.span`
  color: ${props => props.theme.blueColor};
  cursor: pointer;
`;

const Form = styled(Box)`
  padding: 40px;
  padding-bottom: 30px;
  margin-bottom: 15px;
  form {
    width: 100%;
    input {
      width: 100%;
      margin-bottom: 7px;
    }
    button {
      margin-top: 10px;
    }
  }
`;

export default () => {
  const [action, setAction] = useState("logIn");

  return (
    <Wrapper>
      <Form>
        {action === "logIn" ? (
          <form>
            <Input placeholder={"전화번호, 사용자 이름 또는 이메일"} />
            <Input placeholder={"비밀번호"} />
            <Button text={"로그인"} />
          </form>
        ) : (
          <form>
            <Input placeholder={"성"} />
            <Input placeholder={"이름"} />
            <Input placeholder={"휴대폰 번호 또는 이메일 주소"} />
            <Input placeholder={"사용자 이름"} />
            <Input placeholder={"비밀번호"} />
            <Button text={"가입"} />
          </form>
        )}
      </Form>
      <StateChanger>
        {action === "logIn" ? (
          <>
            계정이 없으신가요?{" "}
            <Link onClick={() => setAction("signUp")}>가입하기</Link>
          </>
        ) : (
          <>
            계정이 있으신가요?{" "}
            <Link onClick={() => setAction("logIn")}>로그인</Link>
          </>
        )}
      </StateChanger>
    </Wrapper>
  );
};
