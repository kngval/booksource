import Svg, { Path, Polygon } from "react-native-svg";

const BookMarkIcon = ({ width, height, color }: { width: number, height: number, color: string }) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 1920 1920" fill="none" >
      <Path
        fill={color}
        fillRule="evenodd"
        d="M1585.963 1920 960.48 1544.711 335 1920V170.586C335 76.536 411.536 0 505.586 0h909.79c94.05 0 170.587 76.536 170.587 170.586V1920Z"
      />
    </Svg>
  )
}
export default BookMarkIcon
