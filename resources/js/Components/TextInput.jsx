import { forwardRef, useEffect, useRef, useState } from "react";

import { Eye as IconEye } from "@/Components/Icons/Eye";
import { EyeSlash as IconEyeSlash } from "@/Components/Icons/EyeSlash";

export default forwardRef(function TextInput(
  { type = "text", className = "", isFocused = false, ...props },
  ref
) {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const input = ref ? ref : useRef();
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (isFocused) {
      input.current.focus();
    }
  }, []);

  return (
    <div className="flex flex-col items-start relative justify-center">
      <input
        {...props}
        type={showPassword ? "text" : type}
        className={
          "border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm " +
          className
        }
        ref={input}
      />

      {type === "password" ? (
        <button
          type="button"
          className="absolute right-4"
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? (
            <IconEyeSlash className="w-6 h-6" />
          ) : (
            <IconEye className="w-6 h-6" />
          )}
        </button>
      ) : null}
    </div>
  );
});
