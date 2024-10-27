import Comment from "@/components/Comment";
import Button from "@/components/Button";
import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getComments,
  getPostStatus,
  getSocialStatus,
  giveComment,
} from "@/redux/SocialSlice";
import { CommentSkeleton } from "@/UI/Skeleton";
import Loading from "@/components/Loading";
import { toast } from "react-toastify";
import { getIsLoggedIn } from "@/redux/UserSlice";

const GiveComment = ({ blogDetails }) => {
  const commentRef = useRef();
  const dispatch = useDispatch();
  const comments = useSelector(getComments);

  const socialStatus = useSelector(getSocialStatus);
  const postStatus = useSelector(getPostStatus);
  const isLoggedIn = useSelector(getIsLoggedIn);

  const giveCommentHandler = () => {
    let commentContent = commentRef.current?.value;
    if (!commentContent) {
      toast("Please write your comment!");
    }
    dispatch(giveComment(blogDetails.id, commentContent));
    commentRef.current.value = "";
  };

  return (
    <div>
      <div>
        <h3 className="text-xl">LEAVE A REPLY</h3>
        <div className="py-3">
          <textarea
            placeholder="Write your comment here"
            className="w-full h-[10rem] bg-transparent border border-gray-300 p-3"
            ref={commentRef}
          ></textarea>
          <div className="py-3 flex items-center gap-6">
            <Button
              title={postStatus === "loading" ? "Loading..." : "Submit"}
              onClick={giveCommentHandler}
              disabled={!isLoggedIn}
            />
            {postStatus === "loading" && <Loading />}
          </div>
        </div>
      </div>
      <div>
        <h3 className="text-xl">All Comments</h3>
        {socialStatus === "loading" && (
          <>
            {comments.map((_, index) => {
              return <CommentSkeleton key={index} />;
            })}
          </>
        )}
        {socialStatus === "idle" && comments?.length !== 0 && (
          <>
            {comments.map((comment, index) => {
              return <Comment comment={comment} key={index} />;
            })}
          </>
        )}
        {socialStatus === "idle" && comments?.length === 0 && (
          <>
            <div className="mt-2">
              <span>0 Comments</span>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
export default GiveComment;
