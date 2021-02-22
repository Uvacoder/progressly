import React from "react";
import { useAuth } from "../authProvider";
export default function ProfileInfo({ displayName, email }) {
  const { user } = useAuth();
  const changeUsername = () => {
    user
      .updateProfile({
        displayName: "din mor er din onkel",
      })
      .then(() => {
        console.log("updated data", user.displayName);
      });
  };
  return (
    <div>
      <h1 className="text-5xl font-bold">Hello {displayName}!</h1> Your email is{" "}
      {email}!
      <input type="text" placeholder="new displayname" />
      <button onClick={changeUsername}>Update name</button>
    </div>
  );
}
