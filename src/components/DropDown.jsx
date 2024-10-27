import React from "react";
import { Select } from "antd";
import { FaArrowDown } from "react-icons/fa";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { getYourBlogs, userBlogs } from "@/redux/BlogSlice";

const options = [
  {
    label: "Your Profile",
    value: "/user/profile",
  },
  {
    label: "Manage Your Blogs",
    value: "/user/blogs",
  },
];

const DropDown = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const yourBlogs = useSelector(getYourBlogs);

  const handleNavigation = (value) => {
    if (yourBlogs?.length === 0) {
      dispatch(userBlogs(1));
    }
    navigate(value);
  };

  return (
    <div className="">
      <Select
        defaultValue={`Profile`}
        options={options}
        className="h-[2.8rem] w-[10rem] bg-gray-100 rounded-xl text-heading-color"
        onChange={handleNavigation}
        bordered={false}
      />
    </div>
  );
};

export default DropDown;
