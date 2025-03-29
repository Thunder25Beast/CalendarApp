// src/components/ui/skeleton.js
import React from "react";

export const Skeleton = ({ className = "" }) => {
  return <div className={`bg-slate-200 animate-pulse ${className}`} />;
};
