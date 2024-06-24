import Logo from "./Logo";
import Navbar from "./Navbar";
import LoginButton from "./LoginButton";
import SearchBar from "./SearchBar";

const Header = () => {
  return (
    <header className="flex align-middle justify-between w-full h-[100px] min-h-[100px] px-5 py-5 border-b bg-white">
      <Logo />
      <Navbar />
      <SearchBar />
      <LoginButton />
    </header>
  );
};

export default Header;
