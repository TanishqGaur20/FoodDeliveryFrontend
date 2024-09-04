import React, { useState, useEffect } from 'react';
import './Cart.css';
import { sendDataToCart } from '../Home/Card';

function Cart() {
    const [data, setData] = useState([]);
    const [totalPrice, settotalPrice] = useState('00')
    //assigning data by cart data returned from card.jsx
    useEffect(() => {
        let cartData = sendDataToCart()
        console.log('sendDataToCart : ', cartData);
        window.scrollTo({
            top: 0,
            behavior: 'smooth' // This makes the scroll smooth
        });
        setData(sendDataToCart());
        let price = cartData.reduce((accu, val) => accu + val.price, 0)
        settotalPrice(price)

    }, []);

    //functionality for delete
    function deleteItem(id) {
        let wholeData = JSON.parse(localStorage.getItem('cartData'))
        let modifiedData = wholeData.filter(x => x.id != id)
        setData(modifiedData)
        localStorage.setItem('cartData', JSON.stringify(modifiedData))

        let price = modifiedData.reduce((accu, val) => accu + val.price, 0)
        settotalPrice(price)

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
        let price = updatedData.reduce((accu, val) => accu + val.price, 0)
        settotalPrice(price)

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

        if (!userInput) {
            return;
        }

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

        await fetch(import.meta.env.VITE_API_URL + 'cartData', {
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'post',
            body: JSON.stringify({ modData })

        })

    }

    return (
        <div className='cart'>
            <h1 className='cartHeading'>YOUR CART <i class="fa-solid fa-cart-plus"></i></h1>
            <div className="items">
                {
                    data.length === 0 ? (<div className='emptyCartDiv'>
                        <h1 style={{ color: 'red' }}>Your cart is empty... Hurry Up ! !</h1>
                        <img className='emptycartImg' src="https://cdn.pixabay.com/photo/2017/07/20/17/36/shopping-cart-2523066_1280.png" alt="" />
                    </div>
                    ) : (
                        data.map((item, index) => (
                            <div key={index} className="cart-item">
                                <img src={item.img} alt={item.name} />
                                <div>
                                    <h2>{item.name} <i className="fa-regular fa-trash-can text-danger delete " onClick={() => deleteItem(item.id)}></i></h2>
                                    <p className='pI'>Quantity: {item.quantity} <i className="fa-solid fa-plus plus text-success" onClick={() => handleQuantity('+', item.id)}></i> <i className="fa-solid minus fa-minus text-danger" onClick={() => handleQuantity('-', item.id)}></i> </p>
                                    <p>Size: {item.size}</p>
                                    <p>Price: ₹{item.price}.00 { }</p>
                                </div>
                            </div>
                        ))
                    )
                }
            </div>
            {
                data.length === 0 ? <></> : <>
                    <h2 style={{ color: 'red' }}>Total Price: ₹ {totalPrice}.00/-</h2>
                    <button className='cartbtn btn' onClick={handleCheckout}>checkout</button>
                </>
            }
        </div>
    );
}

export default Cart;
