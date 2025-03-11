import Svg, { Path, Polygon } from "react-native-svg";

const BookMarkIcon = ({
  width,
  height,
  color,
}: {
  width: number;
  height: number;
  color: string;
}) => {
  return (
    <Svg
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
    >
      <Path
        d="M6 3C5.44772 3 5 3.44772 5 4V21C5 21.5523 5.55228 22 6 22C6.211 22 6.41918 21.9345 6.59099 21.8116L12 17.8826L17.409 21.8116C17.5808 21.9345 17.789 22 18 22C18.4477 22 19 21.5523 19 21V4C19 3.44772 18.5523 3 18 3H6Z"
        fill={color}
      />
    </Svg>
  );
};
export default BookMarkIcon;
