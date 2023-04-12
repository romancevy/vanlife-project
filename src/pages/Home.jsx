import { Link } from "react-router-dom";
import vanImg from "../assets/images/hippie-van.svg";
import "./Home.css";

const Home = () => {
  return (
    <>
      <div className="home-container">
        <h1>You got the travel plans, we got the travel vans.</h1>
        <p>
          Add adventure to your life by joining the #vanlife movement. Rent the
          perfect van to make your perfect road trip.
        </p>
        <Link to="vans">Find your van</Link>
      </div>
      <div className="van-icon-container">
        <span></span>
        <img src={vanImg} className="van-icon" />
        <span></span>
      </div>
    </>
  );
};
export default Home;
