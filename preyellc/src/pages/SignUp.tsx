import { Link, useNavigate } from "react-router-dom";
import { SignUpForm } from "../components/form";
import { useAuthContext } from "../context/AuthContext";
import { useEffect } from "react";

const SignUp = () => {
  const { accessToken } = useAuthContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (accessToken) {
      navigate(`/`);
    }
  }, [accessToken, navigate]);
  return (
    <section className="flex flex-col w-[90%] lg:w-[40%] py-4 px-4 lg:py-[3rem] gap-8">
      <div className="w-full">
        <h2 className="text-[2rem]">Sign up</h2>
        <p className="text-primary-dark-gray">Start your 30-day free trial.</p>
      </div>
      <div className="w-full">
        <SignUpForm />
      </div>
      <div className="flex flex-col items-center">
        <p className="flex gap-2">
          <span>Already have an account?</span>
          <Link to={`/login`} className="text-primary-purple hover:underline">
            Log in
          </Link>
        </p>
      </div>
    </section>
  );
};

export default SignUp;
