import { useEffect, useState } from "react";
import { useToast } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

import useInput from "../../hooks/useInput";
import { emailValidator, passwordValidator } from "../../lib/validator";
import Input from "../../components/Sign/Input";
import Button from "../../components/Sign/Button";
import useApi from "../../hooks/useApi";

const Signin = () => {
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPassworError] = useState(false);
  const {
    value: email,
    onChange: onChangeEmail,
    isValidate: isEmailValidate,
  } = useInput({
    validator: emailValidator,
  });
  const {
    value: password,
    onChange: onChangePassword,
    isValidate: isPasswordValidate,
  } = useInput({
    validator: passwordValidator,
  });
  const navigate = useNavigate();
  const { signInhandler } = useApi();

  useEffect(() => {
    if (window) {
      const token = localStorage.getItem("access_token");

      if (token) {
        navigate("/todo");
      }
    }
  }, []);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!isEmailValidate && !isPasswordValidate) {
      if (!isEmailValidate) {
        setEmailError(true);
      }

      if (!isPasswordValidate) {
        setPassworError(true);
      }
      return;
    }

    signInhandler({ email, password });
  };

  const isFormCheck = isEmailValidate && isPasswordValidate;

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-3 w-[300px]">
      <Input
        value={email}
        name="email"
        onChange={onChangeEmail}
        testid="email-input"
        type="email"
      />
      {emailError && <div className="text-red-500">이메일을 확인해주세요.</div>}
      <Input
        value={password}
        name="password"
        onChange={onChangePassword}
        testid="password-input"
        type="password"
      />
      {passwordError && (
        <div className="text-red-500">
          비밀번호는 8자 이상으로 만들어주세요.
        </div>
      )}
      <Button disabled={!isFormCheck} testid="signin-button">
        로그인
      </Button>
    </form>
  );
};

export default Signin;
