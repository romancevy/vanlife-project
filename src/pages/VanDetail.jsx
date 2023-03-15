import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const VanDetail = () => {
  const { id } = useParams();
  const [van, setVan] = useState(null);

  useEffect(() => {
    try {
      const fetchData = async (id) => {
        const response = await fetch(`/api/vans/${id}`);
        const result = await response.json();
        setVan(result.vans);
      };
      fetchData(id);
    } catch (error) {
      console.error(error);
    }
  }, [id]);

  return (
    <div className="van-detail-container">
      {van ? (
        <div className="van-detail">
          <img src={van.imageUrl} />
          <i className={`van-type ${van.type} selected`}>{van.type}</i>
          <h2>{van.name}</h2>
          <p className="van-price">
            <span>${van.price}</span>/day
          </p>
          <p>{van.description}</p>
          <button className="link-button">Rent this van</button>
        </div>
      ) : (
        <h2>Loading...</h2>
      )}
    </div>
  );
};
export default VanDetail;
