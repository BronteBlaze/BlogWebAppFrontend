import { useState, useEffect } from "react";

const useError = (authError) => {
  const [errorType, setErrorType] = useState("");

  useEffect(() => {
    if (authError) {
      if (authError.includes("first")) {
        setErrorType("firstNameError");
      } else if (authError.includes("last")) {
        setErrorType("lastNameError");
      } else if (authError.includes("email")) {
        setErrorType("emailError");
      } else if (authError.includes("phone")) {
        setErrorType("phoneError");
      } else if (authError.includes("confirmation")) {
        setErrorType("confirmationError");
      } else if (authError.includes("password")) {
        setErrorType("passError");
      } else {
        setErrorType("");
      }
    }

    return () => setErrorType("");
  }, [authError]);

  return {
    errorType,
    setErrorType,
  };
};

export default useError;
