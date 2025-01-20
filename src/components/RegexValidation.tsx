import { useEffect, useState } from "react";

interface RegexValidationProps {
  pattern: RegExp;
  value: string;
  errorMessage: string;
}

const RegexValidation = ({ pattern, value, errorMessage }: RegexValidationProps) => {
  const [isTouched, setIsTouched] = useState(false); // Track if the user has started typing
  const isValid = pattern.test(value);

  useEffect(() => {
    if (value.length > 0) {
      setIsTouched(true); // Mark as touched when the user starts typing
    }
  }, [value]);

  return <>{isTouched && !isValid && <span className="error">{errorMessage}</span>}</>;
};

export default RegexValidation;