import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";

const Vans = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [vans, setVans] = useState([]);

  const typeFilter = searchParams.get("type");

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

  function handleFilterChange(key, value) {
    setSearchParams((prevParams) => {
      if (value === null) {
        prevParams.delete(key);
      } else {
        prevParams.set(key, value);
      }
      return prevParams;
    });
  }

  const vanElements = filteredVans.map((van) => (
    <div key={van.id} className="van-tile">
      {/* "state-Prop speichert die Suchparameter (useLocation hat Zugriff darauf)" */}
      <Link
        to={van.id}
        state={{ search: `?${searchParams.toString()}`, type: typeFilter }}
      >
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
      <div className="van-list-filter-buttons">
        <button
          onClick={() => handleFilterChange("type", "simple")}
          className={`van-type simple
          ${typeFilter === "simple" && "selected"}
          `}
        >
          Simple
        </button>
        <button
          onClick={() => handleFilterChange("type", "luxury")}
          className={`van-type luxury
          ${typeFilter === "luxury" && "selected"}
          `}
        >
          Luxury
        </button>
        <button
          onClick={() => handleFilterChange("type", "rugged")}
          className={`van-type rugged
          ${typeFilter === "rugged" && "selected"}
          `}
        >
          Rugged
        </button>
        {/* rendert den Button nur, wenn "type"-params existieren */}
        {typeFilter ? (
          <button
            onClick={() => handleFilterChange("type", null)}
            className="van-type clear-filters"
          >
            Clear filter
          </button>
        ) : null}
      </div>
      <div className="van-list">{vanElements}</div>
    </div>
  );
};
export default Vans;
