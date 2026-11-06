import React from "react";

// Numbered like a sheet in a set of drawings
export const SectionLabel = ({ index, children }) => (
  <p className="font-mono text-sm text-paper-muted">
    <span className="text-saffron">{index}</span> / {children}
  </p>
);
