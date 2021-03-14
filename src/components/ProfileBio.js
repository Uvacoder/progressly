import { useEffect, useState } from "react";
import { db } from "../initFirebase";
import { useAuth } from "../authProvider";

import Toggle from "./Toggle";

export default function ProfileBio() {
  const { user } = useAuth();

  const [editing, setEditing] = useState(false);
  const [bio, setBio] = useState("");

  useEffect(() => {
    const userBio = db.ref(`users/${user.displayName}/bio`);
    userBio.on("value", (snapshot) => {
      const value = snapshot.val();
      setBio(value);
    });
  }, []);

  const submitBio = () => {
    setEditing(!editing);
    db.ref(`users/${user.displayName}/`).update({
      bio: bio,
    });
  };
  return (
    <div className="mt-4">
      <p className="font-bold text-gray-400 text-lg mb-2">Bio:</p>
      {editing ? (
        <textarea
          className="shadow-sm focus:ring-green-500 focus:border-green-500 block w-full sm:text-sm border-gray-300 rounded-md"
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          placeholder="Enter your bio!"
        />
      ) : (
        <div className="text-2xl">{bio}</div>
      )}
      <div className="mt-4">
        <Toggle
          text="Toggle edit mode"
          value={editing}
          toggle={() => submitBio()}
        />
      </div>
    </div>
  );
}
