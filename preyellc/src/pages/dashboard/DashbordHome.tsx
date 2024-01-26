import { useAuthContext } from "../../context/AuthContext";

type Props = {};

const DashbordHome = (props: Props) => {
  const { user } = useAuthContext();
  return (
    <section className="w-full py-4">
      <div className="w-full lg:w-[25rem] px-2 h-fit rounded-md border">
        <p className="py-2 border-b">Below are your details</p>
        <div className="flex items-baseline justify-between py-2 text-gray-500">
          <div className="flex flex-col text-[.9rem] ">
            <p>username: {user.username}</p>
            <p>user email: {user.email} </p>
          </div>
          <p className="text-[.9rem]">ID:{user.id.slice(0, 5)}</p>
        </div>
      </div>
    </section>
  );
};

export default DashbordHome;
