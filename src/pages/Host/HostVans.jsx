import { Suspense } from "react";
import { Link, defer, Await, useLoaderData } from "react-router-dom";
import { getHostVans } from "../../api";

export async function loader() {
  return defer({ hostVans: getHostVans() });
}

const HostVans = () => {
  const dataPromise = useLoaderData();

  const renderHostVansElms = (hostVans) => {
    const hostVansEls = hostVans.map((van) => (
      <Link to={van.id} key={van.id} className="host-van-link-wrapper">
        <div className="host-van-single" key={van.id}>
          <img src={van.imageUrl} alt={`Photo of ${van.name}`} />
          <div className="host-van-info">
            <h3>{van.name}</h3>
            <p>${van.price}/day</p>
          </div>
        </div>
      </Link>
    ));
    return <section>{hostVansEls}</section>;
  };

  return (
    <section>
      <h1 className="host-vans-title">Your listed vans</h1>
      <div className="host-vans-list">
        <Suspense fallback={<h2>Loading...</h2>}>
          <Await resolve={dataPromise.hostVans}>{renderHostVansElms}</Await>
        </Suspense>
      </div>
    </section>
  );
};
export default HostVans;
