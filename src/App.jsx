import { useState } from "react";

function Square() {
  const [value, setValue] = useState(null);
  function handleClick() {
    setValue("X");
  }

  return (
    <button
      onClick={handleClick}
      className="bg-white border border-gray-400 w-12 h-12 m-1 rounded-md text-lg font-semibold"
    >
      {value}
    </button>
  );
}

export default function Board() {
  return (
    <>
      <div className="flex">
        <Square />
        <Square />
        <Square />
      </div>
      <div className="flex">
        <Square />
        <Square />
        <Square />
      </div>
      <div className="flex">
        <Square />
        <Square />
        <Square />
      </div>
    </>
  );
}
