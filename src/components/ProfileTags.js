import { useState, useEffect } from "react";
const colors = require("tailwindcss/colors");

import { db } from "../initFirebase";
import { useAuth } from "../authProvider";
import Input from "./ui/Input";

export default function ProfileTags() {
  const { user } = useAuth();
  const [tag, setTag] = useState("");
  const [tags, setTags] = useState({});

  useEffect(() => {
    // Get all tags on the user
    const userTags = db.ref(`users/${user.displayName}/tags`);
    const refs = [userTags];
    // When a child is added to the user tags (through the submitTag function, or on mount), we update the client side tags with the old ones, plus the newly added tag
    userTags.on("child_added", (child) => {
      const key = child.key;
      const tagRef = db.ref(`tags/${key}`);
      refs.push(tagRef);
      tagRef.on("value", (snap) => {
        setTags((old) => {
          return {
            ...old,
            [key]: snap.val(),
          };
        });
      });
    });
    return () => {
      refs.forEach((ref) => ref.off());
    };
  }, []);

  const removeTag = (tagId) => {
    const userTags = db.ref(`users/${user.displayName}/tags/${tagId}`);
    const tagRef = db.ref(`tags/${tagId}`);
    userTags.remove();
    tagRef.remove();

    const newTags = tags;
    delete newTags[tagId];
    setTags(newTags);
  };

  const onSubmitTag = async (e) => {
    e.preventDefault();
    if (!tag) return;
    if (Object.keys(tags).length === 5) return;
    for (const val of Object.values(tags)) {
      if (val.tag.toLowerCase() === tag.toLowerCase()) return;
    }

    const newTag = {
      tag,
      displayName: user.displayName,
    };

    const tagRef = db.ref("tags").push(newTag);
    await db.ref(`users/${user.displayName}/tags/${tagRef.key}`).set(tag);
    return setTag("");
  };
  return (
    <div>
      <ul>
        {Object.entries(tags).map(([id, tag]) => {
          console.log("tags:", tags);
          return (
            <Badge key={id} id={id} name={tag.tag} removeTag={removeTag} />
          );
        })}
        <form className="max-w-xs my-4" onSubmit={onSubmitTag}>
          <Input
            type="text"
            value={tag}
            placeholder="Add your main interest areas (maximum of 5)"
            onChange={(e) => setTag(e.target.value)}
          />
        </form>
      </ul>
    </div>
  );
}

const Badge = ({ id, name, removeTag }) => {
  return (
    <li className="inline-flex rounded-full items-center py-1 pl-2.5 pr-2 text-lg font-medium bg-green-100 text-green-800">
      {name}
      <button
        type="button"
        onClick={() => removeTag(id)}
        className="flex-shrink-0 ml-1 h-4 w-4 rounded-full inline-flex items-center justify-center text-green-300 hover:bg-green-200 hover:text-green-500 focus:outline-none focus:bg-green-500 focus:text-white"
      >
        <svg
          className="h-3 w-3"
          stroke="currentColor"
          fill="none"
          viewBox="0 0 8 8"
        >
          <path strokeLinecap="round" strokeWidth="1.5" d="M1 1l6 6m0-6L1 7" />
        </svg>
      </button>
    </li>
  );
};
