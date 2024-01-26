import { Link } from "react-router-dom";
import Check from "../assets/check.svg";

const AccountSuccess = () => {
  return (
    <section className="w-full flex flex-col items-center py-8">
      <div className="w-[90%] lg:w-[30%] text-center p-4 flex flex-col gap-4">
        <div className="flex flex-col items-center">
          <img src={Check} alt="check" />
        </div>
        <h3 className="text-[1.5rem] lg:text-[2rem] font-semibold">
          Account verified
        </h3>
        <p className="text-primary-dark-gray">Click below to log in.</p>
        <Link
          to={``}
          className="w-full bg-primary-purple text-white p-2 text-center block rounded-md"
        >
          Continue
        </Link>
      </div>
    </section>
  );
};

export default AccountSuccess;
