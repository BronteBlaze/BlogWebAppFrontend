import { useNavigate } from "react-router";
import { NavLink } from "react-router-dom";

const options = [
  {
    option: "Your Profile",
    link: "/user/profile",
  },
  {
    option: "Manage Post",
    link: "/user/blogs",
  },
];

const Sidebar = () => {
  return (
    <div className="col-span-2 border bg-main-color p-6">
      <div className="text-xl text-white font-semibold border-b border-gray-300 pb-2">
        <h2>User Info</h2>
      </div>
      <div className="text-white text-lg mt-6">
        {options.map((opt, index) => {
          return (
            <NavLink to={opt.link} key={index}>
              {({ isActive }) => {
                return (
                  <div
                    className={`mt-2 w-full ${
                      !isActive ? "" : "bg-[rgba(0,0,0,0.2)]"
                    } hover:bg-[rgba(0,0,0,0.5)] p-2 cursor-pointer`}
                  >
                    <button type="button" className="">
                      {opt.option}
                    </button>
                  </div>
                );
              }}
            </NavLink>
          );
        })}
      </div>
    </div>
  );
};

export default Sidebar;
