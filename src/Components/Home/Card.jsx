import React, { useState, useRef, useEffect } from 'react'
import './Card.css'


let cartDataArray = [];

//sending data to cart.js
export function sendDataToCart() {

    cartDataArray = JSON.parse(localStorage.getItem('cartData')) || []
    return cartDataArray;
}
function Card(props) {

    const [data, setdata] = useState(props.food)
    const [quan, setquan] = useState(1)
    const [price, setprice] = useState('')
    const [size, setsize] = useState()

    //setting default values
    useEffect(() => {
        const firstKey = Object.keys(data.options[0])[0]
        setprice(data.options[0][firstKey])
        setsize(firstKey)
    }, [data])

    //setting value of price 
    useEffect(() => {
        setprice(data.options[0][size])
    }, [size])

    useEffect(() => {
        gsap.set('.card', { opacity: 1, scale: 1, y: '0px' })
        gsap.from('.card', {
            opacity: 0, scale: .8,
            stagger: .35,
            y: '100px',
            scrollTrigger: {
                trigger: '.menuDiv',
                start: '0% 90%',
                end: '85% 80%',
                // markers: true,
                scrub: true
            }
        })


    }, [])


    //adding item to cart through local storage
    function addToCart() {

        let isuser = localStorage.getItem('userDetails');
        if (!isuser) {
            const cartToastDeclineEl = document.querySelector('.cartToastDecline');
            const cartToastDecline = new bootstrap.Toast(cartToastDeclineEl)
            cartToastDecline.show()
            return;
        }

        let cartData = localStorage.getItem('cartData');
        if (cartData) {
            cartDataArray = JSON.parse(cartData)
        }
        else {
            cartDataArray = []
        }

        const uniqueId = `${data._id}-${size}-${Date.now()}`;
        const newItem = {
            size: size,
            price: price,
            quantity: quan,
            name: data.name,
            img: data.img,
            price: quan * price,
            id: uniqueId,
        };
        cartDataArray = [...cartDataArray, newItem];
        localStorage.setItem('cartData', JSON.stringify(cartDataArray))
        console.log('New item added : ', cartDataArray);

        const toastEl = document.querySelector('.toast');
        const toast = new bootstrap.Toast(toastEl); // Initialize toast
        toast.show(); // Show the toast
    }


    return (
        <>


            <div className='card'>
                <img src={data.img} alt="" />
                <div className='name_desc'>
                    <h4>{data.name}</h4>
                    <p>{data.description}</p>
                </div>
                <div className='quan_price'>
                    <select onChange={(e) => setquan(parseInt(e.target.value, 10))}>
                        <option value={1}>1</option>
                        <option value={2}>2</option>
                        <option value={3}>3</option>
                        <option value={4}>4</option>
                    </select>
                    <select onChange={(e) => setsize(e.target.value)}>
                        {
                            Object.keys(data.options[0]).map(key =>
                                <option value={key}>{key}</option>
                            )

                        }
                    </select>
                    <span>₹{quan * price}</span>
                </div>
                <button onClick={addToCart}>Add to Cart</button>
            </div>

            <div className="toast" role="alert" aria-live="assertive" aria-atomic="true">
                <div className="toast-header">
                    <img src="https://tse2.mm.bing.net/th?id=OIP.bg6GBJIZwCBZ8cxmO0OPXQHaHx&pid=Api&P=0&h=30" className="rounded me-2" alt="..." />
                    <strong className="me-auto">Added to Cart </strong>
                    <small>Just Now</small>
                    <button type="button" className="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
                </div>
                <div className="toast-body">
                    Item Added to Cart ! 🛒
                </div>
            </div>

            <div className="toast cartToastDecline" role="alert" aria-live="assertive" aria-atomic="true">
                <div className="toast-header">
                    <img src="https://tse2.mm.bing.net/th?id=OIP.cmTcUqX-2WFqJofdiwQLBQHaHa&pid=Api&P=0&h=30" className="rounded me-2" alt="..." />
                    <strong className="me-auto">Login to add </strong>
                    <small>Just Now</small>
                    <button type="button" className="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
                </div>
                <div className="toast-body">
                    Login to add Items to Cart and Order! 🛒
                </div>
            </div>
        </>
    )
}
export default Card