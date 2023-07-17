"use client";

export default function apitest() {
  const handleClick = async () => {
    try {
      const response = await fetch(
        "http://localhost:3000/api/serverless-example",
        {
          method: "POST",
          body: JSON.stringify({ username: "datto" }),
        }
      );
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <p>hello</p>
      <button onClick={handleClick}>click me</button>
    </>
  );
}
