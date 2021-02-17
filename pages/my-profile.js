import { useEffect, useState } from "react";
import { useAuth } from "../src/authProvider";
import AddResourceForm from "../src/components/AddResourceForm";
import Timeline from "../src/components/Timeline";
import FirebaseAuth from "../src/firebaseAuth";
import { db } from "../src/initFirebase";

export default function MyProfile() {
  const { user, loading, logout } = useAuth();
  const [tempUserData, setTempUserData] = useState(null);
  console.log("user:", user);

  useEffect(() => {
    console.log("USER IN EFFECT", user);
    if (user) {
      const ref = db.ref("users/" + user.uid);
      ref.on("value", (snapshot) => {
        console.log("SNAPSHOT", snapshot.val());
        setTempUserData(snapshot.val());
      });
      return () => ref.off();
    }
  }, [user]);

  if (loading) return null;
  if (!user) return <FirebaseAuth />;
  return (
    <div class="flex-1 relative z-0 flex overflow-hidden">
      <main
        class="flex-1 relative z-0 overflow-y-auto focus:outline-none"
        tabindex="0"
      >
        <div class="absolute inset-0 py-6 px-4 sm:px-6 lg:px-8">
          <div class="h-full border-2 border-gray-200 border-dashed rounded-lg">
            <h1 className="text-5xl font-bold">Hello {user.displayName}!</h1>{" "}
            Your email is {user.email}!
            {/* <button
              className="text-white bg-red-500 px-3 py-2 text-lg font-bold rounded"
              type="button"
              onClick={logout}
            >
              Logout
            </button> */}
            <AddResourceForm resources={tempUserData?.resources} />
          </div>
        </div>
      </main>
      <aside class="hidden relative xl:flex xl:flex-col flex-shrink-0 w-96 border-l border-gray-200">
        <div class="absolute inset-0 py-6 px-4 sm:px-6 lg:px-8">
          <div class="h-full border-2 border-gray-200 border-dashed rounded-lg">
            {" "}
            <Timeline resources={tempUserData?.resources} />
          </div>
        </div>
      </aside>
    </div>
  );
}
