import Logo from "../../../assets/Logo.svg";
import { HiBars3CenterLeft } from "react-icons/hi2";

type Props = {
  setOpenMobile: React.Dispatch<React.SetStateAction<boolean>>;
};
const MobileHeader = (props: Props) => {
  const { setOpenMobile } = props;
  return (
    <header className="w-full lg:hidden">
      <nav className="w-full">
        <div className="w-full flex justify-between items-center">
          <div>
            <img src={Logo} alt="logo" />
          </div>
          <button onClick={() => setOpenMobile(true)}>
            <HiBars3CenterLeft size={25} />
          </button>
        </div>
      </nav>
    </header>
  );
};

export default MobileHeader;
