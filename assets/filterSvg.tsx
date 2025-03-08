
import Svg, { Path } from "react-native-svg";

export default function FilterSvg({ width, height, color }: { width: number, height: number, color: string }) {
  return (
    <Svg viewBox="0 0 24 24" width={width} height={height} fill="none">
      <Path
        d="M20.62,3.17A2,2,0,0,0,18.8,2H5.2A2,2,0,0,0,3.7,5.32L9,11.38V21a1,1,0,0,0,.47.85A1,1,0,0,0,10,22a1,1,0,0,0,.45-.11l4-2A1,1,0,0,0,15,19V11.38l5.3-6.06A2,2,0,0,0,20.62,3.17Z"
        fill={color}
      />
    </Svg>
  )
}
