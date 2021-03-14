import React from "react";

export default function Toggle({ text, value, toggle }) {
  return (
    <div className="flex items-center">
      <button
        type="button"
        onClick={toggle}
        className={`relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-400 ${
          value ? "bg-green-500" : "bg-gray-200"
        }`}
        aria-pressed="false"
      >
        <span
          aria-hidden="true"
          className={`pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200 ${
            value ? "translate-x-5" : "translate-x-0"
          }`}
        />
      </button>
      {text && <span className="text-gray-400 text-sm ml-2 ">{text}</span>}
    </div>
  );
}
