// src/global.d.ts
import React from "react";

declare global {
  type FC<P = object> = React.FC<P>;
}
