import { useAuthContext } from "../../../context/AuthContext";
type Props = {
  logUserOut: () => void;
};
const AssessmentHeader = (props: Props) => {
  const { logUserOut } = props;
  const { user } = useAuthContext();
  return (
    <div className="w-full">
      <div className="flex flex-col gap-2 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h3 className="font-semibold text-[1.5rem] lg:text-[2.5rem]">
            Assessment Dashboard
          </h3>
          <p className="text-gray-500">Welcome back, {user.name}</p>
        </div>
        <button
          onClick={logUserOut}
          className="py-2 px-4 rounded-md bg-primary-purple text-white w-fit"
        >
          logout
        </button>
      </div>
    </div>
  );
};

export default AssessmentHeader;
