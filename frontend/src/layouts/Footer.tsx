import React from "react";

const Footer = () => {
  console.log("Footer");
  return (
    <footer className="flex w-full justify-around items-center bg-gray-200 min-h-20 h-20 font-bold">
      <div className="flex flex-col justify-around items-center">
        <h2>푸터입니다.</h2>
        <h2>푸터입니다.</h2>
      </div>
      <div className="flex flex-col justify-around items-center">
        <h2>푸터입니다.</h2>
        <h2>푸터입니다.</h2>
      </div>
      <div className="flex flex-col justify-around items-center">
        <h2>푸터입니다.</h2>
        <h2>푸터입니다.</h2>
      </div>
    </footer>
  );
};

export default React.memo(Footer);
