import { useOutletContext } from "react-router-dom";
import "./style/HostVanPhotos.css";

const HostVanPhotos = () => {
  const { imageUrl } = useOutletContext();
  return <img src={imageUrl} className="host-van-detail-image" />;
};
export default HostVanPhotos;
