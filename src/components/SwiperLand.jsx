import { getImagePath } from "@/constant";
import { purifyHTML } from "@/constant";
import { useState, useEffect } from "react";

const SwiperLand = ({ landBlogImage, category, title, description }) => {
  let imagePath = getImagePath(landBlogImage);
  const { first40Words, sanitizedDescription } = purifyHTML(description);

  const [plainText, setPlainText] = useState("");

  useEffect(() => {
    const strippedContent = first40Words.replace(/<\/?[^>]+(>|$)/g, "");
    setPlainText(strippedContent);
  }, [sanitizedDescription]);

  return (
    <div className="relative h-[35rem] bg-gray-200">
      <img src={imagePath} alt="oxford-colllege-img" className="w-full" />
      <div>
        <div className="absolute top-[30%] right-20 bg-white w-[35%]">
          <div className="px-6 py-10">
            <h5 className="text-center text-red-color text-sm">{category}</h5>
            <h3 className="text-center text-2xl font-semibold">{title}</h3>
            <div className="text-center text-red-color text-sm">
              <span>November 2, 2020</span>
            </div>
            <p className="mt-1 break-words">{plainText}...</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SwiperLand;
