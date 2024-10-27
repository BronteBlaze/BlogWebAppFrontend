import { center } from "@/components/styles/index";
import { setCategoryName } from "@/redux/BlogSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";

const SwipCategory = ({ imgSrc, title }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const categoryBlogHandler = () => {
    dispatch(setCategoryName(title));
    navigate("/category");
  };

  return (
    <div className="relative">
      <div className="h-[15rem]">
        <img src={imgSrc} alt="oxford-blog-types" />
      </div>
      <div className="absolute top-0 left-0 right-0 bottom-0 bg-black/50">
        <span className="invisible">Oxford Blogs</span>
      </div>
      <div className="absolute top-3 right-3 bottom-3 left-3 border border-dashed">
        <span className="invisible">Oxford Blogs</span>
      </div>
      <div className={`${center}`}>
        <h5>
          <button
            type="button"
            className="bg-white border-none px-4 py-3 whitespace-nowrap border"
            onClick={categoryBlogHandler}
          >
            {title}
          </button>
        </h5>
      </div>
    </div>
  );
};

export default SwipCategory;
