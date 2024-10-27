import {
  getAuthError,
  signInUser,
  setAuthError,
  getAuthStatus,
} from "@/redux/UserSlice";
import { useEffect, useRef } from "react";
import Input from "@/components/Input";
import { useDispatch, useSelector } from "react-redux";
import Button from "@/components/Button";
import circle2 from "@/assets/circle2.png";
import Loading from "@/components/Loading";
import Wrapper from "@/components/Wrapper";
import { Collapse } from "react-collapse";
import useError from "@/hooks/useError";
import ShowError from "@/components/ShowError";
import { Link } from "react-router-dom";

const Login = () => {
  const dispatch = useDispatch();

  const emailRef = useRef();
  const passwordRef = useRef();

  const authError = useSelector(getAuthError);
  const authStatus = useSelector(getAuthStatus);

  const loginUserHandler = (event) => {
    event.preventDefault();

    let email = emailRef.current?.value;
    let password = passwordRef.current?.value;

    dispatch(signInUser(email, password));
  };

  const { errorType, setErrorType } = useError(authError);

  const inputFocusHandler = () => {
    dispatch(setAuthError(""));
    setErrorType("");
  };

  useEffect(() => {
    return () => dispatch(setAuthError(""));
  }, []);

  return (
    <Wrapper className="max-w-[900px] py-6">
      <div className="grid grid-cols-5 shadow-md border border-gray-300">
        <div className="col-span-2 px-12 py-8 relative bg-main-color text-white overflow-hidden">
          <h3 className="text-2xl font-semibold pb-3">
            Signin to interact with our blog
          </h3>
          <h5>
            Here, you can sign in to login your account for viewing and creating
            your post
          </h5>
          <div className="absolute -bottom-20 -right-20">
            <img src={circle2} alt="circle-img" className="w-[15rem]" />
          </div>
          <div className="absolute bottom-16 right-16">
            <img src={circle2} alt="circle-img" />
          </div>
        </div>
        <div className="col-span-3 border-l border-gray-300 px-20 py-12 bg-white">
          <form onSubmit={loginUserHandler}>
            <div>
              <Input
                type="email"
                id="login_email"
                label="Email"
                ref={emailRef}
                placeholder="E.g: John@gmail.com"
                className="mt-4"
                error={errorType === "emailError"}
                onFocus={inputFocusHandler}
              />
              <Collapse isOpened={errorType === "emailError"}>
                <ShowError error={authError} />
              </Collapse>
            </div>
            <div>
              <Input
                type="password"
                id="login_pass"
                ref={passwordRef}
                label="Password"
                placeholder="Enter your password here"
                className="mt-6"
                error={errorType === "passError"}
                onFocus={inputFocusHandler}
              />
              <Collapse isOpened={errorType === "passError"}>
                <ShowError error={authError} />
              </Collapse>
            </div>
            <div className="flex items-center gap-6 mt-6">
              <Button
                title={authStatus === "loading" ? "SIGNING..." : "SIGNIN"}
                type="submit"
              />
              {authStatus === "loading" && <Loading />}
            </div>
            <div className="text-sm mt-6">
              <span className="">Doesn't have a account?</span>
              <Link className="px-1" to="/signup">
                <button className="text-main-color" type="button">
                  Sign up
                </button>
              </Link>
            </div>
            <div className="mt-4 text-sm text-red-color">
              <button type="button" className="underline">
                Forget your password?
              </button>
            </div>
          </form>
        </div>
      </div>
    </Wrapper>
  );
};

export default Login;
