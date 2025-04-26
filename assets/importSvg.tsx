
import React from "react";
import Svg, { G, Path } from "react-native-svg";

export const ImportIcon = ({ width,height,color } : {width:number,height:number,color:string }) => (
  <Svg width={width} height={height} viewBox="0 0 24 24" fill="none">
    <G>
      <Path
        d="M12 14L11.2929 14.7071L12 15.4142L12.7071 14.7071L12 14ZM13 5C13 4.44772 12.5523 4 12 4C11.4477 4 11 4.44771 11 5L13 5ZM6.29289 9.70711L11.2929 14.7071L12.7071 13.2929L7.70711 8.29289L6.29289 9.70711ZM12.7071 14.7071L17.7071 9.70711L16.2929 8.29289L11.2929 13.2929L12.7071 14.7071ZM13 14L13 5L11 5L11 14L13 14Z"
        fill={color}
      />
      <Path
        d="M5 16L5 17C5 18.1046 5.89543 19 7 19L17 19C18.1046 19 19 18.1046 19 17V16"
        stroke={color}
        strokeWidth={2}
      />
    </G>
  </Svg>
);
