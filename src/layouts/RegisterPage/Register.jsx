import Input from "@/components/Input";
import Button from "@/components/Button";
import circle2 from "@/assets/circle2.png";
import Wrapper from "@/components/Wrapper";
import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAuthError,
  getAuthStatus,
  getSignUpStatus,
  registerUser,
  setAuthError,
  setSignUpSuccess,
} from "@/redux/UserSlice";
import Loading from "@/components/Loading";
import useError from "@/hooks/useError";
import ShowError from "@/components/ShowError";
import { Collapse } from "react-collapse";
import { useNavigate } from "react-router";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const authStatus = useSelector(getAuthStatus);
  const authError = useSelector(getAuthError);
  const signUpSuccess = useSelector(getSignUpStatus);

  const firstNameRef = useRef(null);
  const lastNameRef = useRef();
  const emailRef = useRef();
  const phoneNumberRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();

  const registerUserHandler = (event) => {
    event.preventDefault();

    let first_name = firstNameRef.current?.value;
    let last_name = lastNameRef.current?.value;
    let email = emailRef.current?.value;
    let phone_number = phoneNumberRef.current?.value;
    let password = passwordRef.current?.value;
    let password_confirmation = confirmPasswordRef.current?.value;

    dispatch(
      registerUser({
        first_name,
        last_name,
        email,
        phone_number,
        password,
        password_confirmation,
      })
    );
  };

  const { errorType, setErrorType } = useError(authError);

  const inputFocusHandler = () => {
    dispatch(setAuthError(""));
    setErrorType("");
  };

  useEffect(() => {
    if (signUpSuccess) {
      navigate("/signin");
    }

    return () => {
      dispatch(setSignUpSuccess(false));
      dispatch(setAuthError(""));
    };
  }, [signUpSuccess]);

  return (
    <Wrapper className="py-6">
      <div className="grid lg:grid-cols-2 shadow-md border border-gray-300 relative">
        <div className="lg:px-12 px-6 pt-8 relative pb-8 bg-main-color text-white overflow-hidden">
          <h3 className="text-2xl font-semibold pb-3">
            Register to post your blog
          </h3>
          <h5>
            Here, you can sign up to create your account for viewing and
            creating your post
          </h5>
          <div className="absolute -bottom-20 -right-20">
            <img src={circle2} alt="circle-img" className="w-[15rem]" />
          </div>
          <div className="absolute bottom-16 right-16">
            <img src={circle2} alt="circle-img" />
          </div>
        </div>
        <div className="lg:px-12 px-6 py-12 bg-white">
          <form onSubmit={registerUserHandler}>
            <div className="grid grid-cols-2 lg:gap-6 gap-3">
              <div>
                <Input
                  type="text"
                  id="fname"
                  label="First Name"
                  placeholder="E.g: John"
                  ref={firstNameRef}
                  error={errorType === "firstNameError"}
                  onFocus={inputFocusHandler}
                />
                <Collapse isOpened={errorType === "firstNameError"}>
                  <ShowError error={authError} />
                </Collapse>
              </div>
              <div>
                <Input
                  type="text"
                  id="lname"
                  label="Last Name"
                  placeholder="E.g: John"
                  ref={lastNameRef}
                  error={errorType === "lastNameError"}
                  onFocus={inputFocusHandler}
                />
                <Collapse isOpened={errorType === "lastNameError"}>
                  <ShowError error={authError} />
                </Collapse>
              </div>
              <div>
                <Input
                  type="email"
                  id="email"
                  label="Email"
                  placeholder="E.g: John@gmail.com"
                  ref={emailRef}
                  error={errorType === "emailError"}
                  onFocus={inputFocusHandler}
                />
                <Collapse isOpened={errorType === "emailError"}>
                  <ShowError error={authError} />
                </Collapse>
              </div>
              <div>
                <Input
                  type="number"
                  id="phone"
                  label="Phone Number"
                  placeholder="E.g: +977 86462683"
                  ref={phoneNumberRef}
                  error={errorType === "phoneError"}
                  onFocus={inputFocusHandler}
                />
                <Collapse isOpened={errorType === "phoneError"}>
                  <ShowError error={authError} />
                </Collapse>
              </div>
              <div className="col-span-2">
                <Input
                  type="password"
                  id="pass"
                  label="Password"
                  placeholder="Enter your password"
                  ref={passwordRef}
                  error={errorType === "passError"}
                  onFocus={inputFocusHandler}
                />
                <Collapse isOpened={errorType === "passError"}>
                  <ShowError error={authError} />
                </Collapse>
              </div>
              <div className="col-span-2">
                <Input
                  type="password"
                  id="confirm_pass"
                  label="Confirm Password"
                  placeholder="Confirm your password"
                  ref={confirmPasswordRef}
                  error={errorType === "confirmationError"}
                  onFocus={inputFocusHandler}
                />
                <Collapse isOpened={errorType === "confirmationError"}>
                  <ShowError error={authError} />
                </Collapse>
              </div>
              <div className="flex items-center gap-6">
                <Button
                  title={
                    authStatus === "loading" ? "Registering..." : "Register"
                  }
                  type="submit"
                  divClass="mt-2"
                />
                {authStatus === "loading" && <Loading />}
              </div>
            </div>
          </form>
        </div>
      </div>
    </Wrapper>
  );
};

export default Register;
