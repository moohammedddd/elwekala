import { useState,useEffect } from "react";
import { Routes, Route, useParams } from 'react-router-dom';
import "../Style/Showdetailes.css";
function Deta () {
    let { productId } = useParams();
    const [products, setProduct] = useState([]);
    const api_url = "http://localhost:1000/products";

    const fetchProducts = () => {
        fetch(`${api_url}/${productId}`)
          .then((response) => response.json())
          .then((data) => setProduct(data));
      };
    
      useEffect(() => {
        fetchProducts();
      }, []);


    


    return (
        <>
        <div className="detailes">
        
        <div className="article-detailes">
            <div className="container">
              <div className="text-center ">
                <div className="one" key={products.id}>
                     <div className="text">
                       
                        <h3 className="main-titlee">{products.title}</h3>
                            
                            <img src={products.image} className="card-img-top" alt="product" />
                            <p>{products.description}</p>
                            <h2><span>Price</span> {products.price}$</h2>
                            
                    </div>
                </div>
            </div>
    </div>
   </div>
       
   </div>
        </>
     
    );
  };

  export default Deta;
  