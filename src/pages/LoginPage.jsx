import Footer from "@/layouts/Footer";
import Header from "@/layouts/Header";
import Navbar from "@/layouts/Navbar";
import Login from "@/layouts/LoginPage/Login";
import { Fragment } from "react";

const LoginPage = () => {
  return (
    <Fragment>
      <Header />
      <Navbar />
      <Login />
      <Footer />
    </Fragment>
  );
};

export default LoginPage;
