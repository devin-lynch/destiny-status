"use client";
import { ChangeEvent, useState } from "react";

export default function apitest() {
  const [username, setUsername] = useState("");

  const handleChange = async (e: ChangeEvent<HTMLInputElement>) => {
    try {
      setUsername(e.target.value);
      const response = await fetch(
        "http://localhost:3000/api/serverless-example",
        {
          method: "POST",
          body: JSON.stringify({ username: e.target.value }),
        }
      );
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex justify-center mt-2">
      <input
        value={username}
        placeholder="search by Bungie name..."
        className="bg-slate-900 border border-slate-500"
        onChange={(e) => handleChange(e)}
      ></input>
    </div>
  );
}
