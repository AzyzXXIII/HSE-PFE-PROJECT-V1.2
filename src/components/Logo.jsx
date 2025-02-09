import { Link } from "react-router-dom";

const Logo = () => {
  return (
    <Link to="/" className="flex items-center gap-2">
      <img
        src=""
        alt="The Wild Oasis Logo"
        className="w-10 h-10 rounded-full"
      />
      <span className="font-semibold">The Wild Oasis</span>
    </Link>
  );
};

export default Logo;
