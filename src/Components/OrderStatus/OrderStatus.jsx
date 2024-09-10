import React, { useEffect, useState } from "react";
import "./OrderStatus.css";

function OrderStatus() {
  const [data, setdata] = useState([]);
  const [email, setemail] = useState("");

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

    let Email = JSON.parse(localStorage.getItem("userDetails")).email;
    setemail(Email);

    async function getData() {
      let res = await fetch("https://fooddeliverybackend-tglk.onrender.com/getFeedbackDataforUser",
        {
          method: "get",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      let response = await res.json();
      setdata(response.data);
    }
    getData();
  }, []);

  return (
    <div className="mainOrderStatus">
      <h1>Your Order Status</h1>
      <div className="orderTable">
        {data.length > 0 ? (
          data
            .filter((x) => x.email === email)
            .reverse() // Filter data based on email
            .map((x) => (
              <div className="orderRow" key={x._id}>
                <div className="orderCell">{x.name}</div>
                <div className="orderCell">{x.price}</div>
                <div className="orderCell">{x.size}</div>
                <div className="orderCell">{x.location}</div>
                <div className="orderCell">{x.quantity}</div>
                <div className="orderCell">{x.orderTime}</div>
                <div
                  className={`orderCell  ${x.Status === "Out of delivery"
                    ? "text-success"
                    : x.Status === "Reject"
                      ? "text-danger"
                      : "text-primary"
                    } status`}
                >
                  {x.Status}
                </div>
              </div>
            ))
        ) : (
          <div className="empty">
            <h3>No Orders <i className="timerIcon fa-solid fa-hourglass"></i></h3>
            <img src="https://cdni.iconscout.com/illustration/premium/thumb/empty-cart-2130356-1800917.png" alt="" />
          </div>
        )}
      </div>
    </div>
  );
}

export default OrderStatus;
