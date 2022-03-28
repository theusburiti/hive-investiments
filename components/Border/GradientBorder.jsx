import React from "react";

export default function GradientBorder({ children }) {
  return (
    <div className="inline-flex relative  gradient-border rounded-2xl transition">
      {children}
    </div>
  );
}
