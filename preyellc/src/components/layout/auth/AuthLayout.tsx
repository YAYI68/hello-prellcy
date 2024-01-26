import Header from "./Header";
import { Outlet } from "react-router-dom";
import Footer from "./Footer";

const AuthLayout = () => {
  return (
    <>
      <Header />
      <main className="h-[85vh] w-full flex flex-col items-center justify-center">
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default AuthLayout;
