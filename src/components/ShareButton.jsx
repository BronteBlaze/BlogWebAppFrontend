import { FaFacebook } from "react-icons/fa";

const ShareButton = ({ url, title }) => {
  const shareToFacebookHandler = () => {
    const shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
      url
    )}&t=${encodeURIComponent(title)}`;
    window.open(shareUrl, "_blank", "width=600,height=400");
  };
  return (
    <div
      className="flex items-center gap-2 justify-center w-[20%] bg-[#3a579a] py-2 text-white mt-2 mb-6 cursor-pointer"
      onClick={shareToFacebookHandler}
    >
      <div className="text-lg">
        <FaFacebook />
      </div>
      <div className="text-lg">
        <span>Facebook</span>
      </div>
    </div>
  );
};

export default ShareButton;
