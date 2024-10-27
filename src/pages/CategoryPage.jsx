import { Fragment } from "react";
import Navbar from "@/layouts/Navbar";
import Header from "@/layouts/Header";
import AllBlogs from "@/layouts/HomePage/AllBlogs";
import Sidebar from "@/layouts/HomePage/Sidebar";
import Wrapper from "@/components/Wrapper";
import Footer from "@/layouts/Footer";
import CategoryHeader from "@/components/CategoryHeader";
import CategoryPaginate from "@/components/CategoryPaginate";
import CategoryBlogs from "@/layouts/CategoryBlogs";

const CategoryPage = () => {
  return (
    <Fragment>
      <Header />
      <Navbar />
      <CategoryHeader />
      <Wrapper>
        <div className="grid grid-cols-7 gap-4 relative">
          <CategoryBlogs />
          <Sidebar />
        </div>
      </Wrapper>
      <CategoryPaginate />
      <Footer />
    </Fragment>
  );
};

export default CategoryPage;
