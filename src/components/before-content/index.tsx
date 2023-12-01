import React from "react";
// import Marquee from "react-fast-marquee";
import classnames from "classnames";
import ComponentOne from "./component-one";

interface Props {
  className?: string;
}

const BeforeContent = ({ className }: Props) => {
  return (
    <div className={classnames('before-content', className)}>      
      <ComponentOne />
    </div>
  );
}

export default BeforeContent;