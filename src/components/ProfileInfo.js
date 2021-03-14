import React from "react";
import { useAuth } from "../authProvider";

import ProfileTags from "./ProfileTags";
import ProfileBio from "./ProfileBio";
export default function ProfileInfo() {
  const { user } = useAuth();

  return (
    <div className="shadow-2xl bg-white rounded-lg p-8">
      <div className="w-full flex justify-beween">
        <div className="flex items-center w-2/3">
          <img
            className="w-16 h-16 rounded-full mr-4"
            src="https://images.unsplash.com/photo-1517365830460-955ce3ccd263?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=256&h=256&q=80"
            alt=""
          />
          <div>
            {" "}
            <h1 className="text-5xl font-bold">Welcome, {user.displayName}!</h1>
            <p className="mt-2">
              This is where you can manage your profile information, tags and
              timeline
            </p>
          </div>
        </div>
        <ProfileTags />
      </div>

      <ProfileBio />
    </div>
  );
}
