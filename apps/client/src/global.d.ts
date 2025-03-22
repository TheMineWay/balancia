// src/global.d.ts
import type React from "react";

declare global {
  type FC<P = object> = React.FC<P>;
}
