import { useSelector } from "react-redux";
import ReadMoreBtn from "./ReadMoreBtn";
import { FaRegComment } from "react-icons/fa";
import { getIsLoggedIn } from "@/redux/UserSlice";
import { useState, useEffect } from "react";
import { getImagePath, purifyHTML } from "@/constant";

const Blog = ({
  title,
  postDate,
  image,
  description,
  category,
  index,
  blogId,
}) => {
  const isLoggedIn = useSelector(getIsLoggedIn);

  const imagePath = getImagePath(image);

  const { first100Words, sanitizedDescription } = purifyHTML(description);

  const [plainText, setPlainText] = useState("");

  useEffect(() => {
    const strippedContent = first100Words.replace(/<\/?[^>]+(>|$)/g, "");
    setPlainText(strippedContent);
  }, [sanitizedDescription]);

  return (
    <div
      className={`md:px-10 p-6 bg-white text-second-color border border-gray-300`}
    >
      {index > 4 && !isLoggedIn && (
        <div className="absolute top-[80%] right-0 bottom-0 left-0 bg-gradient-to-t from-[rgba(255,255,255,1)] via-[rgba(255,255,255,0.7)] to-[rgba(255,255,255,0)]">
          <div className="invisible">Oxford Blog</div>
        </div>
      )}
      <div className="">
        <div className="text-center text-sm text-red-color">
          <h5>{category}</h5>
        </div>
        <div className="text-center text-2xl text-heading-color font-semibold py-1">
          <h2>{title}</h2>
        </div>
        <div className="text-center text-sm text-red-color">
          <span>{postDate}</span>
        </div>
        <div className="py-3">
          <img
            src={imagePath}
            alt="oxford-blog-image"
            className="md:h-[14rem] h-[10rem] w-full object-cover"
          />
        </div>
        <div className="h-[12rem] break-words overflow-hidden">
          {plainText}...
        </div>
        <div className="flex items-center justify-between mt-4">
          <ReadMoreBtn blogId={blogId} />
          <div className="text-xl">
            <FaRegComment />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blog;
