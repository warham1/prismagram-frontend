import React, { useState } from "react";
import AuthPresenter from "./AuthPresenter";
import useInput from "../../Hooks/useInput";
import { useMutation } from "react-apollo-hooks";
import { LOG_IN, CREATE_ACCOUNT, CONFIRM_SECRET, LOCAL_LOG_IN } from "./AuthQueries";
import { toast } from "react-toastify";

export default () => {
  const [action, setAction] = useState("logIn");
  const username = useInput("");
  const firstName = useInput("");
  const lastName = useInput("");
  const email = useInput("");
  const secret = useInput("");
  const [requestSecret] = useMutation(LOG_IN, {
    variables: { email: email.value }
  });

  const [createAccount] = useMutation(CREATE_ACCOUNT, {
    variables: {
      email: email.value,
      username: username.value,
      firstName: firstName.value,
      lastName: lastName.value
    }
  });

  const [confirmSecret] = useMutation(CONFIRM_SECRET, {
    variables: {
      email: email.value,
      secret: secret.value
    }
  });

  const [localLogin] = useMutation(LOCAL_LOG_IN);

  const onSubmit = e => {
    e.preventDefault();
    if (action === "logIn") {
      if (email.value !== "") {
        requestSecret().then(
          result => {
            const {
              data: { requestSecret }
            } = result;

            if (!requestSecret) {
              toast.error("입력한 사용자 이름을 사용하는 계정을 찾을 수 없습니다.");
              setTimeout(() => setAction("signUp"), 3000);
            } else {
              toast.success("해당 메일함을 확인해보세요");
              setAction("confirm");
            }
          },
          error => {
            toast.error(error.message);
          }
        );
      } else {
        toast.error("이메일을 입력해주세요.");
      }
    } else if (action === "signUp") {
      if (email.value !== "" && username.value !== "" && firstName.value !== "" && lastName.value !== "") {
        createAccount().then(
          result => {
            const {
              data: { createAccount }
            } = result;
            if (!createAccount) {
              toast.error("계정을 만들 수 없습니다.");
            } else {
              toast.success("계정이 만들어졌습니다! 지금 바로 로그인하세요");
              setTimeout(() => setAction("logIn"), 3000);
            }
          },
          error => {
            toast.error(error.message);
          }
        );
      } else {
        toast.error("모든 항목을 입력해주세요.");
      }
    } else if (action === "confirm") {
      if (secret.value !== "") {
        confirmSecret().then(
          result => {
            const {
              data: { confirmSecret: token }
            } = result;
            if (token !== "" && token !== undefined) {
              localLogin({ variables: { token } });
            } else {
              throw Error();
            }
          },
          error => {
            toast.error("시크릿을 확인하는데 실패했습니다.");
          }
        );
      }
    }
  };

  return (
    <AuthPresenter
      setAction={setAction}
      action={action}
      username={username}
      firstName={firstName}
      lastName={lastName}
      email={email}
      onSubmit={onSubmit}
      secret={secret}
    />
  );
};
