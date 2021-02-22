import React, { useState, useEffect } from "react";
import Timeline from "../../src/components/Timeline";
import { db } from "../../src/initFirebase";
export default function Profile({ id }) {
  const [profile, setProfile] = useState(null);
  useEffect(() => {
    const ref = db.ref("users/" + id);
    ref.on("value", (snapshot) => {
      setProfile(snapshot.val());
    });
    return () => ref.off();
  }, []);

  return (
    <div>
      <h1 className="text-5xl font-bold">{id}</h1>
      {profile && <Timeline resources={profile.resources} />}
    </div>
  );
}

export const getServerSideProps = async ({ query }) => {
  return {
    props: {
      id: query.id,
    },
  };
};
