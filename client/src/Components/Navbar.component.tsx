import React from "react";

const Navbar = () => {
  return (
    <nav className="bg-customblue-500 flex w-full h-[4rem] justify-around items-center border-b-customblue-600 border-opacity-40 border-2">
      <div className=""></div>
      <div className="flex">
        <h1 className="font-bold tracking-widest text-blue-950 text-xl">Glu</h1>
        <span className="font-semibold">Track</span>
      </div>
      <div className=""></div>
    </nav>
  );
};

export default Navbar;
