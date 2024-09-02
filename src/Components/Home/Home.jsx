import React, { useEffect, useState, useLayoutEffect } from "react";
import "./Home.css";
import Card from "./Card";

function Home() {
  const [data, setdata] = useState([]);
  const [searchItem, setsearchItem] = useState("");

  async function getData() {
    const res = await fetch('https://fooddeliverybackend-tglk.onrender.com/', {
      method: "get",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const result = await res.json();
    console.log(data);

    setdata(result);
  }

  useEffect(() => {
    console.log("data", data);
  }, [data]);

  useLayoutEffect(() => {
    getData();

    gsap.set(".waiter", { y: "-400px" }); // Reset position before animating
    gsap.to(".waiter", {
      y: "0px", // End position
      duration: 1.5,
    });

    gsap.to(".welcomeH1", {
      width: "100%",
      duration: 3,
      opacity: 1,
      ease: "linear",
    });
    gsap.set(".welcomeContentDiv h5", { opacity: 0, x: "-300px" });
    gsap.to(".welcomeContentDiv h5", {
      x: "0px",
      opacity: 1,
      duration: 2,
      stagger: 0.5,
    });
    gsap.set(".burger", { opacity: 1 });
    gsap.from(".burger", {
      delay: 1,
      opacity: 0,
      duration: 2,
    });
  }, []);

  return (
    <div className="home">
      <div className="hero">
        <img
          className="burger"
          src="https://static.vecteezy.com/system/resources/previews/025/065/315/original/fast-food-meal-with-ai-generated-free-png.png"
          alt=""
        />
        <img
          className="waiter"
          src="https://static.vecteezy.com/system/resources/previews/023/981/179/non_2x/waiter-man-cartoon-style-illustration-free-png.png"
          alt=""
        />
        <div className="welcomeContentDiv">
          <h1 className="welcomeH1">Welcome to [Your Cafe's Name]!</h1>
          <h3>Delicious Meals, Delivered to Your Doorstep</h3>
          <h5>
            <i className="fa-solid fa-burger"></i> &nbsp; Fresh Ingredients
          </h5>
          <h5>
            <i className="fa-solid fa-book-open"></i> &nbsp; Homemade Recipes
          </h5>
          <h5>
            <i className="fa-solid fa-truck"></i> &nbsp; Quick Delivery
          </h5>
        </div>
      </div>
      <div className="menuDiv">
        <label id="inputLabel">Search here</label>
        <div className="input-group">
          <div className="input-group-prepend">
            <span className="input-group-text searchInput" id="basic-addon1">
              Search
            </span>
          </div>
          <input
            type="text"
            className="form-control"
            placeholder="Search Dishes"
            aria-label="Search"
            aria-describedby="basic-addon1"
            value={searchItem}
            onChange={(e) => setsearchItem(e.target.value)}
          />
        </div>
        {searchItem ? (
          <>
            <div className="card-item">
              {data
                .filter((food) =>
                  food.name.toLowerCase().includes(searchItem.toLowerCase())
                )
                .map((filteredFood) => (
                  <Card key={filteredFood._id} food={filteredFood} />
                ))}
            </div>
          </>
        ) : (
          <>
            <h1 className="categoryName">Biryani/Rice</h1>
            <div className="card-item">
              {data
                .filter((food) => food.CategoryName === "Biryani/Rice")
                .map((filteredFood) => (
                  <Card key={filteredFood._id} food={filteredFood} />
                ))}
            </div>
            <h1 className="categoryName">Pizza</h1>
            <div className="card-item">
              {data
                .filter((food) => food.CategoryName === "Pizza")
                .map((filteredFood) => (
                  <Card key={filteredFood._id} food={filteredFood} />
                ))}
            </div>
            <h1 className="categoryName">Starter</h1>
            <div className="card-item">
              {data
                .filter((food) => food.CategoryName === "Starter")
                .map((filteredFood) => (
                  <Card key={filteredFood._id} food={filteredFood} />
                ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Home;
