import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import Navbar from "./Navbar";

const Layout = () => {
  return (
    <div className="site-wrapper">
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};
export default Layout;

//! https://reactrouter.com/en/main/start/concepts#outlets
// Ein Outlet ist ein spezielles Element(eine art Platzhalter), das definiert,
// wo der Inhalt gerendert wird, der von einer Route übereinstimmt.
