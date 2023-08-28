import React, { useState, useEffect } from "react";
import { Listbox } from "@headlessui/react";
import { AnimatePresence, motion } from "framer-motion";
import { twMerge } from "tailwind-merge";

type Option = {
  label: string;
  value: string;
  disabled?: boolean;
};

type Props = {
  options: Option[];
  onChange: (newOption: Option) => void;
  value?: Option;
  placeholder?: string;
};

const CustomSelect = ({ options, onChange, placeholder, value }: Props) => {
  const [selected, setSelected] = useState<Option | undefined>(
    value ? options.find((item) => item.value === value.value) : undefined
  );

  const handleChange = (opt: Option) => {
    setSelected(opt);
    onChange(opt);
  };
  useEffect(() => {
    setSelected(value);
  }, [value]);
  return (
    <>
      <Listbox
        onChange={handleChange}
        as={"div"}
        placeholder="Aspect Ratio"
        className={"relative w-full max-w-xs mx-auto"}
      >
        {({ open }) => (
          <>
            <div className="relative text-center">
              <Listbox.Label className="text-base lg:text-3xl  text-foreground/50 text-center">
                Aspect Ratio
              </Listbox.Label>
              <Listbox.Button
                type="button"
                className="flex rounded-xl mx-auto max-w-[56rem]  w-full  py-3 flex-col items-center justify-center  text-center text-base lg:text-2xl"
                placeholder="Aspect Ratio"
              >
                <span className="block text-4xl text-foreground truncate capitalize">
                  {selected?.label}
                </span>
              </Listbox.Button>

              <AnimatePresence>
                {open && (
                  <Listbox.Options
                    static
                    as={motion.ul}
                    initial={{
                      height: 0,
                    }}
                    animate={{
                      height: "auto",
                    }}
                    exit={{
                      height: 0,
                    }}
                    transition={{
                      type: "tween",
                    }}
                    className="absolute bg-background flex flex-col gap-2 border-2 z-50 shadow-2xl max-h-56 top-24 rounded-md p-2 w-full overflow-auto"
                  >
                    {options?.map((option: Option, index) => (
                      <Listbox.Option
                        key={index}
                        as="li"
                        disabled={option.disabled}
                        className={({ active, disabled }) =>
                          twMerge(
                            "relative select-none py-3 pl-2 pr-9 text-base rounded-md duration-300 ease-in-out  disabled:line-through",
                            option.value === selected?.value
                              ? "bg-white text-black"
                              : "text-foreground hover:bg-white/50",
                            disabled
                              ? "cursor-not-allowed bg-destructive text-destructive-foreground line-through"
                              : "cursor-pointer"
                          )
                        }
                        value={option}
                      >
                        {({ active }) => (
                          <>
                            <div className="flex items-center">
                              <span
                                className={twMerge(
                                  option.value === selected?.value
                                    ? "font-medium "
                                    : "font-normal",
                                  "ml-3 block truncate  capitalize"
                                )}
                              >
                                {option.label}
                              </span>
                            </div>
                          </>
                        )}
                      </Listbox.Option>
                    ))}
                  </Listbox.Options>
                )}
              </AnimatePresence>
            </div>
          </>
        )}
      </Listbox>
    </>
  );
};

export default CustomSelect;
