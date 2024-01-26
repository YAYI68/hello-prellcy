import { Link } from "react-router-dom";
import { FaRegEnvelope } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="w-full p-4 flex justify-between items-center sticky bottom-0 left-0 h-[5vh]">
      <p className="flex items-center">
        <span>&#169;</span>
        <span>Untitled UI 2077</span>
      </p>
      <Link to={``} className="flex items-center text-xs">
        <FaRegEnvelope />
        <span>help@untitledui.com</span>
      </Link>
    </footer>
  );
};

export default Footer;
