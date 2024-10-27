import { formatDate, getProfilePath } from "@/constant";
import { getDeleteStatus, removeComment } from "@/redux/SocialSlice";
import { useDispatch, useSelector } from "react-redux";
import Loading from "./Loading";
import { useState } from "react";
import { getIsLoggedIn, getUserData } from "@/redux/UserSlice";
import user from "@/assets/user.png";

const Comment = ({ comment }) => {
  const dispatch = useDispatch();

  const deleteStatus = useSelector(getDeleteStatus);
  const userData = useSelector(getUserData);
  const [deleteId, setDeleteId] = useState(null);

  const removeCommentHandler = () => {
    setDeleteId(comment.id);
    dispatch(removeComment(comment.id));
  };

  const isLoggedIn = useSelector(getIsLoggedIn);

  return (
    <div className="py-3 border-b border-gray-300">
      <div className="flex items-center justify-between">
        <div className="w-[80%]">
          <div>
            <div className="flex items-center gap-2">
              {userData?.profile_pic && (
                <img
                  src={getProfilePath(comment?.user?.profile_pic)}
                  alt="oxford-blog-image"
                  className="rounded-[50%] h-[3rem] w-[3rem] object-cover"
                />
              )}
              {!userData?.profile_pic && (
                <img
                  src={user}
                  alt="oxford-blog-image"
                  className="rounded-[50%] h-[3rem] w-[3rem] object-cover bg-gray-100"
                />
              )}
              <div>
                <h4>
                  {comment?.user?.first_name + " " + comment?.user?.last_name}
                </h4>
                <span className="text-sm text-red-color">
                  {formatDate(comment?.created_at)}
                </span>
              </div>
            </div>
          </div>
          <div className="mt-2">
            <span className="text-sm text-head-color">{comment?.content}</span>
          </div>
        </div>
        <div className="text-sm">
          {isLoggedIn && (
            <button
              type="button"
              className="text-red-color"
              onClick={removeCommentHandler}
            >
              {deleteStatus === "loading" && deleteId === comment.id ? (
                <Loading />
              ) : userData?.user.id === comment.author_id ? (
                "Remove"
              ) : (
                ""
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Comment;
