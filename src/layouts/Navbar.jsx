import { getIsLoggedIn, getUserData } from "@/redux/UserSlice";
import { navOptions } from "@/static-data";
import { FiSearch } from "react-icons/fi";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getProfilePath } from "@/constant";
import user from "@/assets/user.png";
import DropDown from "@/components/DropDown";

const Navbar = () => {
  const { profile_pic } = useSelector(getUserData);
  const isLoggedIn = useSelector(getIsLoggedIn);

  return (
    <div className="sticky top-0 z-[999] hidden lg:block">
      <div className="bg-white flex justify-center py-6">
        <ul className="flex items-center gap-16 text-lg text-second-color">
          {navOptions.map((option, index) => {
            return (
              <Link
                to={option.link}
                key={index}
                className="hover:text-main-color"
              >
                <li>{option.option}</li>
              </Link>
            );
          })}
          <li className="text-xl">
            <FiSearch />
          </li>
          <li>
            {isLoggedIn && (
              <div className="flex items-center gap-2 text-heading-color">
                {profile_pic && (
                  <img
                    src={getProfilePath(profile_pic)}
                    alt="profile-pic"
                    className="rounded-[50%] h-[3rem] w-[3rem] object-cover bg-gray-100"
                  />
                )}
                {!profile_pic && (
                  <img
                    src={user}
                    alt="profile-pic"
                    className="rounded-[50%] h-[3rem] w-[3rem] object-cover bg-gray-100"
                  />
                )}
                <DropDown />
              </div>
            )}
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
