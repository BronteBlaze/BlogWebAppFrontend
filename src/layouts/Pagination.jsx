import React, { useState, useEffect } from "react";
import { Pagination } from "antd";
import Wrapper from "@/components/Wrapper";
import { useDispatch, useSelector } from "react-redux";
import { getIsLoggedIn } from "@/redux/UserSlice";
import {
  getAllBlogsDetails,
  getBlogStatus,
  getYourBlogs,
  obtainAllBlogs,
  userBlogs,
} from "@/redux/BlogSlice";

const PaginationComponent = ({ yours }) => {
  const isLoggedIn = useSelector(getIsLoggedIn);
  const blogStatus = useSelector(getBlogStatus);

  const { last_page } = useSelector(getAllBlogsDetails);
  const { last_page: yourLastPage } = useSelector(getYourBlogs);

  const dispatch = useDispatch();

  const [currentPage, setCurrentPage] = useState(1);
  const [yourCurrentPage, setYourCurrentPage] = useState(1);

  const [pageSize, setPageSize] = useState(8);
  const [pageSizeSpecial, setPageSizeSpecial] = useState(4);

  const [totalItems, setTotalItems] = useState(last_page);
  const [yourTotalItems, setYourTotalItems] = useState(yourLastPage);

  useEffect(() => {
    if (!yours) {
      dispatch(obtainAllBlogs(currentPage));
      if (last_page) {
        setTotalItems(last_page);
      }
    }
  }, [currentPage, last_page, dispatch]);

  useEffect(() => {
    if (yours) {
      dispatch(userBlogs(yourCurrentPage));
      if (yourLastPage) {
        setYourTotalItems(yourLastPage);
      }
    }
  }, [yourCurrentPage, yourLastPage, dispatch]);

  const itemRender = (page, type, originalElement) => {
    if (type === "prev") {
      return <a>Prev</a>;
    }
    if (type === "next") {
      return <a>Next</a>;
    }
    return originalElement;
  };

  return (
    <Wrapper className="py-10 relative">
      <Pagination
        defaultCurrent={1}
        total={
          !yours ? totalItems * pageSize : yourTotalItems * pageSizeSpecial
        }
        current={!yours ? currentPage : yourCurrentPage}
        pageSize={!yours ? pageSize : pageSizeSpecial}
        itemRender={itemRender}
        showLessItems
        onChange={(page) => {
          if (!yours) {
            setCurrentPage(page);
          } else {
            setYourCurrentPage(page);
          }
        }}
        showSizeChanger={false}
      />
      {!isLoggedIn && blogStatus === "idle" && (
        <div className="absolute -top-12 left-[50%] translate-x-[-50%] translate-y-[-50%]">
          <div className="text-second-color italic">
            Login to view and post your blog article
          </div>
        </div>
      )}
      {!isLoggedIn && (
        <div className="absolute top-0 right-0 bottom-0 left-0 bg-gradient-to-b from-[rgba(255,255,255,1)] via-[rgba(255,255,255,0.7)] to-[rgba(255,255,255,0)]">
          <div className="invisible">Oxford Blog</div>
        </div>
      )}
    </Wrapper>
  );
};

export default PaginationComponent;
