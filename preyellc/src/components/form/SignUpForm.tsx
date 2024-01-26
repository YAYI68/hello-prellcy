import { useFormik } from "formik";
import { useState } from "react";
import { axiosClient } from "../../api/axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { useAuthContext } from "../../context/AuthContext";
import Spinner from "../ui/Spinner";

const SignUpForm = () => {
  const { getToken } = useAuthContext();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      username: "",
      password: "",
    },
    validationSchema: yup.object({
      name: yup.string().required("Fullname is required!"),
      username: yup.string().required("Username is required"),
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
        const { data } = await axiosClient.post("/auth/register", values);
        toast.success(data.message);
        console.log({ data });
        const otp = data.Otp;
        const token = data.accessToken;
        getToken(token);
        navigate("/otp", { state: { otp } });
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
        <label htmlFor="">Name*</label>
        <input
          type="text"
          name="name"
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          className="p-2 border focus:outline-none rounded-md"
          placeholder="Enter your name"
        />
        {formik.touched.name && formik.errors.name ? (
          <small className="text-red-500">{formik.errors.name}</small>
        ) : null}
      </div>
      <div className="w-full flex flex-col gap-1">
        <label htmlFor="">Username*</label>
        <input
          type="text"
          name="username"
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          className="p-2 border focus:outline-none rounded-md"
          placeholder="Enter your username"
        />
        {formik.touched.username && formik.errors.username ? (
          <small className="text-red-500">{formik.errors.username}</small>
        ) : null}
      </div>
      <div className="w-full flex flex-col gap-1">
        <label htmlFor="">Email*</label>
        <input
          type="email"
          name="email"
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          className="p-2 border focus:outline-none rounded-md"
          placeholder="Enter your email"
        />
        {formik.touched.email && formik.errors.email ? (
          <small className="text-red-500">{formik.errors.email}</small>
        ) : null}
      </div>
      <div className="w-full flex flex-col gap-1">
        <label htmlFor="">Password*</label>
        <input
          type="password"
          name="password"
          onChange={formik.handleChange}
          className="p-2 border focus:outline-none rounded-md"
          placeholder="Enter your password "
        />
        {formik.touched.password && formik.errors.password ? (
          <small className="text-red-500">{formik.errors.password}</small>
        ) : (
          <small>Must be at least 8 characters.</small>
        )}
      </div>
      <button
        type="submit"
        className="p-2 text-center rounded-md w-full bg-primary-purple text-white"
      >
        {isLoading ? <Spinner /> : "Creat account"}
      </button>
    </form>
  );
};

export default SignUpForm;
