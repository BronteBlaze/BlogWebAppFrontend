import Button from "@/components/Button";
import { useEffect, useMemo, useState } from "react";
import Wrapper from "@/components/Wrapper";
import BlogContext from "@/context/BlogContext";
import React, { useContext, useRef } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useDispatch, useSelector } from "react-redux";
import {
  getBlogDetails,
  getBlogEditMode,
  getBlogStatus,
  getDetails,
  postBlog,
  setBlogDetails,
  setBlogEditMode,
  updateBlog,
} from "@/redux/BlogSlice";
import { useLocation, useNavigate } from "react-router";
import Loading from "@/components/Loading";

const WriteYoutBlog = () => {
  const quillRef = useRef();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const blogStatus = useSelector(getBlogStatus);
  const { editMode, blogId } = useSelector(getBlogEditMode);

  const {
    description: blogDescription,
    title: blogTitle,
    category: blogCategory,
  } = useSelector(getDetails);

  const [postPopup, setPostPopup] = useState(false);
  const [postAccept, setPostAccept] = useState(false);

  const {
    title,
    category,
    image,
    description,
    changeTitleHandler,
    changeDescriptionHandler,
    setCategoryHandler,
    changeImageHandler,
    setDescriptionHandler,
  } = useContext(BlogContext);

  const handleSubmit = () => {
    const quillInstance = quillRef.current.getEditor();
    let content = quillInstance.root.innerHTML;
    if (content == "<p><br></p>") content = "";
    if (!title || !category || !image || content == "") {
      postBlogHandler(content);
      return;
    }
    setDescriptionHandler(content);
    setPostPopup(true);
  };

  useEffect(() => {
    if (postAccept) {
      postBlogHandler(description);
      navigate("/");
    }
  }, [postAccept]);

  const postBlogHandler = (content) => {
    const blogData = new FormData();

    blogData.append("title", title);
    blogData.append("category", category);
    blogData.append("description", content);
    blogData.append("image", image);

    if (!editMode) {
      dispatch(postBlog(blogData));
    } else {
      dispatch(updateBlog(blogData, blogId));
    }
  };

  const handleImageUpload = (file) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const quill = quillRef.current.getEditor();
      const range = quill.getSelection();

      // Check if range is valid
      if (range) {
        quill.insertEmbed(range.index, "image", reader.result);

        // Set image size using CSS
        const img = quill.root.querySelector(`img[src="${reader.result}"]`);
        if (img) {
          img.style.width = "100%";
          img.style.height = "auto";
        }
      } else {
        // If no selection, you might want to insert at the end
        quill.insertEmbed(quill.getLength(), "image", reader.result);
      }
    };
    reader.readAsDataURL(file);
  };

  const okPostHandler = () => {
    setPostAccept(true);
  };

  const declinePostHandler = () => {
    changeImageHandler(null);
    navigate(location.pathname);
  };

  useEffect(() => {
    if (location.pathname === "/write-blog") {
      dispatch(setBlogEditMode({ blogId: null, editMode: false }));
      setCategoryHandler("");
      setDescriptionHandler("");
      changeTitleHandler("");
      changeImageHandler(null);
    } else if (location.pathname === "/edit-blog") {
      dispatch(setBlogEditMode({ blogId: blogId, editMode: true }));
      setCategoryHandler(blogCategory);
      setDescriptionHandler(blogDescription);
      changeTitleHandler(blogTitle);
      changeImageHandler(null);
    }
  }, [location.pathname, blogTitle, blogCategory, blogDescription, editMode]);

  const modules = useMemo(
    () => ({
      toolbar: {
        container: [
          [{ header: [1, 2, false] }],
          ["bold", "italic", "underline", "strike"],
          [{ list: "ordered" }, { list: "bullet" }],
          ["link", "image"],
          [{ color: [] }, { background: [] }],
          [{ align: [] }],
          ["blockquote", "code-block"],
          ["clean"],
        ],
        handlers: {
          image: () => {
            const input = document.createElement("input");
            input.setAttribute("type", "file");
            input.setAttribute("accept", "image/*");
            input.onchange = () => {
              const file = input.files[0];
              handleImageUpload(file);
            };
            input.click();
          },
        },
      },
    }),
    []
  );

  return (
    <Wrapper className="pb-6">
      <ReactQuill
        ref={quillRef}
        style={{
          height: "100vh",
        }}
        modules={modules}
        className="quill-editor"
        value={description}
        onChange={changeDescriptionHandler}
      />
      <div className="mt-16 flex items-center gap-6">
        <Button
          title={blogStatus === "loading" ? "Posting..." : "Post"}
          type="button"
          onClick={handleSubmit}
        />
        {blogStatus === "loading" && <Loading />}
      </div>
      {postPopup && (
        <div className="fixed top-0 right-0 bottom-0 left-0 backdrop-blur-sm z-50">
          <div className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] z-50">
            <div className="bg-white p-12 rounded-lg z-[99999]">
              <div className="text-center z-50">
                <h3 className="text-2xl">
                  Are you sure want to post your article on our website?
                </h3>
                <p className="mt-1">
                  This aricle will be sent to admin for a review, Have a fun for
                  some time?<span>&#x1F60A;</span>
                </p>
                <div className="flex items-center justify-center mt-6 gap-6">
                  <Button
                    title={blogStatus === "loading" ? "Loading..." : "Yes"}
                    onClick={okPostHandler}
                  />
                  <Button title="No" onClick={declinePostHandler} />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </Wrapper>
  );
};
export default WriteYoutBlog;
