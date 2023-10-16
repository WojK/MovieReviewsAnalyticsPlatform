"use client";

import React from "react";
import { NavigationBarProps } from "./NavigationBar.types";
import { Film } from "lucide-react";
import Link from "next/link";
import { UserButton } from "@clerk/nextjs";
import { useUser } from "@clerk/nextjs";

export function NavigationBar(props: NavigationBarProps) {
  const { isSignedIn } = useUser();

  return (
    <nav className="flex justify-between py-6 px-12 border-b shadow-md	items-center">
      <Link href="/" className="flex items-center gap-x-4">
        <Film size={45} color="#052B8F" />
        <h1 className="capitalize font-medium text-3xl tracking-tighter	">
          Movie reviews analyzer
        </h1>
      </Link>
      <ul className="flex gap-x-14 font-bold text-2xl tracking-tighter opacity-70">
        <li>
          <Link href="/solutions">Solutions</Link>
        </li>
        <li>
          <Link href="/analyze-own-reviews">Analyze own reviews</Link>
        </li>
        {!isSignedIn && (
          <li>
            <Link href="/sign-in">Log In</Link>
          </li>
        )}
        {isSignedIn && (
          <li>
            <Link href="/history">History</Link>
          </li>
        )}
        <li>
          <UserButton afterSignOutUrl="/" />
        </li>
      </ul>
    </nav>
  );
}
