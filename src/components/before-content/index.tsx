import React from "react";
import classnames from "classnames";
import Marquee from "react-fast-marquee";
import ComponentOne from "./component-one";
import ComponentTwo from "./component-two";

interface Props {
  className?: string;
}

const BeforeContent = ({ className }: Props) => {
  return ( 
      <div className={classnames('before-content', className)}> 
      <Marquee>    
        <ComponentOne />
        &nbsp;
        <ComponentTwo />
        &nbsp;
      </Marquee>
      </div> 
  );
}

export default BeforeContent;