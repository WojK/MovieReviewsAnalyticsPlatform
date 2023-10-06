import React from "react";
import { TitleProps } from "./Title.types";

export function Title({ title }: TitleProps) {
  return <h1 className="text-customBlue text-3xl font-bold mb-8">{title}</h1>;
}
