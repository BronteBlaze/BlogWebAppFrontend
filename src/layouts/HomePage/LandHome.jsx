import Wrapper from "@/components/Wrapper";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperLand from "@/components/SwiperLand";
import SwipCategory from "@/components/SwipCategory";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import { blogCategories } from "@/static-data";
import { useSelector } from "react-redux";
import { getAllBlogs, getBlogStatus } from "@/redux/BlogSlice";
import { LandHomeSkeleton } from "@/UI/Skeleton";
import { useNavigate } from "react-router";

const LandHome = () => {
  const allBlogs = useSelector(getAllBlogs);
  const blogStatus = useSelector(getBlogStatus);
  const navigate = useNavigate();

  return (
    <Wrapper>
      <div className="py-4">
        {blogStatus === "idle" && allBlogs?.length !== 0 && (
          <Swiper
            slidesPerView={1}
            modules={[Autoplay]}
            autoplay={{
              delay: 2000,
            }}
            speed={1000}
            loop={true}
          >
            {allBlogs?.slice(0, 4)?.map((blog, index) => {
              return (
                <SwiperSlide key={index}>
                  <SwiperLand
                    landBlogImage={blog.image}
                    title={blog.title}
                    category={blog.category}
                    description={blog.description}
                  />
                </SwiperSlide>
              );
            })}
          </Swiper>
        )}
        {blogStatus === "loading" && <LandHomeSkeleton />}
        <div className="mt-4">
          <Swiper
            slidesPerView={3}
            spaceBetween={16}
            modules={[Autoplay]}
            autoplay={true}
            loop={true}
            breakpoints={{
              320: {
                slidesPerView: 1.1,
              },
              768: {
                slidesPerView: 2,
              },
              900: {
                slidesPerView: 3,
              },
            }}
          >
            {blogCategories.map((category, index) => {
              return (
                <SwiperSlide key={index}>
                  <SwipCategory
                    title={category.title}
                    imgSrc={category.image}
                  />
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
      </div>
    </Wrapper>
  );
};

export default LandHome;
