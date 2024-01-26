import SideNavbar from "./SideNavbar";
import MobileHeader from "./MobileHeader";
import AssessmentHeader from "./AssessmentHeader";
import { Outlet, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuthContext } from "../../../context/AuthContext";
import { axiosClient } from "../../../api/axios";
import { toast } from "react-toastify";

const DashboardLayout = () => {
  const [openMobile, setOpenMobile] = useState(false);
  const { logout, accessToken } = useAuthContext();
  const navigate = useNavigate();

  const logUserOut = async () => {
    try {
      const { data } = await axiosClient.post(
        "/auth/logout",
        {},
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      toast.success(data.message);
      logout();
      navigate("/login");
      logout();
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
  return (
    <div className="w-full  flex">
      <SideNavbar
        logUserOut={logUserOut}
        openMobile={openMobile}
        setOpenMobile={setOpenMobile}
      />
      <aside className="w-full p-4 lg:w-[80%] flex flex-col">
        <div className="w-full flex flex-col gap-4">
          <MobileHeader setOpenMobile={setOpenMobile} />
          <AssessmentHeader logUserOut={logUserOut} />
        </div>
        <div className="w-full">
          <Outlet />
        </div>
      </aside>
    </div>
  );
};

export default DashboardLayout;
