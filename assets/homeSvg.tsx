
import React from "react";
import Svg, { Path } from "react-native-svg";

const HomeIcon = ({ width,height,color }
  : { width : number, height : number, color : string } ) => {
  return (
    <Svg
      viewBox="0 0 16 16"
      width={width}
      height={height}
      fill="none"
    >
      <Path
        d="M1 6V15H6V11C6 9.89543 6.89543 9 8 9C9.10457 9 10 9.89543 10 11V15H15V6L8 0L1 6Z"
        fill={color}
      />
    </Svg>
  );
};

export default HomeIcon;
