import React from "react";
import Marquee from "react-fast-marquee";
import classnames from "classnames";
import ComponentOne from "./component-one";
import ComponentTwo from "./component-two";
import ComponentThree from "./component-three";

interface Props {
  className?: string;
}

const BeforeContent = ({ className }: Props) => {
  return (
    <Marquee className={classnames('before-content', className)} direction="right" pauseOnHover>      
      {/* &nbsp;     
      <ComponentOne />
      &nbsp;
      <ComponentTwo />
      &nbsp; */}
      <ComponentThree />
    </Marquee>
  );
}

export default BeforeContent;