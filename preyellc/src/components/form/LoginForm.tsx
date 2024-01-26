import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { axiosClient } from "../../api/axios";
import * as yup from "yup";
import { useFormik } from "formik";
import { useState } from "react";
import { useAuthContext } from "../../context/AuthContext";
import Spinner from "../ui/Spinner";

const LoginForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { getToken, handleSetUser } = useAuthContext();
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: yup.object({
      email: yup
        .string()
        .email("Invalid email address")
        .required("Email is required!"),
      password: yup
        .string()
        .min(8, "Password Must be 8 or more characters long")
        .required("Password is required!"),
    }),

    onSubmit: async (values, { setSubmitting }) => {
      try {
        setIsLoading(true);
        const { data } = await axiosClient.post("/auth/login", values);
        toast.success(data.message);
        getToken(data.accessToken);
        handleSetUser(data.user);
        navigate("/");
        setIsLoading(false);
        return;
      } catch (error) {
        setIsLoading(false);
        toast.error(error.response.data.message);
      } finally {
        setSubmitting(false);
      }
    },
  });
  return (
    <form
      onSubmit={formik.handleSubmit}
      action=""
      className="flex flex-col gap-4"
    >
      <div className="w-full flex flex-col gap-1">
        <label htmlFor="">Email</label>
        <input
          type="email"
          name="email"
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          value={formik.values.email}
          className="p-2 border focus:outline-none rounded-md"
          placeholder="Enter your email"
        />
        {formik.touched.email && formik.errors.email ? (
          <small className="text-red-500">{formik.errors.email}</small>
        ) : null}
      </div>
      <div className="w-full flex flex-col gap-1">
        <label htmlFor="">Password</label>
        <input
          type="password"
          name="password"
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          value={formik.values.password}
          className="p-2 border focus:outline-none rounded-md"
          placeholder="Enter your password"
        />
        {formik.touched.password && formik.errors.password ? (
          <small className="text-red-500">{formik.errors.password}</small>
        ) : (
          <small>Must be at least 8 characters.</small>
        )}
      </div>
      <div className="w-full flex gap-1 items-center justify-between">
        <div className="flex w-fit gap-2 items-center">
          <input type="checkbox" name="remember" id="remember" />
          <label htmlFor="remember" className="">
            Remember for 30 days
          </label>
        </div>
        <Link
          to={``}
          className="text-primary-purple  font-medium hover:underline"
        >
          Forgot password
        </Link>
      </div>
      <button
        type="submit"
        className="p-2 text-center rounded-md w-full bg-primary-purple text-white"
      >
        {isLoading ? <Spinner /> : "Sign in"}
      </button>
    </form>
  );
};

export default LoginForm;
