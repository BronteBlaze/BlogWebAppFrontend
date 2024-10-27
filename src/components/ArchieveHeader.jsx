import { useSelector } from "react-redux";
import Wrapper from "./Wrapper";
import { getMonthInfo } from "@/redux/BlogSlice";

const ArchieveHeader = () => {
  const { monthName } = useSelector(getMonthInfo);
  return (
    <Wrapper>
      <div className="bg-white border border-gray-300 my-6 text-center py-6">
        <div className="uppercase">
          <h5>Browsing Archieves:</h5>
        </div>
        <div className="text-2xl font-semibold py-2">
          <h2>{monthName}</h2>
        </div>
        <div className="">
          <p>Here, you can view the articles that is posted on {monthName}</p>
        </div>
      </div>
    </Wrapper>
  );
};

export default ArchieveHeader;
