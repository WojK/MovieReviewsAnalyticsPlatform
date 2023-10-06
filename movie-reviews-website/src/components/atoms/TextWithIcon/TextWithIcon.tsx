import React from "react";
import { TextWithIconProps } from "./TextWithIcon.types";

export function TextWithIcon({ text, icon }: TextWithIconProps) {
  return (
    <div className="flex gap-x-8 items-center my-8">
      <div>{icon}</div>

      <p className="text-xl">{text}</p>
    </div>
  );
}
