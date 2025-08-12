import type { CSSProperties } from "react";

export type Stylings<V extends string> = {
    classNames?: Styling<V, "class">;
    styles?: Styling<V, "style">;
}

/* Internal */
type Styling<V extends string, T extends "style" | "class"> = Partial<Record<V, T extends "style" ? CSSProperties : string>>;
