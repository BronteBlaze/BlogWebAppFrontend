import { purifyHTML } from "@/constant";
import { useEffect, useState } from "react";
import { getImagePath } from "@/constant";
import { useDispatch } from "react-redux";
import { getBlogDetails, removeBlog, setBlogEditMode } from "@/redux/BlogSlice";
import { useLocation, useNavigate } from "react-router";
import { Link } from "react-router-dom";

const YourBlog = ({ blog }) => {
  const [plainText, setPlainText] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const { sanitizedDescription, first40Words } = purifyHTML(blog.description);

  useEffect(() => {
    const strippedContent = first40Words.replace(/<\/?[^>]+(>|$)/g, "");
    setPlainText(strippedContent);
  }, [sanitizedDescription]);

  const editModeHandler = () => {
    dispatch(setBlogEditMode({ blogId: blog.id, editMode: true }));
    dispatch(getBlogDetails(blog.id));
    navigate("/edit-blog");
  };

  const deleteBlogHandler = () => {
    dispatch(removeBlog(blog.id));
    navigate(location.pathname);
  };

  const getDetailsHandler = () => {
    dispatch(getBlogDetails(blog.id));
    navigate(`/details/${blog.id}`);
  };

  return (
    <div className="flex items-center justify-between mt-3 pb-3 border-b border-gray-300 overflow-hidden">
      <div className="flex items-center gap-2 break-words w-[85%]">
        <img
          src={getImagePath(blog.image)}
          alt="oxford-blog-image"
          className="rounded-[50%] h-[3rem] w-[3rem] object-cover bg-gray-100"
        />
        <div className="w-[90%]">
          <h4 className="font-semibold">{blog.title}</h4>
          <div className="">{plainText.slice(0, 150)}</div>
          <div>
            <button
              type="button"
              className="text-sm text-main-color"
              onClick={getDetailsHandler}
            >
              Read Details...
            </button>
          </div>
        </div>
      </div>
      <div className="flex items-ceneter gap-6">
        <button
          type="button"
          className="text-main-color"
          onClick={editModeHandler}
        >
          Edit
        </button>
        <button
          type="button"
          className="text-red-color"
          onClick={deleteBlogHandler}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default YourBlog;
