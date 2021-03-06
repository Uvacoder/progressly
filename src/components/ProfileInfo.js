import React from "react";
import { useAuth } from "../authProvider";
import ProfileTags from "./ProfileTags";
export default function ProfileInfo({ displayName, email, tags }) {
  console.log("tags:", tags);
  // const { user } = useAuth();
  return (
    <div>
      <h1 className="text-5xl font-bold">Hello {displayName}!</h1> Your email is{" "}
      {email}!
      <ProfileTags existingTags={tags} />
    </div>
  );
}
