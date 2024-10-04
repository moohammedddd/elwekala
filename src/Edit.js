import { Routes, Route, useParams } from 'react-router-dom';
import { useState,useEffect } from "react";
import { toast, ToastContainer } from 'react-toastify';
import { useNavigate } from "react-router-dom"; 
function Edit (){
    const [product,setProduct]=useState('')
    const [title,settitle]=useState('')
    const [price,setprice]=useState(0)
    let { productId } = useParams();
    const navigate = useNavigate();

    const api_url = "http://localhost:1000/products";

    useEffect(() => {
        fetch(`${api_url}/${productId}`)
            .then(res => res.json())
            .then(product => {
                setProduct(product)
                settitle(product.title); // Set title state
                setprice(product.price);  // Set price state
            })
            .catch(error => {
                console.error("Error fetching product:", error);
                toast.error("Failed to load product data");
            });
    }, [productId]);

    const validation = () => {
        let result = true;
        if (title === "" || title === null) {
          result = false;
          toast.warning('Please enter title');
        }
        if (price === 0 || price === null) {
          result = false;
          toast.warning('Please enter a valid price');
        }
        
        return result;
      };
      const addProduct = (e) => {
        e.preventDefault(); // Prevent the default form submission
        if (validation()) {
    fetch(`${api_url}/${productId}`,{
        method:"PUT",
        body:JSON.stringify(
            {
                title: title,
                price: price,
                image:product.image,
                category:product.category,
                description:product.description,
                rating:product.rating
            }
               
        )
        })

        .then(res=>res.json())
        .then(json=>console.log(json))
        navigate("/update");
    }
}


    
    return(
        <>
            <div className="main-title">
                <h1>Edit Product</h1>
            </div>

           <form onSubmit={addProduct}>
                <div className="mb-3">
                  <label htmlFor="exampleInputEmail1" className="form-label">title</label>
                  <input value={title}
                         onChange={event=>{ settitle(event.target.value)}}
                         type="text" className="form-control" id="exampleInputEmail1" 
                        aria-describedby="emailHelp"/>
 
                </div>

                <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">Price</label>
                        <input  value={price}
                        type="number" className="form-control" id="exampleInputPassword1" 
                        onChange={event=>{setprice(event.target.value)}}/>
                </div>

                <div className="mb-3 form-check">

                    </div>

                <button type="submit" className="btn btn-primary" 
                 to="/products">Submit
                </button>

            </form>
            <ToastContainer /> 
      </>
    )
}
export default Edit