import { useState, useEffect } from "react";
import { useLocation, useParams, Link } from "react-router-dom";

const VanDetail = () => {
  const { id } = useParams();
  const [van, setVan] = useState(null);
  const location = useLocation();

  // FETCH
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

  console.log(location);
  // Zugriff auf die Suchparameter aus der "Vans"-Page
  const search = location.state?.search || "";
  // Zugriff auf den "type" aus der "Vans"-Page
  const type = location.state?.type || "all";

  return (
    <div className="van-detail-container">
      {/* eine Stufe im Pfad(relativ) zurück + vorherige Suchparameter (z.B. ?type=luxury) */}
      <Link to={`..${search}`} relative="path" className="back-button">
        &larr; <span>Back to {type} vans</span>
      </Link>
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
