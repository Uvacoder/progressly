import { useState, useEffect } from "react";
import ProfileGrid from "../src/components/ProfileGrid";
import { db } from "../src/initFirebase";

export default function Home() {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    const ref = db.ref("users/");
    ref.on("value", (snapshot) => {
      const val = snapshot.val();
      const keys = Object.keys(val);
      const userArray = keys.map((key) => {
        return {
          displayName: key,
          ...val[key],
        };
      });
      setUsers(userArray);
    });
    return () => ref.off();
  }, []);
  return (
    <div className="py-6 px-4 sm:px-6 lg:px-8">
      <h1 className="text-5xl font-bold">Explore other profiles</h1>{" "}
      {users.length > 0 ? (
        <ProfileGrid profiles={users} />
      ) : (
        <div>No users found!</div>
      )}
    </div>
  );
}
