import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { addToDb, getStoredCart } from '../../utilities/fakedb';
import Cart from '../Cart/Cart';
import Product from '../Product/Product';
import './Shop.css'

const Shop = () => {
    const [products,setProducts] = useState([])
    const [cart, setCart] = useState([])
    useEffect( () => {
        console.log('products load before fetch', products);
        fetch('products.json')
        .then(res => res.json())
        .then(data => {
        setProducts(data)
        // console.log('Products Loaded');
        })
    },[]);

    useEffect( () => {
        console.log('Local Storage first Line');
        const storedCart = getStoredCart();
        const savedCart = []
        // console.log(storedCart);
        for (const id in storedCart) {
            const addedProduct = products.find(product => product.id === id);
            if(addedProduct){
                const quantity = storedCart[id]
                addedProduct.quantity = quantity;
                savedCart.push(addedProduct)
            }
        }
        setCart(savedCart)
        // console.log('Local Storage Finished');
    },[products])
    
    const handleAddToCart = (product) =>{
        // console.log(product);
        const newCart = [...cart, product]
        setCart(newCart);
        addToDb(product.id)
    }
    return (
        <div className='shop-container'>
            <div className="products-container">
                {
                    products.map( product => 
                    <Product
                        key={product.id}
                        product = {product}
                        handleAddToCart = {handleAddToCart}
                        ></Product>)
                }
            </div>
            <div className="cart-container">
                <Cart cart={cart}></Cart>
            </div>
        </div>
    );
}

export default Shop