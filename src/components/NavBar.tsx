import { Web3Button } from "@web3modal/react";
import React from "react";
import Image from "next/image";

const Navbar: React.FC = () => {
  return (
    <>
      {/* Desktop + Large Desktop */}
      <nav className="w-9/12 mx-auto hidden lg:flex flex-row items-center pt-6 xl:pt-12 justify-between">
        <Image
          src="/logo.png"
          className="h-21 xl:h-21"
          alt=""
          width="400"
          height="100"
        />
        {/* <button className="w-40 xl:w-48 py-2 xl:py-3 px-3 z-20 flex flex-row items-center justify-center rounded-lg cursor-pointer bg-blue-600 hover:bg-blue-700">
      
          <p className="text-lg xl:text-xl font-medium text-white">Connect</p>
        </button> */}
        <Web3Button />
      </nav>
      {/* Mobile + Tablet */}
      <nav className="w-10/12 mx-auto flex flex-row lg:hidden pt-8 justify-between">
        <Image
          src="/logo.png"
          className="h-21"
          alt=""
          width="400"
          height="100"
        />
        {/* <img
          className="w-6 h-6"
          src={
            account ? "/images/icons/metamask.png" : "/images/icons/wallet.svg"
          }
          alt="wallet"
          onClick={() => activate(connectors.Injected)}
        /> */}
      </nav>
    </>
  );
};
export default Navbar;
