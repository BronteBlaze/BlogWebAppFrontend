import Button from "@/components/Button";
import logo from "@/assets/logo1.jpg";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getAuthStatus,
  getIsLoggedIn,
  logOut,
  signOutUser,
} from "@/redux/UserSlice";
import Loading from "@/components/Loading";

const Header = () => {
  const isLoggedIn = useSelector(getIsLoggedIn);
  const dispatch = useDispatch();
  const authStatus = useSelector(getAuthStatus);

  const signOutHandler = () => {
    dispatch(signOutUser());
  };

  return (
    <div className="py-6">
      <div className="flex justify-center">
        <div className="text-center">
          <div className="flex justify-center">
            <img src={logo} alt="oxford-blog-logo" className="md:w-[20rem] w-[15rem]" />
          </div>
          <h2 className="text-3xl text-head-color font-semibold mt-4">
            Oxford Blog Article Website
          </h2>
          <div className="flex items-center gap-4 justify-center mt-6">
            {!isLoggedIn && (
              <Link to="/signup">
                <Button title="SignUp" />
              </Link>
            )}
            {!isLoggedIn ? (
              <Link to="/signin">
                <Button title="Login" />
              </Link>
            ) : (
              <div className="flex items-center gap-6">
                <Button
                  title={authStatus === "loading" ? "Signing out" : "SignOut"}
                  onClick={signOutHandler}
                />
                {authStatus === "loading" && <Loading />}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
