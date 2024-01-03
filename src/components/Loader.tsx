import React from "react";
import { CircleLoader } from "react-spinners";

export const Loader = (): React.JSX.Element => {
  return (
    <div className="flex justify-center h-[100vh]">
      <CircleLoader size={50} color="white" />
    </div>
  );
};
