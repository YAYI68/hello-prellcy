import { AiOutlineHome } from "react-icons/ai";
import { Link } from "react-router-dom";

type Props = {
  setOpenMobile: React.Dispatch<React.SetStateAction<boolean>>;
};
const NavLinks = (props: Props) => {
  const { setOpenMobile } = props;
  return (
    <ul className="w-full">
      <li className="w-full">
        <Link
          to={``}
          onClick={() => setOpenMobile(false)}
          className="w-full bg-[#F9F5FF] p-2 flex items-center rounded-md gap-4"
        >
          <AiOutlineHome size={20} className="text-gray-500" />
          <span className="text-primary-purple font-medium">Home</span>
        </Link>
      </li>
    </ul>
  );
};

export default NavLinks;
