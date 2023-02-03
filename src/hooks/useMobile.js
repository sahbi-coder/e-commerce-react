import { useState, useEffect } from "react";

const useMobile = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(
      window.matchMedia("only screen and (max-width: 760px)").matches
    );
    const toggleIdMobile = () => {
      const windowIsMobile = window.matchMedia(
        "only screen and (max-width: 760px)"
      ).matches;

      if (windowIsMobile) {
        setIsMobile(true);
      } else {
        setIsMobile(false);
      }
    };
    toggleIdMobile();
    window.addEventListener("resize", toggleIdMobile);

    return () => {
      window.removeEventListener("resize", toggleIdMobile);
    };
  }, []);
  return isMobile;
};
export default useMobile;
