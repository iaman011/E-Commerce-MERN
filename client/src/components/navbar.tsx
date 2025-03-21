import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";

export const Navbar = () => {
  return (
    <div className="navbar">
      <div className="navbar-title">
        <h1> Aman Shop</h1>
      </div>

      <div className="navbar-links">
        <Link to="/"> Shop </Link>
        <Link to="/purchased-items"> Purchases </Link>
        <Link to="/checkout">
            <FontAwesomeIcon icon= {faShoppingCart} />
        </Link>
       
      </div>
    </div>
  );
};

export default Navbar;
