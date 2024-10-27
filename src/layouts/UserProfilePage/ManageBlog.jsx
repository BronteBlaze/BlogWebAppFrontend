import PaginationComponent from "@/layouts/Pagination";
import { getBlogStatus, getYourBlogs } from "@/redux/BlogSlice";
import { useSelector } from "react-redux";
import YourBlog from "@/components/YourBlog";
import Button from "@/components/Button";
import { Link } from "react-router-dom";
import { YourBlogSkeleton } from "@/UI/Skeleton";

const ManageBlog = () => {
  const yourBlogs = useSelector(getYourBlogs);
  const blogStatus = useSelector(getBlogStatus);

  return (
    <div className="col-span-5 bg-white p-12 text-second-color relative">
      <div className="">
        <div className="text-xl font-semibold">Your Blogs</div>
        <div className="mt-6">
          {blogStatus === "idle" && yourBlogs?.data?.length !== 0 && (
            <>
              {yourBlogs?.data.map((blog, index) => {
                return <YourBlog blog={blog} key={index} />;
              })}
            </>
          )}
          {blogStatus === "loading" && (
            <>
              {yourBlogs?.data?.map((_, index) => {
                return <YourBlogSkeleton key={index} />;
              })}
            </>
          )}
          {blogStatus === "idle" && yourBlogs?.data?.length === 0 && (
            <div className="">
              <span>You have no blogs posted</span>
              <div className="mt-6">
                <Link to="/write-blog">
                  <Button title="Add Blog" />
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="absolute bottom-0">
        <PaginationComponent yours={true} />
      </div>
    </div>
  );
};

export default ManageBlog;
