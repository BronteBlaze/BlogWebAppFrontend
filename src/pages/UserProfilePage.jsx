import Header from "@/layouts/Header";
import Sidebar from "@/layouts/UserProfilePage/Sidebar";
import Navbar from "@/layouts/Navbar";
import { Fragment, useEffect } from "react";
import Wrapper from "@/components/Wrapper";
import Footer from "@/layouts/Footer";
import { Outlet, useLocation, useNavigate } from "react-router";

const UserProfilePage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.pathname === "/user") {
      navigate("/user/profile");
    }
  }, [location.pathname, navigate]);

  return (
    <Fragment>
      <Header />
      <Navbar />
      <Wrapper className="grid grid-cols-7 my-6 h-[35rem]">
        <Sidebar />
        <Outlet />
      </Wrapper>
      <Footer />
    </Fragment>
  );
};

export default UserProfilePage;
