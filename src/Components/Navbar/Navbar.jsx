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
  const [confirmLogoutToggle, setconfirmLogoutToggle] = useState(false)
  const [logoutConfirmOrNot, setlogoutConfirmOrNot] = useState()




  useEffect(() => {
    setconfirmLogoutToggle(false)
    if (logoutConfirmOrNot) {
      localStorage.removeItem("userDetails");
      localStorage.removeItem("cartData");
      setUserDets(null);
      navigate("/");
      window.location.reload();
    }
    else {
      return
    }

  }, [logoutConfirmOrNot])

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
        ".navlinks",
        {
          x: 400,
          opacity: 1,
        },
        {
          x: 0,
          opacity: 1,
          delay: .5,
          duration: 0.2,
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
      const timeline = gsap.timeline()
      timeline.fromTo(
        ".navlinks",
        {
          x: 0,
          opacity: 1,
        },
        {
          x: 400,
          opacity: 1,
          duration: 0.2,
          stagger: 0.1,
        }
      );
      timeline.to(slideBarRef.current, {
        right: "-100%",
        opacity: 0,
        duration: .5,
      });
    }
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
      <div style={{ display: confirmLogoutToggle ? 'flex' : '' }} className="confirmLogoutDiv">
        <img src="https://clipground.com/images/disclaimer-png-3.png" alt="" />
        <h3>Are you sure , you want to <span style={{ color: 'red' }}>Logout</span> </h3>
        <div>
          <button onClick={() => setlogoutConfirmOrNot(true)} >Yes</button>
          <button onClick={() => setlogoutConfirmOrNot(false)}>No</button>
        </div>
      </div>
      <NavLink to="/">
        <img
          className="logo"
          src="http://thepresidentcafe.com/images/logo.png"
          alt=""
        />
      </NavLink>

      <div className="imgAndMenuIcon">
        <img className="rotateimgNavbar" src="https://static.vecteezy.com/system/resources/previews/013/078/044/original/gold-leaves-circle-frame-with-pink-flower-free-png.png" alt="" />

        <div className="menuDivs" onClick={handleMenuToggle}>
          <h1 className="line1" ref={line1Ref}></h1>
          <h1 className="line2" ref={line2Ref}></h1>
          <h1 className="line3" ref={line3Ref}></h1>
        </div>
      </div>
      <div className="slideBar" ref={slideBarRef}>
        <div className="navSpan">
          <img
            src="https://www.pngall.com/wp-content/uploads/12/Free-Delivery.png"
            className="freeDelivery"
            alt=""
          />
          <NavLink to="/" className="navlinks">
            Home <i className="fa-solid fa-house"></i>
          </NavLink>
          <NavLink to="/contact" className="navlinks">
            Contact <i className="fa-regular fa-address-card"></i>
          </NavLink>
          {isAdmin && (
            <>
              <NavLink className="navlinks" to="/adminOrders">
                Todays Orders <i className="fa-solid fa-bowl-food"></i>
              </NavLink>
              <NavLink className="navlinks" to="/allusers">
                All Users <i className="fa-solid fa-users"></i>
              </NavLink>
              <NavLink className="navlinks" to="/addItem">
                Add Item <i className="fa-solid fa-circle-plus"></i>
              </NavLink>
            </>
          )}
          <NavLink className='navlinks' to='/AboutDeveloper'>About Dev. <i className="fa-solid fa-code"></i></NavLink>
          {!userDets ? (
            <>
              <NavLink className="navlinks" to="/signup">
                Signup <i className="fa-solid fa-user-plus"></i>
              </NavLink>
              <NavLink to="/login" className="navlinks">
                Login <i className="fa-solid fa-arrow-right-to-bracket"></i>
              </NavLink>
            </>
          ) : (
            <>
              {!isAdmin && (
                <>
                  <NavLink className="navlinks" to="/OrderStatus">
                    Order Status <i className="fa-regular fa-clock"></i>
                  </NavLink>
                  <NavLink className="navlinks" to="/cart">
                    Cart <i className="fa-solid fa-cart-plus"></i>
                  </NavLink>
                </>
              )}
              <NavLink to="/" onClick={() => setconfirmLogoutToggle(true)} className="navlinks text-danger">
                Logout <i className="fa-solid fa-person-running"></i>
              </NavLink>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
