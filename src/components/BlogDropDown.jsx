import React, { useContext } from "react";
import { Select } from "antd";
import BlogContext from "@/context/BlogContext";

const options = [
  {
    value: "Tech Trends Blog",
    label: "Tech Trends Blog",
  },
  {
    value: "Student Life Blog",
    label: "Student Life Blog",
  },
  {
    value: "Tech Tutorial Blog",
    label: "Tech Tutorial Blog",
  },
  {
    value: "Career and Internship Blog",
    label: "Career and Internship Blog",
  },
  {
    value: "College News Blog",
    label: "College News Blog",
  },
  {
    value: "Other Blog",
    label: "Other Blog",
  },
];

const BlogDropDown = () => {
  const { setCategoryHandler, category } = useContext(BlogContext);

  return (
    <Select
      onChange={setCategoryHandler}
      options={options}
      className="h-[2.8rem] w-full z-[0]"
      value={category || "Enter Blog Category"}
    />
  );
};
export default BlogDropDown;
