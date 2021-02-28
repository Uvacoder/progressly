import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "../authProvider";
import { db } from "../initFirebase";
import LinkTo from "./LinkTo";

export default function SignUpHooksForm() {
  const { signup } = useAuth();
  const { register, handleSubmit, errors } = useForm();
  const [allUsernames, setAllusernames] = useState([]);
  const [serverError, setServerError] = useState(null);

  useEffect(() => {
    const ref = db.ref("usernames/");
    ref.on("value", (snapshot) => {
      const usernames = snapshot.val();
      console.log("USERNAMES:", usernames);
      const keys = Object.keys(usernames);
      const usernameArray = keys.map((key) => {
        return usernames[key];
      });
      console.log("usernameArray:", usernameArray);
      setAllusernames(usernameArray);
    });
    return () => ref.off();
  }, []);
  const onSubmit = async (formData) => {
    console.log("SUBMIT", formData);
    const { email, password, username } = formData;
    try {
      const newUser = await signup(email, password);
      console.log("newUser:", newUser);
      await updateFirebaseUsername(newUser, username);
      // Add the new username to the usernames table
      db.ref("usernames/").push(username);
    } catch (error) {
      console.log("couldn't sign up user", error);
      setServerError(error);
    }
  };
  const updateFirebaseUsername = async (newUser, username) => {
    console.log(`UPDATING DISPLAYNAME for`, newUser);
    console.log(`TO ${username}`);
    try {
      await newUser.updateProfile({
        displayName: username,
      });
      console.log("updated data", newUser.displayName);
    } catch (error) {
      console.log("something went wrong updating username", error);
    }
  };

  const validateUsername = (value) => {
    // Checks if the username is taken
    const exists = allUsernames
      .map((u) => u.toLowerCase())
      .includes(value.toLowerCase());
    return !exists ? true : "Username is taken";
  };
  console.log("errors:", errors);
  return (
    <div className="max-w-md w-full space-y-8 mx-auto">
      <div>
        <img
          className="mx-auto h-12 w-auto"
          src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
          alt="Workflow"
        />
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Sign up
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <LinkTo
            to="/sign-in"
            className="font-medium text-indigo-600 hover:text-indigo-500"
          >
            Sign in
          </LinkTo>
        </p>
      </div>
      <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
        <div className="rounded-md shadow-sm -space-y-px">
          <div>
            <label htmlFor="email-address" className="sr-only">
              Email address
            </label>
            <input
              ref={register({
                required: "Email is required",
              })}
              id="email-address"
              name="email"
              type="email"
              autoComplete="email"
              placeholder="Email address"
              className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
            />
            {errors.email && (
              <p className="mt-1 mb-2 text-sm text-red-600">
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="password" className="sr-only">
              Password
            </label>
            <input
              ref={register({
                required: "Password is required",
                minLength: {
                  value: 8,
                  message: "Password must be 8 characters",
                },
              })}
              id="password"
              name="password"
              type="password"
              placeholder="Password"
              autoComplete="current-password"
              className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
            />
            {errors.password && (
              <p className="mt-1 mb-2 text-sm text-red-600">
                {errors.password.message}
              </p>
            )}
          </div>
        </div>
        <div>
          <label htmlFor="displayname" className="sr-only">
            Username
          </label>
          <input
            ref={register({
              required: "Username is required",
              maxLength: {
                value: 32,
                message: "Usernames must be less than 32 characters",
              },
              pattern: {
                value: /^[A-Za-z0-9_]+$/,
                message:
                  "Usernames can only contain letters, numbers and underscores (_)",
              },
              validate: validateUsername,
            })}
            id="username"
            name="username"
            type="text"
            placeholder="Pick a username"
            className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
          />
          {errors.username && (
            <p className="mt-1 mb-2 text-sm text-red-600">
              {errors.username.message}
            </p>
          )}
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
            Sign up
          </button>
        </div>
      </form>
      {serverError && (
        <p className="mt-1 mb-2 text-sm text-red-600">{serverError.message}</p>
      )}
    </div>
  );
}
