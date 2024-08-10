import React from "react";
import Navbar from "./Navbar";

const Newsletter: React.FC = () => {
  return (
    <div>
      <Navbar />
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold">Showprep Newsletter</h1>
        {/* Add other components like Hero, Content, etc. here */}
      </div>
    </div>
  );
};

export default Newsletter;
