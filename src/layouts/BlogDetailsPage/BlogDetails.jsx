import DOMPurify from "dompurify";
import GiveComment from "./GiveComment";
import { getImagePath } from "@/constant";
import ShareButton from "@/components/ShareButton";
import { IoMdHeartEmpty } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { getLikeData, likeBlog } from "@/redux/SocialSlice";
import { getIsLoggedIn } from "@/redux/UserSlice";
import { useEffect } from "react";
import { formatDate } from "@/constant";

const BlogDetails = ({ blogDetails }) => {
  const sanitizedDescription = DOMPurify.sanitize(blogDetails.description);
  let imagePath = getImagePath(blogDetails.image);

  const dispatch = useDispatch();
  const likeData = useSelector(getLikeData);
  const isLoggedIn = useSelector(getIsLoggedIn);

  const likeBlogHandler = () => {
    dispatch(likeBlog(blogDetails.id));
  };

  return (
    <div className="col-span-5 p-6 border border-gray-300 my-6 text-heading-color bg-white">
      <div className="text-center">
        <div className="text-sm text-red-color">
          <span>{blogDetails.category}</span>
        </div>
        <div className="text-2xl font-semibold py-2">
          <h2>{blogDetails.title}</h2>
        </div>
        <div className="bordered-text text-sm text-red-color">
          <span>{formatDate(blogDetails?.created_at)}</span>
        </div>
        <div className="py-6 flex justify-center">
          <img src={imagePath} alt="oxford-blog-image" />
        </div>
      </div>
      {isLoggedIn && (
        <div className="flex gap-2 justify-end">
          <div className="text-2xl">
            <button
              onClick={likeBlogHandler}
              className={`${likeData?.liked ? "text-red-500" : ""}`}
            >
              <IoMdHeartEmpty />
            </button>
          </div>
          <div>
            <span className="font-semibold">{likeData?.likeCount}</span>
          </div>
        </div>
      )}
      <div className="">
        <span className="font-semibold text-sm">Share Post</span>
        <ShareButton
          url={`https://17c8-103-166-172-226.ngrok-free.app/share/blog/${blogDetails.id}`}
          title={blogDetails.title}
        />
      </div>
      <div
        dangerouslySetInnerHTML={{ __html: sanitizedDescription }}
        className="break-words"
      ></div>
      <div className="text-red-color border border-gray-400 border-dashed p-3 text-lg my-4">
        <span>{formatDate(blogDetails?.created_at)}</span>
      </div>
      <GiveComment blogDetails={blogDetails} />
    </div>
  );
};

export default BlogDetails;
