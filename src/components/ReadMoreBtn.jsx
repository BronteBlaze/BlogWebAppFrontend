import { getBlogDetails } from "@/redux/BlogSlice";
import { obtainComments } from "@/redux/SocialSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";

const ReadMoreBtn = ({ blogId }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const showBlogDetailsHandler = () => {
    dispatch(getBlogDetails(blogId));
    navigate(`/details/${blogId}`);
  };

  return (
    <div>
      <button
        type="button"
        className="text-red-color"
        onClick={showBlogDetailsHandler}
      >
        Read More
      </button>
    </div>
  );
};

export default ReadMoreBtn;
