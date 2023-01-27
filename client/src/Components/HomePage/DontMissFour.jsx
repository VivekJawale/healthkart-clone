import React from "react";

const DontMissFour = ({ data }) => {
  return (
    <div className="dont_miss_four_divs">
      {data.map((el) => {
        return (
          <div>
            <img src={el} alt="" />
          </div>
        );
      })}
    </div>
  );
};

export default DontMissFour;
