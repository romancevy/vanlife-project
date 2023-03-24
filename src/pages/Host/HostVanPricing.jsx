import { useOutletContext } from "react-router-dom";
import "./style/HostVanPricing.css";

const HostVanPricing = () => {
  const { price } = useOutletContext();
  const { currentVan } = useOutletContext();
  console.log(currentVan);
  return (
    <h3 className="host-van-price">
      ${price}
      <span>/day</span>
    </h3>
  );
};
export default HostVanPricing;
