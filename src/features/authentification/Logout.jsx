import { HiArrowRightOnRectangle } from "react-icons/hi2";
import ButtonIcon from "../../ui/ButtonIcon";
import SpinnerMini from "../../ui/SpinnerMini";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Logout() {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  function handleLogout() {
    setIsLoading(true);

    setTimeout(() => {
      console.log("User logged out (frontend only)");
      setIsLoading(false);
      navigate("/login"); // Redirect to login page
    }, 1500); // Simulate a delay for UX
  }

  return (
    <ButtonIcon disabled={isLoading} onClick={handleLogout}>
      {!isLoading ? <HiArrowRightOnRectangle /> : <SpinnerMini />}
    </ButtonIcon>
  );
}

export default Logout;
