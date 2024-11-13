import about from "@/assets/about.jpg";
import Button from "@/components/Button";
import { Link, useNavigate } from "react-router-dom";
import { blogCategories, navOptions } from "@/static-data";
import { useDispatch, useSelector } from "react-redux";
import { getIsLoggedIn } from "@/redux/UserSlice";
import { getAllBlogs, getBlogStatus, setCategoryName } from "@/redux/BlogSlice";
import { formatDate, getImagePath } from "@/constant";
import Loading from "@/components/Loading";
import { getBlogDetails } from "@/redux/BlogSlice";

const Sidebar = ({ margin }) => {
  const isLoggedIn = useSelector(getIsLoggedIn);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const allBlogs = useSelector(getAllBlogs);
  const blogStatus = useSelector(getBlogStatus);

  const categoryBlogHandler = (categoryName) => {
    dispatch(setCategoryName(categoryName));
    navigate("/category");
  };

  const showBlogDetailsHandler = (blogId) => {
    dispatch(getBlogDetails(blogId));
    navigate(`/details/${blogId}`);
  };

  return (
    <div
      className={`col-span-2 border border-gray-300 p-4 text-second-color h-[120rem] mt-6 md:mt-0 ${
        margin && "my-6"
      }`}
    >
      <div>
        <div>
          <input
            type="search"
            id="search"
            placeholder="Search and Hit Enter..."
            className="p-4 w-full h-12 border border-gray-300"
          />
        </div>
        <div className="mt-6 border p-6 h-[35rem] bg-white border border-gray-300">
          <h5 className="pb-3 text-lg font-semibold">About Us</h5>
          <div>
            <img src={about} alt="oxford-blog-about" />
          </div>
          <div className="mt-4">
            <p>
              Pilaf with pork To prepare this recipe for pilaf, for neededtoadd:
              pieces of pork pulp carrot bulb onions rice spices: cumin,
              barberry, dried tomato, paprika, turmerics I not have the number.
              All proved highly dependent on the size and how much you want to
              cook pilaf. Just remember that meat, onions and carrots should be
              .....
            </p>
          </div>
        </div>
      </div>
      <div className="mt-6 border p-6 bg-white border border-gray-300">
        <h5 className="pb-3 text-lg font-semibold">Categories</h5>
        <div>
          <ul>
            {blogCategories.map((category, index) => {
              return (
                <li
                  className="py-2 text-sm text-red-color cursor-pointer"
                  key={index}
                  onClick={() => categoryBlogHandler(category.title)}
                >
                  {category.title}
                </li>
              );
            })}
            <li
              className="py-2 text-sm text-red-color cursor-pointer"
              onClick={() => categoryBlogHandler("Other Blog")}
            >
              Other Blog
            </li>
          </ul>
        </div>
      </div>
      <div className="mt-6 border p-6 bg-white border border-gray-300">
        <h5 className="pb-3 text-lg font-semibold">Recent Posts</h5>
        <div>
          {blogStatus === "idle" &&
            allBlogs?.length !== 0 &&
            allBlogs?.slice(0, 6)?.map((blog, index) => {
              return (
                <div className="flex gap-3 py-4" key={index}>
                  <div
                    onClick={() => showBlogDetailsHandler(blog.id)}
                    className="cursor-pointer"
                  >
                    <img
                      src={getImagePath(blog.image)}
                      alt="oxford-blog-image"
                      className="w-[5rem] h-full object-cover"
                    />
                  </div>
                  <div>
                    <h4>{blog.title}</h4>
                    <span className="text-sm text-red-color">
                      {formatDate(blog.created_at)}
                    </span>
                  </div>
                </div>
              );
            })}
          {blogStatus === "loading" && (
            <div className="flex justify-center h-[15rem]">
              <Loading />
            </div>
          )}
        </div>
      </div>
      <div className="py-6 text-center">
        <Link to="/write-blog">
          <Button
            title="Write your blog"
            className="w-full"
            disabled={!isLoggedIn}
          />
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
