import { Fragment, useEffect } from "react";
import BlogDetails from "@/layouts/BlogDetailsPage/BlogDetails";
import Header from "@/layouts/Header";
import Navbar from "@/layouts/Navbar";
import Sidebar from "@/layouts/HomePage/Sidebar";
import Footer from "@/layouts/Footer";
import Wrapper from "@/components/Wrapper";
import { useSelector } from "react-redux";
import { getBlogStatus, getDetails } from "@/redux/BlogSlice";
import { BlogDetailsSkeleton } from "@/UI/Skeleton";
import { useDispatch } from "react-redux";
import {
  getLikes,
  obtainComments,
  setComments,
  setLikeData,
} from "@/redux/SocialSlice";
import { useParams } from "react-router";

const BlogDetailsPage = () => {
  const blogDetails = useSelector(getDetails);
  const blogStatus = useSelector(getBlogStatus);

  const dispatch = useDispatch();
  const params = useParams();

  useEffect(() => {
    dispatch(obtainComments(params.id));
    dispatch(getLikes(params.id));

    return () => {
      dispatch(setComments([]));
      dispatch(setLikeData({ liked: false, likeCount: 0 }));
    };
  }, [params.id]);

  return (
    <Fragment>
      <Header />
      <Navbar />
      {blogStatus === "idle" && Object.keys(blogDetails).length !== 0 && (
        <Wrapper>
          <div className="grid grid-cols-7 gap-4 relative">
            <BlogDetails blogDetails={blogDetails} />
            <Sidebar margin={true} />
          </div>
        </Wrapper>
      )}
      {blogStatus === "loading" && (
        <Wrapper>
          <div className="grid grid-cols-7 gap-4 relative">
            <BlogDetailsSkeleton />
            <Sidebar margin={true} />
          </div>
        </Wrapper>
      )}
      <Footer />
    </Fragment>
  );
};

export default BlogDetailsPage;
