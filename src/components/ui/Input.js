import React from "react";

export default function Input(props) {
  return (
    <input
      {...props}
      className="shadow-sm focus:ring-green-500 focus:border-green-500 block w-full sm:text-sm border-gray-300 rounded-md"
    ></input>
  );
}
