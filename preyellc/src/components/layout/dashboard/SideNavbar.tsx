import Logo from "../../../assets/Logo.svg";
import NavLinks from "./NavLinks";
import { RxExit } from "react-icons/rx";
import { LiaTimesSolid } from "react-icons/lia";
import React from "react";
import Avatar from "../../../assets/images/Avatar.png";
import { useAuthContext } from "../../../context/AuthContext";
type Props = {
  openMobile: boolean;
  setOpenMobile: React.Dispatch<React.SetStateAction<boolean>>;
  logUserOut: () => void;
};

const SideNavbar = (props: Props) => {
  const { openMobile, setOpenMobile, logUserOut } = props;
  const { user } = useAuthContext();
  return (
    <nav
      className={`${
        openMobile ? "w-[70%] absolute top-0 left-0 flex" : "hidden"
      } w-[70%] lg:static bg-white lg:flex lg:h-screen lg:w-[20%] px-4  border-r`}
    >
      <div className="h-full w-full flex flex-col justify-between py-4">
        <div className="h-[7vh] flex justify-between">
          <img src={Logo} />
          <button
            onClick={() => setOpenMobile(false)}
            className="lg:hidden  w-fit p-2"
          >
            <LiaTimesSolid size={25} />
          </button>
        </div>
        <div className="h-[80vh] py-2">
          <NavLinks setOpenMobile={setOpenMobile} />
        </div>
        <div className="h-[9vh] border-t p-2 flex justify-between items-center">
          <div className="flex gap-2">
            <div className="h-[2.5rem] w-[2.5rem] bg-blue-500 rounded-[50%]">
              <img src={Avatar} alt="Avatar" />
            </div>
            <div className="">
              <p className="text-xs">{user.username}</p>
              <p className="text-xs">{user.email}</p>
            </div>
          </div>
          <button onClick={logUserOut}>
            <RxExit />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default SideNavbar;
