import React from "react";
import Input from "./Input";

export default function FormInput({ name, labelText, ...props }) {
  return (
    <div>
      <label htmlFor={name} className="block text-sm font-medium text-gray-700">
        {labelText}
      </label>
      <div className="mt-1">
        <Input
          {...props}
          className="shadow-sm focus:ring-green-500 focus:border-green-500 block w-full sm:text-sm border-gray-300 rounded-md"
        />
      </div>
    </div>
  );
}
