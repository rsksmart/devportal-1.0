import React from "react";
import {PropsWithChildren} from "react";

const Container = ({ children }: PropsWithChildren) => {
  return (
    <div className="container">
      {children}
    </div>
  );
}

export default Container;
