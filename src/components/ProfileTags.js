import { useState, useEffect } from "react";
import { db } from "../initFirebase";
import { useAuth } from "../authProvider";

export default function ProfileTags({ existingTags }) {
  const { user } = useAuth();

  console.log("tags in profiletags:", existingTags);
  const [input, setInput] = useState("");
  const [tags, setTags] = useState(existingTags || []);

  useEffect(() => {
    if (existingTags) {
      setTags(existingTags);
    }
  }, [existingTags]);
  useEffect(() => {
    console.log("tags changed");
    // return () => {
    // 	cleanup
    // }
    if (tags && tags.length > 0) {
      console.log("updating tags", tags);
      db.ref("users/" + user.displayName).update({
        tags: tags,
      });
    }
  }, [tags]);

  const removeTag = (i) => {
    const newTags = [...tags];
    newTags.splice(i, 1);
    setTags(newTags);
  };

  const onKeyDown = (e) => {
    console.log("e:", e);
    if (e.key === "Enter" && input) {
      if (tags.find((tag) => tag.toLowerCase() === input.toLowerCase())) {
        return;
      }
      setTags([...tags, input]);
      return setInput("");
    }
  };
  return (
    <div>
      <p>Profile Tags</p>
      <ul>
        {tags.map((tag, i) => {
          return (
            <li key={tag}>
              <span>{tag}</span>
              <button onClick={() => removeTag(i)}>X</button>
            </li>
          );
        })}
        <li>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={onKeyDown}
          />
        </li>
      </ul>
      {input}
    </div>
  );
}
