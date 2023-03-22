import { Suspense, useEffect, useState } from "react";
import {
  Link,
  NavLink,
  Outlet,
  useLocation,
  useParams,
  useLoaderData,
  defer,
  Await,
} from "react-router-dom";
import { getHostVans } from "../../api";

export async function loader({ params }) {
  return defer({ hostVan: getHostVans(params.id) });
}

const HostVanDetail = () => {
  const [currentVan, setCurrentVan] = useState(null);
  const location = useLocation();

  const dataPromise = useLoaderData();
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
      <Suspense fallback={<h2>Loading...</h2>}>
        <Await resolve={dataPromise.hostVan}>
          {(currentVan) => {
            // console.log(currentVan);
            return (
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
            );
          }}
        </Await>
      </Suspense>
    </section>
  );
};
export default HostVanDetail;
