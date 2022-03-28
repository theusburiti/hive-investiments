import React from "react";
import clsx from "clsx";

export default function Container({ first, children, className }) {
  return (
    <div className={clsx(`relative max-w-7xl mx-auto ${
        first ? "lg:py-12" : "py-8"
      } px-4 sm:px-6 lg:px-8 my-4 flex flex-col space-y-16 z-10 ${
        className ? className : ""
      }`
    )}>
      {children}
    </div>
  );
}
