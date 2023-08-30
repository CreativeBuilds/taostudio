import React from "react";
import { motion, HTMLMotionProps } from "framer-motion";
import { twMerge } from "tailwind-merge";
import { cva, type VariantProps } from "class-variance-authority";

type ButtonBaseProps = HTMLMotionProps<"button"> &
  VariantProps<typeof buttonClasses> & {
    children: React.ReactNode;
  };

const buttonClasses = cva(
  "rounded-md flex whitespace-nowrap  gap-2 items-center justify-center w-full text-center duration-300 ease-in-out",
  {
    variants: {
      variant: {
        default:
          "bg-black/50 hover:text-white hover:bg-white/50  text-white font-poppins",
      },
      size: {
        lg: "py-3 px-6 text-base lg:text-2xl",
        md: "py-3 px-4 text-sm w-fit",
        icon: "p-3 aspect-square w-fit",
      },
    },
    defaultVariants: {
      size: "lg",
      variant: "default",
    },
  }
);

const Button = React.forwardRef<HTMLButtonElement, ButtonBaseProps>(
  ({ children, size, ...props }, ref) => {
    const classes = buttonClasses({
      size,
      className: props.className,
    });
    return (
      <motion.button
        ref={ref}
        {...props}
        whileTap={{
          scale: 0.99,
        }}
        whileHover={{
          opacity: 0.9,
        }}
        className={twMerge(classes)}
      >
        {children}
      </motion.button>
    );
  }
);

export default Button;
