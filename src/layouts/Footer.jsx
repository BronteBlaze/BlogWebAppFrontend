import logo from "@/assets/logo1.jpg";
import { months, navOptions } from "@/static-data";
import Wrapper from "@/components/Wrapper";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setMonthInfo } from "@/redux/BlogSlice";

const Footer = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const monthBlogHandler = (monthNumber, monthName) => {
    dispatch(setMonthInfo({ monthName, monthNumber }));
    navigate("/archieves");
  };
  return (
    <div className="bg-white pt-10">
      <Wrapper>
        <div className="grid grid-cols-4 gap-12 text-second-color">
          <div>
            <img src={logo} alt="oxoford-logo-img" className="w-full" />
            <div className="mt-4">
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Aliquam vero voluptates, laudantium labore optio dolorum,
                blanditiis aliquid unde reprehenderit modi aut voluptatem
                molestiae quis eos recusandae. Aliquid pos
              </p>
            </div>
          </div>
          <div className="justify-self-center">
            <div className="font-semibold text-lg">
              <h5>Quick Links</h5>
            </div>
            <ul className="text-second-color mt-4">
              {navOptions.map((option, index) => {
                return (
                  <Link to={option.link} key={index}>
                    <li className="py-2 hover:text-main-color">
                      {option.option}
                    </li>
                  </Link>
                );
              })}
            </ul>
          </div>
          <div className="">
            <div className="font-semibold text-lg">
              <h5>Archieves</h5>
            </div>
            <ul className="text-second-color mt-4 grid grid-cols-2">
              {months.map((option, index) => {
                return (
                  <li
                    key={index}
                    className="py-2 cursor-pointer hover:text-main-color"
                    onClick={() => monthBlogHandler(option.num, option.month)}
                  >
                    {option.month}
                  </li>
                );
              })}
            </ul>
          </div>
          <div>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3532.498171921732!2d84.41325668411172!3d27.70190101478217!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3994fb423960c6a7%3A0xdb08a9095e14a464!2sOxford%20College%20of%20Engineering%20and%20Management!5e0!3m2!1sen!2snp!4v1726894088987!5m2!1sen!2snp"
              width="100%"
              height="100%"
              allowfullscreen=""
              loading="lazy"
              referrerpolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </Wrapper>
      <div className="bg-main-color text-center py-3 mt-8">
        <div className="text-white">Copywright@ 2024 Blog Team Oxford</div>
      </div>
    </div>
  );
};

export default Footer;
