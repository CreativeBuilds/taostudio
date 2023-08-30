import React, { CSSProperties } from "react";
import { HTMLMotionProps, motion } from "framer-motion";
import { twMerge } from "tailwind-merge";

const TextInput = React.forwardRef<HTMLInputElement, HTMLMotionProps<"input">>(
  ({ children, ...props }, ref) => {
    return (
      <motion.input
        type="text"
        {...props}
        style={
          {
            "--background": "23 23 23",
            "--bg-color":
              "linear-gradient(rgb(var(--background)), rgb(var(--background)))",
            "--border-color": `linear-gradient(180deg, #FFFFFF75 0%, rgba(255, 255, 255, 0) 100%)`,
            boxShadow: "2px 2px 3px 0px rgba(0, 0, 0, 0.33) inset",
          } as CSSProperties
        }
        className={twMerge(
          "flex rounded-xl max-w-[56rem] w-full h-fit flex-col items-center justify-center  border  [background:padding-box_var(--bg-color),border-box_var(--border-color)] border-transparent py-3 text-white placeholder:text-[#9D8F8F] text-center text-base lg:text-2xl",
          props.className
        )}
      />
    );
  }
);

export default TextInput;
