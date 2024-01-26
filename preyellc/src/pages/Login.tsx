import { Link, useNavigate } from "react-router-dom";
import { LoginForm } from "../components/form";
import { useAuthContext } from "../context/AuthContext";
import { useEffect } from "react";

const Login = () => {
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
        <h2 className="text-[2rem]">Log in</h2>
        <p className="text-primary-dark-gray">
          Welcome back! Please enter your details.
        </p>
      </div>
      <div className="w-full">
        <LoginForm />
      </div>
      <div className="flex flex-col items-center">
        <p className="flex gap-2 ">
          <span>Don’t have an account?</span>
          <Link to={`/signup`} className="text-primary-purple hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </section>
  );
};

export default Login;
