import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeFromCart, fetchCart, clearCart, addToCart } from "./Login/slices/Cart-slice"; // Add addToCart to imports
import { counter } from "@fortawesome/fontawesome-svg-core";
import "./Login/Style/Cart.css"
import {useNavigate } from "react-router-dom";
import { useAuth } from "./Login/Api";
import { ToastContainer } from 'react-toastify';
import { toast } from 'react-toastify';

function Cart() {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.cart.products || []);
  const [quantities, setQuantities] = useState({});
  const { isLoggedIn, setIsLoggedIn} = useAuth();
  const navigate = useNavigate();

  const handleRemove = (id) => {
    dispatch(removeFromCart(id));
  };

  const handleClear = () => {
    dispatch(clearCart());
  };

  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);

  useEffect(() => {
    const initialQuantities = products.reduce((acc, product) => {
      acc[product.id] = product.quantity || 1; // Default quantity to 1 if not available
      return acc;
    }, {});
    setQuantities(initialQuantities);
  }, [products]);

  const handleQuantityChange = async (id, value) => {
    setQuantities((prev) => ({
      ...prev,
      [id]: value,
    }));
  
    // تحديث الكمية في قاعدة البيانات
    try {
      const product = products.find(p => p.id === id);
      if (product) {
        dispatch(addToCart({ product, quantity: value })); // إرسال الكمية المحدثة إلى الخادم
      }
    } catch (error) {
      console.error("Error updating quantity:", error);
    }
  };
  

  const totalPrice = products.reduce((acc, product) => {
    const quantity = quantities[product.id] || 1;
    acc += product.price * quantity;
    return acc;
  }, 0);
 
  const handleSubmit = () => {
    if ( isLoggedIn) {
      navigate('/money');
    } else {
      navigate('/login');
      // toast.error('please go to login page');
    }
  };
  


  return (
    <div className="cart" >
       <div className="containerr">


      <button onClick={handleClear} className="btn btn-danger">
        Clear Cart
      </button>
      <h5 className="price main-title"> Total Price:
          <span>
            {totalPrice.toFixed(2)}$
          </span> 
      </h5>
      <table className="table-cart">
        <thead className="thead-dark">
          <tr className="main-title">
            <th scope="col">Counter</th>
            <th scope="col">Title</th>
            <th scope="col">Image</th>
            <th scope="col">Price</th>
            <th scope="col">Quantity</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {products.length > 0 ? (
            products.map((product,index) => (
              <tr key={product.id}>
               <td>{index +1}</td>
                <td>{product.title}</td>
                <td>
                  <img src={product.image} alt={product.title} style={{ width: "50px" }} />
                </td>
                <td>{(product.price * (quantities[product.id] || 1)).toFixed(2)}$</td>
                <td>


                <div className="quantity-input">
                   <button
                      type="button"
                      onClick={() => handleQuantityChange(product.id, (quantities[product.id] || 1) - 1)}
                      disabled={quantities[product.id] <= 1}
                      className="quantity-btn"
                              >
                              -
                   </button>
  
                   <input
                        type="number"
                        value={quantities[product.id] || 1}
                        onChange={(e) => handleQuantityChange(product.id, parseInt(e.target.value, 10))}
                        min="1"
                        className="quantity-input-field"
                   />

                   <button
                           type="button"
                           onClick={() => handleQuantityChange(product.id, (quantities[product.id] || 1) + 1)}
                           className="quantity-btn"
                               >
                              +
                   </button>
                </div>


                </td>
                <td>
                  <button
                    type="button"
                    className="btn btn-danger m-1"
                    onClick={() => handleRemove(product.id)}
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6">No products in cart</td>
            </tr>
          )}
        </tbody>
      </table>
      {products.length > 0 ? (
     <button className="pay-button text-center" onClick={handleSubmit}>Pay Now</button>
        ) : null}
          <ToastContainer
          position="top-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          className="toast-center"
          limit={3}
        />

    </div>
    
    </div>
  );
}

export default Cart;
