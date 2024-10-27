import { useSelector } from "react-redux";
import Wrapper from "./Wrapper";
import { getCategoryName } from "@/redux/BlogSlice";

const CategoryHeader = () => {
  const categoryName = useSelector(getCategoryName);
  return (
    <Wrapper>
      <div className="bg-white border border-gray-300 my-6 text-center py-6">
        <div className="uppercase">
          <h5>Browsing Category:</h5>
        </div>
        <div className="text-2xl font-semibold py-2">
          <h2>{categoryName}</h2>
        </div>
        <div className="">
          <p>Here, you can view the articles related to {categoryName}</p>
        </div>
      </div>
    </Wrapper>
  );
};

export default CategoryHeader;
