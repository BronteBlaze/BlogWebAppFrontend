import BlogDropDown from "@/components/BlogDropDown";
import Wrapper from "@/components/Wrapper";
import BlogContext from "@/context/BlogContext";
import { useContext } from "react";

const BlogForm = () => {
  const { setTitleHandler, setImageHandler } = useContext(BlogContext);

  const { title } = useContext(BlogContext);

  return (
    <Wrapper className="py-6">
      <div className="border border-gray-300 py-8 bg-main-color text-white">
        <form className="px-12 mt-3">
          <h4 className="text-lg">Blog Information</h4>
          <div className="py-3">
            <input
              type="title"
              id="title"
              name="title"
              className="border border-gray-300 h-11 w-full text-black rounded-md p-3"
              placeholder="E.g: Favourite C++"
              onChange={setTitleHandler}
              value={title}
            />
          </div>
          <div className="w-full py-3">
            <div className="text-sm font-medium whitespace-nowrap">
              <label htmlFor="category">Category</label>
            </div>
            <div className="mt-2">
              <BlogDropDown />
            </div>
          </div>
          <div className="py-3">
            <div className="text-sm font-medium whitespace-nowrap">
              <label htmlFor="blog_thumbnail">Upload Thumbnail</label>
            </div>
            <div className="mt-2">
              <input
                type="file"
                id="blog_thumbnail"
                name="blog_thumbnail"
                onChange={setImageHandler}
                inputClass="w-full"
              />
            </div>
          </div>
        </form>
      </div>
    </Wrapper>
  );
};

export default BlogForm;
