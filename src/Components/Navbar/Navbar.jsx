import React, { useState, useEffect, useRef } from "react";
import "./Navbar.css";
import { NavLink, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const line1Ref = useRef(null);
  const line2Ref = useRef(null);
  const line3Ref = useRef(null);
  const slideBarRef = useRef(null);
  const navigate = useNavigate();
  const [userDets, setUserDets] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);

    if (!isMenuOpen) {
      // Open menu animation
      gsap.to(line1Ref.current, { display: "none" });
      gsap.to(line2Ref.current, {
        width: "82%",
        transform: "translate(-50%,0px) rotate(-45deg)",
        duration: 0.6,
      });
      gsap.to(line3Ref.current, {
        width: "82%",
        transform: "translate(-50%,0px) rotate(45deg)",
        duration: 0.6,
      });
      gsap.to(slideBarRef.current, {
        right: "0%",
        opacity: 1,
        duration: 0.6,
      });
      gsap.fromTo(
        ".slideBar h3",
        {
          x: 400,
          opacity: 1,
        },
        {
          x: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.1,
        }
      );
    } else {
      // Close menu animation
      gsap.to(line1Ref.current, { display: "block" });
      gsap.to(line2Ref.current, {
        width: "60%",
        transform: "translate(-50%,-9px) rotate(0deg)",
        duration: 0.6,
      });
      gsap.to(line3Ref.current, {
        width: "60%",
        transform: "translate(-50%,6px) rotate(0deg)",
        duration: 0.6,
      });
      gsap.to(slideBarRef.current, {
        right: "-32%",
        opacity: 0,
        duration: 1,
      });
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("userDetails");
    localStorage.removeItem("cartData");
    setUserDets(null);
    navigate("/");
    window.location.reload();
  };

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("userDetails")) || null;
    if (user) {
      async function userAdminDets() {
        const response = await fetch(import.meta.env.VITE_API_URL + "isAdmin", {
          method: "post",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: user.email }),
        });
        const result = await response.json();
        setIsAdmin(result.isAdmins);
      }
      userAdminDets();
      setUserDets(user);
    }
  }, []);

  //close slidebar on click of any navitem
  let NavLinks = document.querySelectorAll(".navlinks");
  NavLinks.forEach((NavLink) => {
    NavLink.addEventListener("click", () => {
      handleMenuToggle();
    });
  });
  return (
    <div className="Navbar">
      <NavLink to="/">
        <img
          className="logo"
          src="http://thepresidentcafe.com/images/logo.png"
          alt=""
        />
      </NavLink>

      <div className="menuDivs" onClick={handleMenuToggle}>
        <h1 className="line1" ref={line1Ref}></h1>
        <h1 className="line2" ref={line2Ref}></h1>
        <h1 className="line3" ref={line3Ref}></h1>
      </div>

      <div className="slideBar" ref={slideBarRef}>
        <div className="navSpan">
          <img
            src="https://www.pngall.com/wp-content/uploads/12/Free-Delivery.png"
            className="freeDelivery"
            alt=""
          />
          <NavLink to="/" className="navlinks">
            Home
          </NavLink>
          <NavLink to="/contact" className="navlinks">
            Contact
          </NavLink>
          {isAdmin && (
            <>
              <NavLink className="navlinks" to="/adminOrders">
                Todays Orders
              </NavLink>
              <NavLink className="navlinks" to="/addItem">
                Add Item
              </NavLink>
            </>
          )}
          {!userDets ? (
            <>
              <NavLink className="navlinks" to="/signup">
                Signup
              </NavLink>
              <NavLink to="/login" className="navlinks">
                Login
              </NavLink>
            </>
          ) : (
            <>
              {!isAdmin && (
                <>
                  <NavLink className="navlinks" to="/OrderStatus">
                    Order Status
                  </NavLink>
                  <NavLink className="navlinks" to="/cart">
                    Cart
                  </NavLink>
                </>
              )}
              <NavLink to="/" onClick={handleLogout} className="navlinks">
                Logout
              </NavLink>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
