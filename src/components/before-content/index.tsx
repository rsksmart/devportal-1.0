import React from "react";
import classnames from "classnames";
import Marquee from "react-fast-marquee";
import ComponentOne from "./component-one";
import ComponentTwo from "./component-two";
// import ComponentThree from "./component-three";

interface Props {
  className?: string;
}

const BeforeContent = ({ className }: Props) => {
  return ( 
      <div className={classnames('before-content', className)}> 
      <Marquee style={{'minHeight': '30px'}}>    
       <ComponentOne />
        &nbsp;
        <ComponentTwo />
        &nbsp;
        {/* <ComponentThree />
        &nbsp; */}
      </Marquee>
      </div> 
  );
}

export default BeforeContent;