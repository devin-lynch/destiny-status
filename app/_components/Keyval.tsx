'use client';
import { get, set } from 'idb-keyval';
import { useState } from 'react';

export default function Keyval(): JSX.Element {
  const [clickTime, setClickTime] = useState();
  get('clickTime').then((val) => setClickTime(val));
  const handleClick = () => {
    const currentTime = new Date().toLocaleTimeString();
    console.log(currentTime);
    set('clickTime', currentTime);
    get('clickTime').then((val) => setClickTime(val));
  };
  return (
    <>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={handleClick}
      >
        record current time
      </button>
      <p>button last clicked at:</p>
      <p>{clickTime ? clickTime : null}</p>
    </>
  );
}
