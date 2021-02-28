import React, { useState } from "react";
import { useAuth } from "../authProvider";
import { db } from "../initFirebase";
import { v4 as uuidv4 } from "uuid";

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

    const updatedResources = [];

    if (resources) {
      resources.forEach((resource) => updatedResources.push(resource));
    }

    updatedResources.push({
      id: uuidv4(),
      date: Date.now(),
      ...formData,
    });

    db.ref("users/" + user.displayName).set({
      resources: updatedResources,
    });

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
          <input
            value={formData.name}
            onChange={inputChange}
            type="text"
            name="name"
            id="name"
            className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
            placeholder="The Web Developer Bootcamp 2021"
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
            className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
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
            className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
            placeholder="This was a great course"
          />
        </div>
        <button
          type="submit"
          className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 mt-4"
        >
          Add Resource
        </button>
      </form>
    </div>
  );
}
