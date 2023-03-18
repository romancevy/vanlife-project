import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";

const Vans = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [vans, setVans] = useState([]);

  const typeFilter = searchParams.get("type");
  console.log(typeFilter);
  // FETCH ALL VANS
  useEffect(() => {
    try {
      const fetchData = async () => {
        const response = await fetch("api/vans");
        const result = await response.json();
        setVans(result.vans);
        // console.log(result.vans);
      };
      fetchData();
    } catch (error) {
      console.error(error);
    }
  }, []);

  // FILTER
  const filteredVans = typeFilter
    ? vans.filter((van) => van.type === typeFilter)
    : vans;

  const vanElements = filteredVans.map((van) => (
    <div key={van.id} className="van-tile">
      <Link to={`/van/${van.id}`}>
        <img src={van.imageUrl} />
        <div className="van-info">
          <h3>{van.name}</h3>
          <p>
            ${van.price}
            <span>/day</span>
          </p>
        </div>
        <i className={`van-type ${van.type} selected`}>{van.type}</i>
      </Link>
    </div>
  ));

  return (
    <div className="van-list-container">
      <h1>Explore our van options</h1>
      <div className="van-list">{vanElements}</div>
    </div>
  );
};
export default Vans;
