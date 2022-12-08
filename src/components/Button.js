import React from "react";

function Button({ id, image, name, market_cap_rank, handleClick }) {
  return (
    <div>
      <button
        onClick={() => handleClick(id)}
        className="bg-white text-sm text-slate-500 py-2 rounded-lg flex items-center justify-center w-32"
      >
        <img src={image} alt="" className="w-6 mx-1" />
        {market_cap_rank}
        {name}
      </button>
    </div>
  );
}

export default Button;
