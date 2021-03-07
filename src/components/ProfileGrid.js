import React from "react";
import LinkTo from "./LinkTo";

export default function ProfileGrid({ profiles }) {
  return (
    <div className="grid grid-cols-3 gap-8">
      {profiles.map((profile) => (
        <ProfileCard key={profile.displayName} {...profile} />
      ))}
    </div>
  );
}

const ProfileCard = ({ displayName, tags }) => {
  console.log("tags:", tags);
  return (
    <LinkTo
      to={`/profile/${displayName}`}
      className="bg-white rounded-lg shadow-2xl p-4"
    >
      <p className="text-2xl font-bold">{displayName}</p>
      {tags &&
        Object.entries(tags).map(([id, tag]) => <div key={id}>{tag.name}</div>)}
    </LinkTo>
  );
};
