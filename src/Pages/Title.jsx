import React from "react";

const Title = ({ text1 }) => {
  return (
    <div className="inline-flex items-center gap-2">
      <p className="md:text-4xl text-3xl font-semibold">{text1}</p>
    </div>
  );
};

export default Title;
