import { useMoveBack } from "../hooks/useMoveBack";
import Button from "../ui/Button";

function Unauthorized() {
  const moveBack = useMoveBack();

  return (
    <div className="text-center mt-20 mb-20">
      <h1 className="text-3xl font-bold text-red-600">403 - Access Denied</h1>
      <p className="mt-4 ">You do not have permission to view this page.</p>
      <Button onClick={moveBack} $variation="primary" $size="large">
        &larr; Go Back
      </Button>
    </div>
  );
}

export default Unauthorized;
