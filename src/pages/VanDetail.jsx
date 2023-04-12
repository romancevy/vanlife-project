import { Suspense } from "react";
import {
  useLocation,
  Link,
  useLoaderData,
  defer,
  Await,
} from "react-router-dom";
import { getVans } from "../api";
import "./VanDetail.css";

export function loader({ params }) {
  return defer({ van: getVans(params.id) });
}

const VanDetail = () => {
  const location = useLocation();
  const dataPromise = useLoaderData();

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
      <Suspense fallback={<h2>Loading...</h2>}>
        <Await resolve={dataPromise.van}>
          {(van) => {
            return (
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
            );
          }}
        </Await>
      </Suspense>
    </div>
  );
};
export default VanDetail;
