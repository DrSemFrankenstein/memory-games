import React from "react";

const MyCustomIcon = ({ mysvgicon, onClick }) => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="white"
    stroke="white"
    style={{ cursor: "pointer" }}
    onClick={onClick}
  >
    {mysvgicon}
  </svg>
);

export default MyCustomIcon;
