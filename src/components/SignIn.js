import React, { useState } from "react";
import { useRouter } from "next/router";
import { useAuth } from "../authProvider";
const defaultState = {
  email: "",
  // displayName: "",
  password: "",
};

export default function SignIn() {
  const { user, signin } = useAuth();
  const router = useRouter();
  const [formData, setFormData] = useState(defaultState);
  const submit = (e) => {
    console.log("user before submit");
    e.preventDefault();
    const { email, password } = formData;
    console.log("signing in with email", email);
    console.log("and password", password);
    signin(email, password)
      .then(() => {
        console.log("SIGNED IN");
      })
      .catch((error) => {
        console.log("something went wrong", error);
      });
  };

  const inputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  return (
    <div className="max-w-md w-full space-y-8 mx-auto">
      <div>
        <img
          className="mx-auto h-12 w-auto"
          src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
          alt="Workflow"
        />
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Sign in to your account
        </h2>
      </div>
      <form className="mt-8 space-y-6" onSubmit={submit}>
        <input type="hidden" name="remember" value="true" />
        <div className="rounded-md shadow-sm -space-y-px">
          <div>
            <label htmlFor="email-address" className="sr-only">
              Email address
            </label>
            <input
              value={formData.email}
              onChange={inputChange}
              id="email-address"
              name="email"
              type="email"
              autoComplete="email"
              required
              className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="Email address"
            />
          </div>
          <div>
            <label htmlFor="password" className="sr-only">
              Password
            </label>
            <input
              value={formData.password}
              onChange={inputChange}
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="Password"
            />
          </div>
        </div>
        <div>
          <button
            type="submit"
            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <span className="absolute left-0 inset-y-0 flex items-center pl-3">
              <svg
                className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                  clipRule="evenodd"
                />
              </svg>
            </span>
            Sign in
          </button>
        </div>
      </form>
    </div>
    // <div className="max-w-sm w-full mx-auto">
    //   <h2>Im a sign in form</h2>
    //   <form onSubmit={submit}>
    //     {" "}
    //     <label
    //       htmlFor="email"
    //       className="block text-sm font-medium text-gray-700"
    //     >
    //       Email
    //     </label>
    //     <input
    //       value={formData.email}
    //       onChange={inputChange}
    //       type="email"
    //       name="email"
    //       id="email"
    //       className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
    //       placeholder="Enter your email"
    //     />
    //     {/* <label
    //       htmlFor="displayName"
    //       className="block text-sm font-medium text-gray-700"
    //     >
    //       displayName
    //     </label>
    //     <input
    //       value={formData.displayName}
    //       onChange={inputChange}
    //       type="text"
    //       name="displayName"
    //       id="displayName"
    //       className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
    //       placeholder="Display name"
    //     /> */}
    //     <label
    //       htmlFor="password"
    //       className="block text-sm font-medium text-gray-700"
    //     >
    //       Password
    //     </label>
    //     <input
    //       value={formData.password}
    //       onChange={inputChange}
    //       type="password"
    //       name="password"
    //       id="password"
    //       className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
    //       placeholder="Enter a password"
    //     />
    //     <button
    //       type="submit"
    //       className="mt-4 text-center inline-flex w-full items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
    //     >
    //       Sign In
    //     </button>
    //   </form>
    // </div>
  );
}
