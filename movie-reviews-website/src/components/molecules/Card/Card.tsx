import React from "react";
import { CardProps } from "./Card.types";

export function Card({ icon, title, text }: CardProps) {
  return (
    <div className="p-8 border rounded-2xl bg-[#FFFFFF] w-[400px]">
      <div>{icon}</div>
      <h2 className="text-customBlue mt-6 mb-4 text-2xl font-bold">{title}</h2>
      <p className="text-lg opacity-80">{text}</p>
    </div>
  );
}
