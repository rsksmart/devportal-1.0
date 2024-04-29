import React from "react";
import classnames from "classnames";
import Marquee from "react-fast-marquee";
import ComponentThree from "./component-three";

interface Props {
  className?: string;
}

const BeforeContent = ({ className }: Props) => {
  return ( 
      <div className={classnames('before-content', className)}> 
      <Marquee style={{'minHeight': '30px'}}>    
        <ComponentThree />
        &nbsp;
      </Marquee>
      </div> 
  );
}

export default BeforeContent;