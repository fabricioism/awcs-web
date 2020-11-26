import { useEffect, useState } from "react";
import { useRouter } from "next/router";

const PublicRoute = ({ children, location }) => {
  const router = useRouter();
  const [viewApproved, setviewApproved] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("loggedIn")) {
      router.push("/");
    } else {
      setviewApproved(true);
    }
  }, [location]);
  return viewApproved ? children : null;
};

export default PublicRoute;
