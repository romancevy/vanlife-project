import { useEffect, useState } from "react";
import {
  Link,
  NavLink,
  Outlet,
  useLocation,
  useParams,
} from "react-router-dom";

export async function loader() {
  return defer({ hostVans: getHostVans() });
}

const HostVanDetail = () => {
  const { id } = useParams();
  const [currentVan, setCurrentVan] = useState(null);
  const location = useLocation();

  useEffect(() => {
    try {
      const fetchData = async (id) => {
        const response = await fetch(`/api/host/vans/${id}`);
        const result = await response.json();
        setCurrentVan(result.vans);
      };
      fetchData(id);
    } catch (error) {
      console.error(error);
    }
  }, []);

  if (!currentVan) {
    return <h1>Loading...</h1>;
  }

  const activeStyle = {
    fontWeight: "bold",
    textDecoration: "underline",
    color: "#161616",
  };
  return (
    <section>
      {/* relativ zur aktuellen URL eine Stufe im Pfad zurückgehen */}
      <Link to={`..`} relative="path" className="back-button">
        &larr; <span>Back to all vans</span>
      </Link>

      <div className="host-van-detail-layout-container">
        <div className="host-van-detail">
          <img src={currentVan.imageUrl} />
          <div className="host-van-detail-info-text">
            <i className={`van-type van-type-${currentVan.type}`}>
              {currentVan.type}
            </i>
            <h3>{currentVan.name}</h3>
            <h4>${currentVan.price}/day</h4>
          </div>
        </div>
        {/*Your changes will go here*/}
        <nav className="host-van-detail-nav">
          <NavLink
            to="."
            end
            style={({ isActive }) => (isActive ? activeStyle : null)}
          >
            Details
          </NavLink>
          <NavLink
            to="pricing"
            style={({ isActive }) => (isActive ? activeStyle : null)}
          >
            Pricing
          </NavLink>
          <NavLink
            to="photos"
            style={({ isActive }) => (isActive ? activeStyle : null)}
          >
            Photos
          </NavLink>
        </nav>
        {/* https://reactrouter.com/en/main/hooks/use-outlet-context */}
        {<Outlet context={currentVan} />}
      </div>
    </section>
  );
};
export default HostVanDetail;
