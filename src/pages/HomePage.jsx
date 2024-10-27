import { Fragment } from "react";
import Navbar from "@/layouts/Navbar";
import Header from "@/layouts/Header";
import LandHome from "@/layouts/HomePage/LandHome";
import AllBlogs from "@/layouts/HomePage/AllBlogs";
import Sidebar from "@/layouts/HomePage/Sidebar";
import Wrapper from "@/components/Wrapper";
import Footer from "@/layouts/Footer";
import PaginationComponent from "@/layouts/Pagination";

const HomePage = () => {
  return (
    <Fragment>
      <Header />
      <Navbar />
      <LandHome />
      <Wrapper>
        <div className="grid grid-cols-7 gap-4 relative">
          <AllBlogs />
          <Sidebar />
        </div>
      </Wrapper>
      <PaginationComponent yours={false} />
      <Footer />
    </Fragment>
  );
};

export default HomePage;
