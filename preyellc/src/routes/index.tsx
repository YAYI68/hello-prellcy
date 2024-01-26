import { createBrowserRouter } from "react-router-dom";
import { AuthLayout } from "../components/layout";
import { AccountSuccess, Login, Otp, SignUp } from "../pages";
import { DashboardLayout } from "../components/layout/dashboard";
import { DashbordHome } from "../pages/dashboard";
import { ProtectedRoute } from "../components/guard";

export const router = createBrowserRouter([
  {
    element: <AuthLayout />,
    children: [
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <SignUp />,
      },
    ],
  },
  {
    path: "/otp",
    element: <Otp />,
  },
  {
    element: <ProtectedRoute />,
    children: [
      {
        path: "/success",
        element: <AccountSuccess />,
      },
      {
        element: <DashboardLayout />,
        children: [
          {
            path: "",
            element: <DashbordHome />,
          },
        ],
      },
    ],
  },
]);
