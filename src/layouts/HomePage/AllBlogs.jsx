import Blog from "@/components/Blog";
import Loading from "@/components/Loading";
import { formatDate } from "@/constant";
import { getAllBlogs, getBlogStatus, obtainAllBlogs } from "@/redux/BlogSlice";
import { BlogSkeleton } from "@/UI/Skeleton";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

const AllBlogs = () => {
  // const dispatch = useDispatch();
  const allBlogs = useSelector(getAllBlogs);
  const blogStatus = useSelector(getBlogStatus);

  // useEffect(() => {
  //   dispatch(obtainAllBlogs());
  //   toast("Fetched Blogs Successfully!");
  // }, []);

  // console.log(allBlogs);

  return (
    <div className="col-span-5">
      <div className="text-xl py-4 text-center font-semibold text-head-color">
        <h4>All Blogs</h4>
      </div>
      {blogStatus === "loading" && (
        <div className="grid grid-cols-2 gap-4">
          {allBlogs.map((_, index) => {
            return <BlogSkeleton key={index} index={index} />;
          })}
        </div>
      )}
      {blogStatus === "idle" && allBlogs?.length !== 0 && (
        <div className="grid grid-cols-2 gap-4">
          {allBlogs?.map((blog, index) => {
            const postDate = formatDate(blog.created_at);
            return (
              <Blog
                blogId={blog.id}
                key={index}
                index={index}
                title={blog.title}
                image={blog.image}
                description={blog.description}
                postDate={postDate}
                category={blog.category}
              />
            );
          })}
        </div>
      )}
      {blogStatus === "idle" && allBlogs?.length === 0 && (
        <div className="text-center text-red-color">
          <span>No blogs to show</span>
        </div>
      )}
    </div>
  );
};

export default AllBlogs;
