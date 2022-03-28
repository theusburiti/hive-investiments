import React from "react";

export default function GridContainer({ children }) {
  return <div className="grid grid-cols-12 md:gap-8">{children}</div>;
}
