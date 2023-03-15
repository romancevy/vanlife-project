import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

const Layout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
};
export default Layout;

//! https://reactrouter.com/en/main/start/concepts#outlets
// Ein Outlet ist ein spezielles Element(eine art Platzhalter), das definiert,
// wo der Inhalt gerendert wird, der von einer Route übereinstimmt.
