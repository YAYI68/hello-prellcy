import { useEffect, useRef, useState } from "react";
// import { axiosInstance } from "../../utils/axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { axiosClient } from "../../api/axios";
import { useAuthContext } from "../../context/AuthContext";

const TokenInput = ({
  otp,
  index,
  activeOtpIndex,
  handleOnchange,
  handleOnKeyDown,
}) => {
  const inputRef = useRef(null);
  useEffect(() => {
    inputRef.current?.focus();
  }, [activeOtpIndex]);
  return (
    <input
      ref={index === activeOtpIndex ? inputRef : null}
      type="text"
      className="w-[2rem] h-[2rem] lg:h-[3rem] lg:w-[3rem] text-base lg:text-[2rem] border-2 rounded-md focus:outline-none border-primary text-center flex"
      // maxLength={1}
      onChange={handleOnchange}
      onKeyDown={(e) => handleOnKeyDown(e, index)}
      value={otp[index]}
    />
  );
};

let currentOtpIndex = 0;
const OtpForm = () => {
  const { accessToken } = useAuthContext();
  const [otp, setOpt] = useState([]);
  const [activeOtpIndex, setActiveOtpIndex] = useState(0);
  const navigate = useNavigate();
  console.log({ accessToken });
  const handleOnchange = (e) => {
    const { value } = e.target;
    let newOtp = [...otp];
    newOtp[currentOtpIndex] = value.substring(value.length - 1);
    setOpt(newOtp);
    if (!value) {
      setActiveOtpIndex(currentOtpIndex - 1);
    } else {
      setActiveOtpIndex(currentOtpIndex + 1);
    }
  };

  const handleOnKeyDown = (e, index) => {
    currentOtpIndex = index;
    if (e.key === "Backspace") {
      setActiveOtpIndex(currentOtpIndex - 1);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (otp.length < 6 || otp.length > 6) {
      toast.error("Kindly provide a vaild OTP display on the screen.");
      return;
    }

    const otpData = otp.join("");
    try {
      const { data } = await axiosClient.post(
        `/auth/activate`,
        {
          otp: otpData,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      toast.success(data.message);
      navigate("/login");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const arr1 = [0, 1, 2];
  const arr2 = [3, 4, 5];

  return (
    <form
      onSubmit={handleSubmit}
      action=""
      className="w-full  flex flex-col items-center gap-4 "
    >
      <div className="w-full flex justify-center items-center gap-4">
        {arr1.map((arr, index) => (
          <TokenInput
            key={index}
            index={arr}
            otp={otp}
            activeOtpIndex={activeOtpIndex}
            handleOnchange={handleOnchange}
            handleOnKeyDown={handleOnKeyDown}
          />
        ))}
        <div className="border-2  w-[3rem]"></div>
        {/* {Array.from({ length: 3 }, (_, index) => ( */}
        {arr2.map((arr, index) => (
          <TokenInput
            key={index}
            index={arr}
            otp={otp}
            activeOtpIndex={activeOtpIndex}
            handleOnchange={handleOnchange}
            handleOnKeyDown={handleOnKeyDown}
          />
        ))}
      </div>
      <button
        type="submit"
        className="w-[80%] lg:w-full bg-primary-purple text-white p-2 text-center block rounded-md"
      >
        Submit OTP
      </button>
    </form>
  );
};

export default OtpForm;
