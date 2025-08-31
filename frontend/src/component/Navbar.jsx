import React from "react";

const Navbar = () => {
  return (
    <div className="w-full flex justify-between items-center h-16 px-10 bg-[#f5f5f5]">
      <div className="flex items-center gap-2 mx-72">
        <h1 className="text-md font-semibold text-gray-700">Company.com</h1>
      </div>
      <div className="flex items-center gap-3">
        <h1 className="text-gray-700 font-bold">User</h1>
        <button className="w-10 h-10 flex items-center justify-center rounded-xl bg-blue-100 text-blue-900 font-bold">
          SA
        </button>
      </div>
    </div>
  );
};

export default Navbar;
