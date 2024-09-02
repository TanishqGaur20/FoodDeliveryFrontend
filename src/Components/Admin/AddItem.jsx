import React, { useState, useRef } from "react";
import "./AddItem.css";

const AddItem = () => {
  const [formData, setFormData] = useState({
    CategoryName: "",
    name: "",
    img: "",
    options: [
      {
        half: "",
        full: "",
      },
    ],
    description: "",
  });

  const handleChange = (e) => {
    const { id, value } = e.target;

    // Check if the field being updated is in the 'options' object
    if (id === "half" || id === "full") {
      setFormData((prevState) => ({
        ...prevState,
        options: [
          {
            ...prevState.options[0],
            [id]: value,
          },
        ],
      }));
    } else {
      setFormData((prevState) => ({
        ...prevState,
        [id]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    console.log("Form Data:", formData);

    try {
      await fetch("https://fooddeliverybackend-tglk.onrender.com/addNewMenuItem", {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ formData }),
      });
      setFormData({});
      const toastEl = document.querySelector(".toast1");
      const toast = new bootstrap.Toast(toastEl); // Initialize toast
      toast.show(); // Show the toast
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div
        className="toast toast1"
        role="alert"
        aria-live="assertive"
        aria-atomic="true"
      >
        <div className="toast-header">
          <img
            src="https://tse2.mm.bing.net/th?id=OIP.bg6GBJIZwCBZ8cxmO0OPXQHaHx&pid=Api&P=0&h=30"
            className="rounded me-2"
            alt="..."
          />
          <strong className="me-auto">New Item Added </strong>
          <small>Just Now</small>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="toast"
            aria-label="Close"
          ></button>
        </div>
        <div className="toast-body">Item Added to Menu ! 🛒</div>
      </div>

      <div className="fulladdMenuForm">
        <div className="menuForm">
          <h2 className="formHeading">Edit Menu Item</h2>

          <div className="sameGroup">
            <div className="formGroup">
              <label htmlFor="CategoryName">Category Name</label>
              <input
                type="text"
                id="CategoryName"
                value={formData.CategoryName}
                onChange={handleChange}
              />
            </div>
            <div className="formGroup">
              <label htmlFor="name">Item Name</label>
              <input
                type="text"
                id="name"
                value={formData.name}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="formGroup">
            <label htmlFor="img">Image URL</label>
            <input
              type="text"
              id="img"
              value={formData.img}
              onChange={handleChange}
            />
          </div>

          <div className="formGroup">
            <div className="options">
              <div>
                <label htmlFor="half">Half</label>
                <input
                  type="text"
                  id="half"
                  value={formData.options[0].half}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label htmlFor="full">Full</label>
                <input
                  type="text"
                  id="full"
                  value={formData.options[0].full}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>

          <div className="formGroup">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              value={formData.description}
              onChange={handleChange}
            />
            <label
              htmlFor="description"
              style={{ fontWeight: "500", fontSize: "15px" }}
            >
              Enter Only 14-18 Words for Better UI
            </label>
          </div>

          <button className="btn-primary" type="submit" onClick={handleSubmit}>
            Save
          </button>
        </div>
      </div>
    </>
  );
};

export default AddItem;
