import { Link, useLocation, useNavigate } from "react-router-dom";
import { OtpForm } from "../components/form";
import { HiOutlineArrowLeft } from "react-icons/hi";
import Logo from "../assets/Logo.svg";

const Otp = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const otp = location.state?.otp;

  // useEffect(() => {
  //   if (!otp) {
  //     navigate("/login");
  //   }
  // }, [otp, navigate]);

  return (
    <section className="w-full flex flex-col items-center py-8">
      <div className="w-[90%] lg:w-[30%] text-center p-4 flex flex-col gap-4">
        <div className="flex flex-col items-center">
          <img src={Logo} alt="logo" />
        </div>
        <h3 className="text-[1.5rem] lg:text-[2rem] font-semibold">
          Enter your verification code
        </h3>
        <p className="text-primary-dark-gray">
          Your OTP is {otp.slice(0, 3)}-{otp.slice(3)}. Resets in 00:30
        </p>
        <div className="flex flex-col items-center">
          <OtpForm />
        </div>
        <Link to={``} className="flex items-center justify-center gap-4">
          <span>
            <HiOutlineArrowLeft />
          </span>{" "}
          Back to sign up
        </Link>
      </div>
    </section>
  );
};

export default Otp;
