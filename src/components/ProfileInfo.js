import React from "react";
import { useAuth } from "../authProvider";
export default function ProfileInfo() {
  const { user } = useAuth();
  return (
    <div>
      <h1 className="text-5xl font-bold">Hello {user.displayName}!</h1> Your
      email is {user.email}!
    </div>
  );
}
