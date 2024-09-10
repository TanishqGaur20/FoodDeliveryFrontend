import React, { useState, useEffect, useRef } from "react";
import "./Signup.css";
import { useNavigate, NavLink } from "react-router-dom";

function Signup() {

  const loaderRef = useRef()
  const [validationToast, setvalidationToast] = useState(false)
  const navigate = useNavigate();
  const [toast, settoast] = useState(false);
  const [userExistToast, setuserExistToast] = useState(false);
  const [otpToggle, setotpToggle] = useState(false);
  const [otp, setotp] = useState({
    otp1: '', otp2: '', otp3: '', otp4: ''
  });
  const [verifyOtp, setverifyOtp] = useState(false)
  const [data, setdata] = useState({
    name: "",
    password: "",
    email: "",
    phone: "",
  });

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth' // This makes the scroll smooth
    });
  }, [])

  function changeOtp(e) {
    const { name, value } = e.target
    setotp((preval) => {
      return {
        ...preval, [name]: value
      }
    })
    if (value.length === 1) {
      var modName = name.slice(0, 3)
      var index = parseInt(name.slice(3)) + 1;

      const nextInput = document.querySelector(`.${modName}${index}`)
      if (nextInput) {
        nextInput.focus();
      }
    }

  }
  function handleChange(e) {
    let { name, value } = e.target;
    setdata({
      ...data,
      [name]: value || "",
    });
  }

  async function handlesubmit(e) {
    try {
      setvalidationToast(false);

      if (!data.name || !data.phone || !data.email || !data.password) {
        console.log(validationToast);
        console.log(data.name, data.phone, data.email, data.password);

        setTimeout(() => {
          setvalidationToast(true);
        }, 100);
        return;
      }

      loaderRef.current.style.display = 'block'
      const res = await fetch("https://fooddeliverybackend-tglk.onrender.com/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const result = await res.json();
      console.log(result);
      if (result) {
        loaderRef.current.style.display = 'none'
      }

      if (result.userExist) {
        // alert('exist')
        setuserExistToast(true);
      }

      if (result.otp) {
        settoast(true);
        setotpToggle(true);
      }
    } catch (error) {
      console.log(error);
    }
    console.log(data);
  }

  async function handlesubmitOTP() {
    try {
      setverifyOtp(false)
      const concatinatedOtp = otp.otp1 + otp.otp2 + otp.otp3 + otp.otp4
      console.log(concatinatedOtp);

      loaderRef.current.style.display = 'block'
      let res = await fetch(import.meta.env.VITE_API_URL + "otp", {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({ otp: concatinatedOtp, data }),
      });

      let result = await res.json();
      if (result) {
        loaderRef.current.style.display = 'none'
      }
      console.log(result);

      if (result.success) {
        navigate("/login");
      } else {
        setverifyOtp(true)
      }
    } catch (error) {
      console.log("otp", error);
    }
  }

  return (
    <div className="signup">
      <div className="innerDiv">
        <div className="left">
          {
            !otpToggle ? <img
              src="https://cdni.iconscout.com/illustration/premium/thumb/female-web-developer-working-on-project-5691620-4759502.png"
              alt="Signup Developer png"
            /> : <img src="https://cdn3d.iconscout.com/3d/premium/thumb/two-step-verification-5353044-4468776.png" alt="Signup Developer png" />
          }

        </div>
        <div className="right">
          <span className="loader" ref={loaderRef}></span>
          <h1>New User Signup</h1>
          <form>
            {!otpToggle ? (
              <>
                <div className="input-group mb-3">
                  <span className="input-group-text" id="basic-addon1">
                    Name
                  </span>
                  <input
                    type="text"
                    className="form-control"
                    onChange={handleChange}
                    value={data.name}
                    placeholder="Username"
                    aria-label="Username"
                    name="name"
                    aria-describedby="basic-addon1"
                  />
                </div>

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
                    Phone
                  </span>
                  <input
                    type="number"
                    name="phone"
                    className="form-control"
                    onChange={handleChange}
                    value={data.phone}
                    placeholder="Phone"
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
              </>
            ) : (
              <>
                <h3 className="verificationHeading">Enter verification code </h3>
                <div className="otpDiv mb-3">
                  <input name="otp1" maxLength='1' value={otp.opt1} autoComplete="off" className="otpInput otp1" onChange={changeOtp} aria-label="Username" aria-describedby="basic-addon1" />
                  <input name="otp2" maxLength='1' value={otp.otp2} autoComplete="off" className="otpInput otp2" onChange={changeOtp} aria-label="Username" aria-describedby="basic-addon1" />
                  <input name="otp3" maxLength='1' value={otp.otp3} autoComplete="off" className="otpInput otp3" onChange={changeOtp} aria-label="Username" aria-describedby="basic-addon1" />
                  <input name="otp4" maxLength='1' value={otp.otp4} autoComplete="off" className="otpInput otp4" onChange={changeOtp} aria-label="Username" aria-describedby="basic-addon1" />
                </div>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handlesubmitOTP}
                >
                  Submit
                </button>
              </>
            )}
          </form>
          <p className="directLinkP">Already have an Account ...? <NavLink className='directLinkPNavlink' to='/login'>Login <i className="fa-solid fa-user-plus"></i></NavLink></p>
        </div>
      </div>
      <div
        className={`toast ${toast ? "show" : ""}`}
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
            type="button"
            className="btn-close"
            data-bs-dismiss="toast"
            aria-label="Close"
          ></button>
        </div>
        <div className="toast-body">OTP sent to your email. ✅</div>
      </div>

      <div
        className={`toast ${userExistToast ? "show" : ""}`}
        role="alert"
        aria-live="assertive"
        aria-atomic="true"
      >
        <div className="toast-header">
          <img
            src="https://tse2.mm.bing.net/th?id=OIP.cmTcUqX-2WFqJofdiwQLBQHaHa&pid=Api&P=0&h=30"
            className="rounded me-2"
            alt="X"
          />
          <strong className="me-auto">Notification 🔔</strong>
          <small>Just Now</small>
          <button
            type="button"
            onClick={() => setuserExistToast(false)}
            className="btn-close"
            data-bs-dismiss="toast"
            aria-label="Close"
          ></button>
        </div>
        <div className="toast-body">Email is already Registered... Try to Login</div>

      </div>

      <div
        className={`toast ${validationToast ? 'show' : ''}`}
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
          <strong className="me-auto">Alert 🔔</strong>
          <small>Just Now</small>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="toast"
            aria-label="Close"
          ></button>
        </div>
        <div className="toast-body">Please fill all the fields before submition ✅</div>
      </div>

      <div
        className={`toast ${verifyOtp ? 'show' : ''}`}
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
          <strong className="me-auto">Alert 🔔</strong>
          <small>Just Now</small>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="toast"
            aria-label="Close"
          ></button>
        </div>
        <div className="toast-body">Incorrect OTP</div>
      </div>

    </div >
  );
}

export default Signup;
