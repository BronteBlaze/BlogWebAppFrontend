import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export const BlogSkeleton = () => {
  return (
    <SkeletonTheme color="#e0e0e0" highlightColor="#f5f5f5">
      <div
        className={`px-10 py-6 bg-white text-second-color border border-gray-300`}
      >
        <div className="">
          <div className="text-center text-sm text-red-color">
            <h5>
              <Skeleton />
            </h5>
          </div>
          <div className="text-center text-2xl text-heading-color font-semibold py-1">
            <h2>
              <Skeleton />
            </h2>
          </div>
          <div className="text-center text-sm text-red-color">
            <span>
              <Skeleton />
            </span>
          </div>
          <div className="py-3">
            <Skeleton className="h-[14rem]" />
          </div>
          <div className="">
            <Skeleton className="h-[13rem]" />
          </div>
          <div className="flex items-center justify-between mt-4">
            <div className="text-xl">
              <Skeleton />
            </div>
            <Skeleton circle={true} />
          </div>
        </div>
      </div>
    </SkeletonTheme>
  );
};

export const BlogDetailsSkeleton = () => {
  return (
    <SkeletonTheme color="#e0e0e0" highlightColor="#f5f5f5">
      <div className="col-span-5 p-6 border border-gray-300 my-6 text-heading-color">
        <div className="text-center">
          <div className="text-sm text-red-color">
            <span>
              <Skeleton />
            </span>
          </div>
          <div className="text-2xl font-semibold py-2">
            <h2>
              <Skeleton />
            </h2>
          </div>
          <div className="bordered-text text-sm text-red-color">
            <span>
              <Skeleton />
            </span>
          </div>
          <div className="py-6">
            <Skeleton className="h-[22rem]" />
          </div>
        </div>
        <div>
          <span className="font-semibold text-sm">
            <Skeleton className="h-[2rem]" />
          </span>
          <div className="flex items-center gap-2 justify-center py-2 text-white">
            <Skeleton />
          </div>
        </div>
        <div>
          <Skeleton className="h-[30rem]" />
        </div>
        <div className="text-red-color border border-gray-400 border-dashed p-3 text-lg my-4">
          <span>
            <Skeleton />
          </span>
        </div>
        <Skeleton className="h-[20rem]" />
        <Skeleton />
        <Skeleton />
        <Skeleton />
        <Skeleton />
        <Skeleton />
        <Skeleton />
        <Skeleton />
        <Skeleton className="h-[10rem]" />
      </div>
    </SkeletonTheme>
  );
};

export const LandHomeSkeleton = () => {
  return (
    <SkeletonTheme color="#e0e0e0" highlightColor="#f5f5f5">
      <div className="relative">
        <Skeleton className="h-[35rem]" />
        <div>
          <div className="absolute top-[30%] right-20 bg-white w-[35%]">
            <div className="px-6 py-10">
              <h5 className="text-center text-red-color text-sm">
                <Skeleton />
              </h5>
              <h3 className="text-center text-2xl font-semibold">
                <Skeleton />
              </h3>
              <div className="text-center text-red-color text-sm">
                <span>
                  <Skeleton />
                </span>
              </div>
              <p className="mt-1">
                <Skeleton className="h-[7rem]" />
              </p>
            </div>
          </div>
        </div>
      </div>
    </SkeletonTheme>
  );
};

export const YourBlogSkeleton = () => {
  return (
    <SkeletonTheme color="#e0e0e0" highlightColor="#f5f5f5">
      <div className="mt-3 pb-3 border-b border-gray-300">
        <Skeleton className="h-[3rem] w-full" />
      </div>
    </SkeletonTheme>
  );
};

export const CommentSkeleton = () => {
  return (
    <SkeletonTheme color="#e0e0e0" highlightColor="#f5f5f5">
      <div className="py-3 border-b border-gray-300">
        <div>
          <div className="flex items-center gap-2">
            <Skeleton className="rounded-[50%] h-[3rem] w-[3rem] object-cover" />
            <div>
              <h4>
                <Skeleton />
              </h4>
              <span className="text-sm text-red-color">
                <Skeleton />
              </span>
            </div>
          </div>
        </div>
        <div className="mt-2">
          <span className="text-sm text-head-color">
            <Skeleton className="h-[4rem]" />
          </span>
        </div>
      </div>
    </SkeletonTheme>
  );
};
