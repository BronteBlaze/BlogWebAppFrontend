import Header from "@/layouts/Header";
import Navbar from "@/layouts/Navbar";
import WriteYoutBlog from "@/layouts/WriteBlogPage/WriteYourBlog";
import Footer from "@/layouts/Footer";
import { Fragment, useEffect } from "react";
import BlogForm from "@/layouts/WriteBlogPage/BlogForm";

const WriteYourBlogPage = () => {
  return (
    <Fragment>
      <Header />
      <Navbar />
      <BlogForm />
      <WriteYoutBlog />
      <Footer />
    </Fragment>
  );
};

export default WriteYourBlogPage;
