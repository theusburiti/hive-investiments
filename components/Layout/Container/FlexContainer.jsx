import React from "react";

export default function FlexContainer({ className, maxWidth, children }) {
  return (
    <div className={`mx-auto flex w-full ${className ? className : ""}`}>
      {children}
    </div>
  );
}
