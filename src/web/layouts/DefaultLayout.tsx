import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const DefaultLayout: React.FC<any> = ({ children }) => {
  const location = useLocation();
  const { pathname } = location;

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, [pathname]);

  return children || null;
};

export default DefaultLayout;
