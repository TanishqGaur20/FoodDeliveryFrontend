import React, { useEffect, useState } from "react";
import "./AdminOrder.css";

const AdminOrders = () => {
  const [data, setData] = useState([]);
  const [feedData, setFeedData] = useState([]);
  const [status, setStatus] = useState({});
  const [allDBfeedData, setAllDBfeedData] = useState([]);

  useEffect(() => {
    async function getOrderData() {
      try {
        // Fetch order data
        let res = await fetch("https://fooddeliverybackend-tglk.onrender.com/adminOrders", {
          headers: {
            "Content-Type": "application/json",
          },
          method: "get",
        });
        let result = await res.json();
        setData(result.data);

        // Fetch existing feedback statuses
        let feedbackResult = result.allDBfeedData || [];
        let feedbackStatuses = feedbackResult.reduce((acc, item) => {
          acc[item._id] = item.Status;
          return acc;
        }, {});
        setStatus(feedbackStatuses);
        setAllDBfeedData(feedbackResult.map((x) => x._id));
      } catch (error) {
        console.log(error);
      }
    }
    getOrderData();
  }, []);

  function handleSelect(item, e) {
    const newStatus = e.target.value;
    item["Status"] = newStatus;
    let updatedData = feedData.filter((x) => x._id !== item._id);
    updatedData.push(item);
    setFeedData(updatedData);

    setStatus((prevStatus) => ({
      ...prevStatus,
      [item._id]: newStatus,
    }));
  }

  async function sendFeedToBackend() {
    try {
      const res = await fetch("https://fooddeliverybackend-tglk.onrender.com/feedbackData", {
        headers: {
          "Content-Type": "application/json",
        },
        method: "post",
        body: JSON.stringify({ feedData }),
      });
      let result = await res.json();
      console.log(result.success);

      let allDBFeedIds = result.allDBfeedData.map((x) => x._id);
      let allDBFeedStatuses = result.allDBfeedData.reduce((acc, item) => {
        acc[item._id] = item.Status;
        return acc;
      }, {});
      setStatus(allDBFeedStatuses);
      setAllDBfeedData(allDBFeedIds);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="adminOrders">
      <h1 className="adminOrdersHeading">Admin Orders</h1>
      <div className="orderList">
        {data.length > 0 ? (
          data.map((order) =>
            order.cartData.map((item) => {
              const dateTime = item.orderTime;
              const orderDate = dateTime.split(" ").slice(0, 3).join(" ");

              const today = new Date();
              const todayDate = `${String(today.getDate()).padStart(
                2,
                "0"
              )} ${String(today.getMonth() + 1).padStart(
                2,
                "0"
              )} ${today.getFullYear()}`;

              if (orderDate === todayDate) {
                return (
                  <div className="orderItem" key={item._id}>
                    <div className="orderDetails">
                      <p>
                        <strong>Email:</strong> {item.email}
                      </p>
                      <p>
                        <strong>Name:</strong> {item.name}
                      </p>
                      <p>
                        <strong>Quantity:</strong> {item.quantity}
                      </p>
                      <p>
                        <strong>Size:</strong> {item.size}
                      </p>
                      <p>
                        <strong>Price:</strong> ₹{item.price}
                      </p>
                      <p>
                        <strong>Location:</strong> {item.location}
                      </p>
                      <p>
                        <strong>Order Time:</strong> {item.orderTime.slice(11)}
                      </p>
                    </div>
                    <div className="orderActions">
                      <h3>{status[item._id]}</h3>
                      <select onChange={(e) => handleSelect(item, e)}>
                        <option value="Accept">Accept</option>
                        <option value="15min">15 Min.</option>
                        <option value="30min">30 Min.</option>
                        <option value="45min">45 Min.</option>
                        <option value="Reject">Reject</option>
                        <option value="Out of delivery">Out of delivery</option>
                      </select>
                    </div>
                  </div>
                );
              }
              return null;
            })
          )
        ) : (
          <p>No orders available.</p>
        )}
      </div>
      <button className="btn-primary sendfeedbtn" onClick={sendFeedToBackend}>
        Send Feedback
      </button>
    </div>
  );
};

export default AdminOrders;
