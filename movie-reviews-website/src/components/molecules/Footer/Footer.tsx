import { Github } from "lucide-react";
import React from "react";

export function Footer() {
  return (
    <footer className="flex gap-x-4 py-6 px-12 items-center border-t w-full">
      <Github size={40} color="#052B8F" />
      <a href="https://github.com/WojK/ReviewsAnalyzer" className="font-bold">
        github.com/WojK/ReviewsAnalyzer
      </a>
    </footer>
  );
}
