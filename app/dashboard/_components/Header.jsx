"use client";
import React from "react";
import Image from "next/image";
import { UserButton } from "@clerk/nextjs";
import { usePathname } from "next/navigation";
import Link from "next/link";


function Header() {
  const path = usePathname();

  return (
    <div className="flex p-4 items-center justify-between bg-secondary shadow-sm">
      <Image src={"/logo.svg"} width={100} height={80} alt="logo" />
      <ul className="hidden md:flex gap-6 ">
        <Link href="/dashboard"> 
        <li
          className={`hover:text-[#0D9488] hover:font-bold cursor-pointer transition-all ${
            path == "/dashboard" && "text-primary font-bold"
          }`}
        >
          Dashboard
          </li>
          </Link>
            <Link href={'/questions'}>
        <li
          className={`hover:text-[#0D9488] hover:font-bold cursor-pointer transition-all ${
            path == "/questions" && "text-primary font-bold"
          }`}
        >
          Questions
          </li>
          </Link>

        
        <Link href={'/how-it-works'}>
       
        <li
          className={`hover:text-[#0D9488] hover:font-bold cursor-pointer transition-all ${
            path == "/how-it-works" && "text-primary font-bold"
          }`}
        >
          How it Works?
          </li>
          </Link>
      </ul>
      <UserButton />
    </div>
  );
}

export default Header;
