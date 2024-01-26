import Logo from "../../../assets/Logo.svg";
const Header = () => {
  return (
    <header className="p-4 flex flex-col h-[10vh]">
      <nav className="w-full">
        <img src={Logo} alt="Logo" />
      </nav>
    </header>
  );
};

export default Header;
