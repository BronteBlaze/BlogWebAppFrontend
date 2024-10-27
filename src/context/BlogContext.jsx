import { createContext, useState } from "react";

const BlogContext = createContext({
  title: "",
  image: "",
  category: "",
  description: "",
  setTitleHandler: () => {},
  setImageHandler: () => {},
  setCategoryHandler: () => {},
  changeTitleHandler: () => {},
  changeImageHandler: () => {},
  setDescriptionHandler: () => {},
  changeDescriptionHandler: () => {},
});

export const BlogContextProvider = ({ children }) => {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState(null);
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");

  const setTitleHandler = (event) => {
    setTitle(event.target?.value);
  };

  const changeTitleHandler = (blogTitle) => {
    setTitle(blogTitle);
  };

  const setImageHandler = (event) => {
    setImage(event.target.files[0]);
  };

  const changeImageHandler = () => {
    setImage(null);
  };

  const setDescriptionHandler = (content) => {
    setDescription(content);
  };

  const setCategoryHandler = (category) => {
    setCategory(category);
  };

  const changeDescriptionHandler = (content) => {
    setDescription(content);
  };

  return (
    <BlogContext.Provider
      value={{
        title: title,
        category: category,
        image: image,
        description: description,
        setCategoryHandler: setCategoryHandler,
        setImageHandler: setImageHandler,
        setTitleHandler: setTitleHandler,
        setDescriptionHandler: setDescriptionHandler,
        changeTitleHandler: changeTitleHandler,
        changeImageHandler: changeImageHandler,
        changeDescriptionHandler: changeDescriptionHandler,
      }}
    >
      {children}
    </BlogContext.Provider>
  );
};

export default BlogContext;
