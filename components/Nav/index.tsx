import React from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import Image from "next/image";

export default function Navbar() {
  return (
    <div className="absolute top-0 left-0 ml-10 mt-10 flex items-center">
      <Image
        src="/ARVRtisePPV.png" // Replace this with the path to your logo image
        alt="Logo"
        width={64} // Adjust width and height as needed
        height={64}
        className="mr-4" // Add some margin-right to separate the logo from the title
      />
      <h1 className="text-2xl font-bold mr-6">ARVRtise PPV</h1>
      <ConnectButton />
    </div>
  );
}