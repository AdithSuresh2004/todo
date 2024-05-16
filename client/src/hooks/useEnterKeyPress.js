import { useEffect, useCallback } from "react";

const useEnterKeyPress = (callback) => {
  const handleKeyDown = useCallback(
    (event) => {
      if (event.key === "Enter") {
        callback();
      }
    },
    [callback]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleKeyDown]);
};

export default useEnterKeyPress;