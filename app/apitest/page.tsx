"use client";
import { useState, useEffect } from "react";

export default function apitest() {
  const [username, setUsername] = useState("");

  useEffect(() => {
    const fetchUsers = setTimeout(async () => {
      try {
        const response = await fetch(
          "http://localhost:3000/api/serverless-example",
          {
            method: "POST",
            body: JSON.stringify({ username }),
          }
        );
        const data = await response.json();
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    }, 300);
    return () => clearTimeout(fetchUsers);
  }, [username]);

  return (
    <div className="flex justify-center mt-2">
      <input
        value={username}
        placeholder="search by Bungie name..."
        className="bg-slate-900 border border-slate-500"
        onChange={(e) => setUsername(e.target.value)}
      ></input>
    </div>
  );
}
