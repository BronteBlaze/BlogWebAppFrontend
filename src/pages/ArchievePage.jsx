import { Fragment } from "react";
import Navbar from "@/layouts/Navbar";
import Sidebar from "@/layouts/HomePage/Sidebar";
import Wrapper from "@/components/Wrapper";
import Footer from "@/layouts/Footer";
import ArchieveBlogs from "@/layouts/ArchieveBlogs";
import MonthPaginate from "@/components/MonthPaginate";
import ArchieveHeader from "@/components/ArchieveHeader";
import Header from "@/layouts/Header";

const ArchievePage = () => {
  return (
    <Fragment>
      <Header />
      <Navbar />
      <ArchieveHeader />
      <Wrapper>
        <div className="grid grid-cols-7 gap-4 relative">
          <ArchieveBlogs />
          <Sidebar />
        </div>
      </Wrapper>
      <MonthPaginate />
      <Footer />
    </Fragment>
  );
};
export default ArchievePage;
