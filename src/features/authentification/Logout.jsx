import { HiArrowRightOnRectangle } from "react-icons/hi2";
import ButtonIcon from "../../ui/ButtonIcon";
import SpinnerMini from "../../ui/SpinnerMini";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext"; // Add this import

function Logout() {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { logout } = useAuth(); // Add this line

  function handleLogout() {
    setIsLoading(true);

    setTimeout(() => {
      // Clear authentication state and localStorage
      logout(); // Add this line
      console.log("User logged out successfully");
      setIsLoading(false);
      navigate("/login");
    }, 1500);
  }

  return (
    <ButtonIcon disabled={isLoading} onClick={handleLogout}>
      {!isLoading ? <HiArrowRightOnRectangle /> : <SpinnerMini />}
    </ButtonIcon>
  );
}

export default Logout;
