import { useState } from "react";

const Footer = () => {
  const [year, setYear] = useState(new Date().getFullYear());

  return <footer>&#169; {year} #VANLIFE</footer>;
};
export default Footer;
