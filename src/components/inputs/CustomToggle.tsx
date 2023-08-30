import React, { CSSProperties } from "react";
import { Switch } from "@headlessui/react";
import { twMerge } from "tailwind-merge";

export default function CustomToggle({
  value,
  onChange,
}: {
  value: boolean;
  onChange: (value: boolean) => void;
}) {
  return (
    <Switch
      checked={value}
      id="toggle"
      onChange={onChange}
      style={
        {
          "--bg-color": "linear-gradient(#171717, #171717)",
          "--border-color": `linear-gradient(180deg, #FFFFFF, #FFFFFF00)`,
        } as CSSProperties
      }
      className={twMerge(
        `${value ? "bg-teal-900" : "bg-teal-700"}
        relative inline-flex h-[22px] w-[46px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`,
        "border-[1px] [background:padding-box_var(--bg-color),border-box_var(--border-color)] border-transparent"
      )}
    >
      <span className="sr-only">Use setting</span>
      <span
        aria-hidden="true"
        className={`${value ? "translate-x-6" : "translate-x-0"}
            pointer-events-none inline-block h-[20px] w-[20px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
      />
    </Switch>
  );
}
