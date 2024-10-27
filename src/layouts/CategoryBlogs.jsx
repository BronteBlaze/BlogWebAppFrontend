import Blog from "@/components/Blog";
import { formatDate } from "@/constant";
import { getBlogStatus, getCategoryBlogs } from "@/redux/BlogSlice";
import { BlogSkeleton } from "@/UI/Skeleton";
import { useSelector } from "react-redux";

const CategoryBlogs = () => {
  const categoryBlogs = useSelector(getCategoryBlogs);
  const blogStatus = useSelector(getBlogStatus);

  return (
    <div className="col-span-5">
      {blogStatus === "loading" && (
        <div className="grid grid-cols-2 gap-4">
          {categoryBlogs.map((_, index) => {
            return <BlogSkeleton key={index} index={index} />;
          })}
        </div>
      )}
      {blogStatus === "idle" && categoryBlogs?.length !== 0 && (
        <div className="grid grid-cols-2 gap-4">
          {categoryBlogs?.map((blog, index) => {
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
      {blogStatus === "idle" && categoryBlogs?.length === 0 && (
        <div className="text-center text-red-color">
          <span>No blogs to show</span>
        </div>
      )}
    </div>
  );
};

export default CategoryBlogs;
