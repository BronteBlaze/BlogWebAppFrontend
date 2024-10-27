import Navbar from "@/layouts/Navbar";
import Register from "@/layouts/RegisterPage/Register";
import { Fragment } from "react";
import Header from "@/layouts/Header";
import Footer from "@/layouts/Footer";

const RegisterPage = () => {
    return (
        <Fragment>
            <Header />
            <Navbar />
            <Register />
            <Footer />
        </Fragment>
    );
}

export default RegisterPage;