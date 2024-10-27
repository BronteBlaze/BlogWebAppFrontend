import "@/App.css";
import { Routes, Route, useLocation, useNavigate } from "react-router";
// import RegisterPage from "./pages/RegisterPage";
import { AnimatePresence, motion } from "framer-motion";
// import LoginPage from "./pages/LoginPage";
import { lazy, Suspense, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { checkAuth, getIsLoggedIn, getUserData } from "./redux/UserSlice";
import Loading from "./components/Loading";
import { loadingCenter } from "./components/styles";
import wait from "./components/wait";
import AdminPage from "./pages/AdminPage";
import { Navigate } from "react-router";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import WriteYourBlogPage from "./pages/WriteYoutBlogPage";
// import BlogDetailsPage from "./pages/BlogDetailsPage";
import UserProfilePage from "./pages/UserProfilePage";
import Profile from "./layouts/UserProfilePage/Profile";
import ManageBlog from "./layouts/UserProfilePage/ManageBlog";

const LazyHomePage = lazy(() =>
  wait(2000).then(() => import("@/pages/HomePage"))
);
const LazyLoginPage = lazy(() =>
  wait(1000).then(() => import("@/pages/LoginPage"))
);
const LazyRegisterPage = lazy(() =>
  wait(1000).then(() => import("@/pages/RegisterPage"))
);
const LazyBlogDetailsPage = lazy(() =>
  wait(1000).then(() => import("@/pages/BlogDetailsPage"))
);
const LazyWriteYourBlogPage = lazy(() =>
  wait(1000).then(() => import("@/pages/WriteYoutBlogPage"))
);
const LazyUserProfilePage = lazy(() =>
  wait(1000).then(() => import("@/pages/UserProfilePage"))
);
const LazyCategoryPage = lazy(() =>
  wait(1000).then(() => import("@/pages/CategoryPage"))
);
const LazyArchievesPage = lazy(() =>
  wait(1000).then(() => import("@/pages/ArchievePage"))
);

const App = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const isLoggedIn = useSelector(getIsLoggedIn);
  const userData = useSelector(getUserData);

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (token) {
      dispatch(checkAuth());
    }

    if (isLoggedIn) {
      const {
        user: { role },
      } = userData;
      if (role === "user") navigate(location.pathname);
      if (role === "superadmin") navigate("/admin");
    }
  }, [isLoggedIn]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.key}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        exit={{ opacity: 0 }}
      >
        <ToastContainer />
        <Suspense
          fallback={
            <div className={loadingCenter}>
              <Loading />
            </div>
          }
        >
          <Routes>
            <Route path="/" element={<LazyHomePage />}></Route>
            {!isLoggedIn && (
              <Route path="/signup" element={<LazyRegisterPage />}></Route>
            )}
            {!isLoggedIn && (
              <Route path="/signin" element={<LazyLoginPage />}></Route>
            )}
            {isLoggedIn && (
              <Route
                path="/write-blog"
                element={<LazyWriteYourBlogPage />}
              ></Route>
            )}
            {isLoggedIn && (
              <Route
                path="/edit-blog"
                element={<LazyWriteYourBlogPage />}
              ></Route>
            )}
            <Route
              path="/details/:id"
              element={<LazyBlogDetailsPage />}
            ></Route>
            <Route path="/category" element={<LazyCategoryPage />}></Route>
            <Route path="/archieves" element={<LazyArchievesPage />}></Route>
            {isLoggedIn && (
              <Route path="/user" element={<LazyUserProfilePage />}>
                <Route path="profile" element={<Profile />} />
                <Route path="blogs" element={<ManageBlog />} />
              </Route>
            )}
            {isLoggedIn && token && userData?.user?.role === "superadmin" && (
              <Route path="/admin" element={<AdminPage />}></Route>
            )}
            <Route
              path="*"
              element={
                <Navigate
                  to={
                    userData?.user?.role === "user"
                      ? "/"
                      : userData?.user?.role === "superadmin"
                      ? "/admin"
                      : "/"
                  }
                />
              }
            ></Route>
          </Routes>
        </Suspense>
      </motion.div>
    </AnimatePresence>
  );
};

export default App;
