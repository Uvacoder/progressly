import React, { useState } from "react";
import { useAuth } from "../authProvider";
import { db } from "../initFirebase";
import { v4 as uuidv4 } from "uuid";
import Input from "../components/ui/Input";
const defaultState = {
  name: "",
  description: "",
  url: "",
};

export default function AddResourceForm({ resources }) {
  const { user } = useAuth();
  const [formData, setFormData] = useState(defaultState);

  const inputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const submit = (e) => {
    e.preventDefault();
    console.log("submitting data", formData);

    const newResource = {
      id: uuidv4(),
      date: Date.now(),
      ...formData,
    };
    db.ref(`users/${user.displayName}/resources`).push(newResource);

    setFormData(defaultState);
  };
  return (
    <div className="max-w-sm">
      <form onSubmit={submit}>
        <label
          htmlFor="name"
          className="block text-sm font-medium text-gray-700"
        >
          Name
        </label>
        <div className="mt-1">
          <Input
            placeholder="The Web Developer Bootcamp 2021"
            type="text"
            name="name"
            id="name"
            value={formData.name}
            onChange={inputChange}
          />
        </div>
        <label
          htmlFor="url"
          className="block text-sm font-medium text-gray-700"
        >
          Resource link
        </label>
        <div className="mt-1">
          <input
            value={formData.url}
            onChange={inputChange}
            type="text"
            name="url"
            id="url"
            className="shadow-sm focus:ring-green-500 focus:border-green-500 block w-full sm:text-sm border-gray-300 rounded-md"
            placeholder="https://udemy.com/whatever"
          />
        </div>
        <div className="mt-1">
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700"
          >
            Description
          </label>
          <input
            value={formData.description}
            onChange={inputChange}
            type="text"
            name="description"
            id="description"
            className="shadow-sm focus:ring-green-500 focus:border-green-500 block w-full sm:text-sm border-gray-300 rounded-md"
            placeholder="This was a great course"
          />
        </div>
        <button
          type="submit"
          className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-500 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 mt-4"
        >
          Add Resource
        </button>
      </form>
    </div>
  );
}
