import { useLocation, useNavigate } from "react-router-dom";
import ReturnIcon from "@/assets/ReturnIcon.svg";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const isHomePage = location.pathname === "/";
  const handleBack = () => {
    navigate(-1); // 回上一頁
  };
  return (
    <div className="w-full fixed top-0 z-50 bg-[#2660A9] h-[56px]">
      <div className="flex h-full items-center pl-5">
        {!isHomePage && (
          <img
            src={ReturnIcon}
            alt="返回"
            onClick={handleBack}
            className="h-8 w-8 cursor-pointer"
          />
        )}
      </div>
    </div>
  );
};

export default Navbar;
