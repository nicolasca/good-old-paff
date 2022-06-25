import { useAuthState } from "react-firebase-hooks/auth";
import { Navigate } from "react-router-dom";
import { auth } from "../..";
import NeedEmailValidation from "../Authentication/NeedEmailValidation";

const ProtectedRoute = ({ children }) => {
  const [user] = useAuthState(auth);

  if (!user) {
    return <Navigate to="/" replace />;
  } else if (user && user.emailVerified === false) {
    return <NeedEmailValidation />;
  }

  return children;
};

export default ProtectedRoute;
