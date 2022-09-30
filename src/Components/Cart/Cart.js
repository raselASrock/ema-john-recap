import React from 'react';
import './Cart.css'

const Cart = (props) => {
    const {cart} = props;
    console.log(cart);

    let total = 0;
    let shipping = 0;
    for(const product of cart){
        total = total + product.price;
        shipping = shipping + product.shipping
    }
    const tax = (total * 0.1).toFixed(2)
    return (
        <div className='cart'>
            <h2>Order Summary in Cart</h2>
            <p>Selected Items: {cart.length}</p>
            <p>Total Price: ${total}</p>
            <p>Shipping Charge: ${shipping}</p>
            <p>VAT: {tax}</p>
            <h4>Grand Total: {}</h4>
        </div>
    );
};

export default Cart;