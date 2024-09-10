import React, { useState, useEffect, useRef } from "react";
import { useNavigate, NavLink } from "react-router-dom";

function Login() {

  const loaderRef = useRef()
  const [data, setdata] = useState({
    password: "",
    email: "",
  });
  const [loginsuccessToast, setloginsuccessToast] = useState(false);
  const [logindenyToast, setlogindenyToast] = useState(false);
  const navigate = useNavigate();

  function handleChange(e) {
    let { name, value } = e.target;
    setdata({
      ...data,
      [name]: value,
    });
  }
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth' // This makes the scroll smooth
    });
  }, [])


  async function handlesubmit(e) {
    try {
      loaderRef.current.style.display = 'block'

      const res = await fetch("https://fooddeliverybackend-tglk.onrender.com/login", {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(data),
      });
      const result = await res.json();

      if (result) {
        loaderRef.current.style.display = 'none'
      }

      console.log(result);
      if (res.ok) {
        setloginsuccessToast(true);
        localStorage.setItem("userDetails", JSON.stringify(data));
        setTimeout(() => {
          navigate("/");
          window.location.reload();
        }, 1000);

      } else {
        setloginsuccessToast(false);
        setTimeout(() => {
          setlogindenyToast(true);
        }, 100);
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="signup">
      <div className="innerDiv">
        <div className="left">
          <img
            src="https://cdni.iconscout.com/illustration/premium/thumb/female-web-developer-working-on-project-5691620-4759502.png"
            alt="Signup Developer png"
          />
        </div>
        <div className="right">
          <span className="loader" ref={loaderRef}></span>

          <h1>User Login</h1>
          <form>
            <div className="input-group mb-3">
              <span className="input-group-text" id="basic-addon1">
                Email
              </span>
              <input
                type="email"
                name="email"
                className="form-control"
                onChange={handleChange}
                value={data.email}
                placeholder="Email"
                aria-label="Username"
                aria-describedby="basic-addon1"
              />
            </div>

            <div className="input-group mb-3">
              <span className="input-group-text" id="basic-addon1">
                Password
              </span>
              <input
                type="password"
                name="password"
                className="form-control"
                onChange={handleChange}
                value={data.password}
                placeholder="Password"
                aria-label="Username"
                aria-describedby="basic-addon1"
              />
            </div>
            <button
              type="button"
              className="btn btn-primary"
              onClick={handlesubmit}
            >
              Submit
            </button>
          </form>
          <p className="directLinkP">Don't have any Account ...? <NavLink className='directLinkPNavlink' to='/signup'>Signup <i className="fa-solid fa-user-plus"></i></NavLink></p>
        </div>
      </div>
      <div
        className={`toast ${loginsuccessToast ? "show" : ""}`}
        role="alert"
        aria-live="assertive"
        aria-atomic="true"
      >
        <div className="toast-header">
          <img
            src="https://tse2.mm.bing.net/th?id=OIP.X96HZ4SK_kq-kETk2FxNXAHaHa&pid=Api&P=0&h=25"
            className="rounded me-2"
            alt="..."
          />
          <strong className="me-auto">Notification 🔔</strong>
          <small>Just Now</small>
          <button
            onClick={() => setloginsuccessToast(false)}
            type="button"
            className="btn-close"
            data-bs-dismiss="toast"
            aria-label="Close"
          ></button>
        </div>
        <div className="toast-body">Successfully Logged in. ✅</div>
      </div>
      <div
        className={`toast ${logindenyToast ? "show" : ""}`}
        role="alert"
        aria-live="assertive"
        aria-atomic="true"
      >
        <div className="toast-header">
          <img
            src="https://tse2.mm.bing.net/th?id=OIP.cmTcUqX-2WFqJofdiwQLBQHaHa&pid=Api&P=0&h=30"
            className="rounded me-2"
            alt="..."
          />
          <strong className="me-auto">Notification 🔔</strong>
          <small>Just Now</small>
          <button
            type="button"
            onClick={() => setlogindenyToast(false)}
            className="btn-close"
            data-bs-dismiss="toast"
            aria-label="Close"
          ></button>
        </div>
        <div className="toast-body">Wrong Credentials</div>
      </div>
    </div>
  );
}

export default Login;
