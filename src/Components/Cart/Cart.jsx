import React, { useState, useEffect } from 'react';
import './Cart.css';
import { sendDataToCart } from '../Home/Card';

function Cart() {
    const [data, setData] = useState([]);
    //assigning data by cart data returned from card.jsx
    useEffect(() => {
        console.log('sendDataToCart : ', sendDataToCart());
        window.scrollTo({
            top: 0,
            behavior: 'smooth' // This makes the scroll smooth
        });
        setData(sendDataToCart());
    }, []);
    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };
    //functionality for delete
    function deleteItem(id) {
        let wholeData = JSON.parse(localStorage.getItem('cartData'))

        let modifiedData = wholeData.filter(x => x.id != id)
        setData(modifiedData)
        localStorage.setItem('cartData', JSON.stringify(modifiedData))

    }

    //functionality fo increase decrease quantity
    function handleQuantity(action, id) {

        const updatedData = data.map((x) => {
            if (x.id == id) {
                let updatequantity = action == '+' ? x.quantity + 1 : (x.quantity == 1) ? x.quantity : x.quantity - 1
                return { ...x, quantity: Math.max(updatequantity, 1), price: x.price / x.quantity * updatequantity }
            }
            return x
        })
        setData(updatedData)
        localStorage.setItem('cartData', JSON.stringify(updatedData))

    }


    //handle checkout
    async function handleCheckout() {


        let cartData = JSON.parse(localStorage.getItem('cartData'))
        if (!cartData) {
            alert('Add some items to the cart')
            return;
        }
        const userInput = prompt("Please enter your Location for Delivery:");
        let userDetails = JSON.parse(localStorage.getItem('userDetails'))

        const currentDate = new Date();

        const day = String(currentDate.getDate()).padStart(2, '0');
        const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed, so add 1
        const year = currentDate.getFullYear();
        const hours = String(currentDate.getHours()).padStart(2, '0');
        const minutes = String(currentDate.getMinutes()).padStart(2, '0');
        const seconds = String(currentDate.getSeconds()).padStart(2, '0');

        const orderTime = `${day} ${month} ${year} ${hours}:${minutes}:${seconds}`;
        //adding mail and time to each data
        let modData = cartData.map((item) => {
            var newItem = {
                ...item,
                orderTime: orderTime,
                email: userDetails.email,
                location: userInput // replace with dynamic email if needed
            };
            return newItem
        })


        console.log('modData', modData);

        setData([])
        localStorage.removeItem('cartData')

        await fetch('http://localhost:5000/cartData', {
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'post',
            body: JSON.stringify({ modData })

        })

    }

    return (
        <div className='cart'>
            <h1 className='cartHeading'>YOUR CART</h1>
            <div className="items">
                {
                    data.length === 0 ? (
                        <p>Your cart is empty.</p>
                    ) : (
                        data.map((item, index) => (
                            <div key={index} className="cart-item">
                                <img src={item.img} alt={item.name} />
                                <div>
                                    <h2>{item.name} <i className="fa-regular fa-trash-can text-danger delete " onClick={() => deleteItem(item.id)}></i></h2>
                                    <p className='pI'>Quantity: {item.quantity} <i className="fa-solid fa-plus plus text-success" onClick={() => handleQuantity('+', item.id)}></i> <i className="fa-solid minus fa-minus text-danger" onClick={() => handleQuantity('-', item.id)}></i> </p>
                                    <p>Size: {item.size}</p>
                                    <p>Price: ₹{item.price}.00</p>
                                </div>
                            </div>
                        ))
                    )
                }
            </div>
            <button className='btn-primary btn' onClick={handleCheckout}>checkout</button>
        </div>
    );
}

export default Cart;
