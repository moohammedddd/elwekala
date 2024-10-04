import { useState } from "react";
import { useNavigate } from "react-router-dom"; 
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function Adding(){
    const [title,settitle]=useState('')
    const [price,setprice]=useState(0)
    const [id,setid]=useState(0)

    
    const navigate = useNavigate();
    
    // const validation = () => {
    //     let result = true;
    //     if (title === "") {
    //         result = false;
    //         toast.warning('Please enter title');
    //     }
    //     // Ensure price is a number greater than zero
    //     if (isNaN(price) || price <= 0) {
    //         result = false;
    //         toast.warning('Please enter a valid price');
    //     }
    //     // Ensure id is a number greater than zero
    //     if (isNaN(id) || id <= 0) {
    //         result = false;
    //         toast.warning('Please enter a valid id');
    //     }
    //     return result;
    // };
    const validation = () => {
        let result = true;
        if (title === "" || title === null) {
          result = false;
          toast.warning('Please enter title');
        }
        if (price === "" || price === null) {
          result = false;
          toast.warning('Please enter a valid price');
        }
        if (id === "" || id === null) {
            result = false;
            toast.warning('Please enter a valid id');
          }
        return result;
      };
    const api_url = "http://localhost:1000/products";
   
    const addProduct = (e) => {
        e.preventDefault(); // Prevent the default form submission
        if (validation()) {
            fetch(api_url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    title: title,
                    price:price, // Convert to number
                    id: id // Convert to number
                })
            })
            .then(res => res.json())
            .then(() => {
                toast.success('Product added successfully');
                navigate("/update");
            })
            .catch(error => {
                console.error("Error adding product:", error);
                toast.error('Failed to add product');
            });
        }
    };

    return(
        <>
        <div className="main-title ">
            <h1>Add Product</h1>
        </div>

             
        <form onSubmit={addProduct}>
                 <div className="mb-3">
                     <label className="form-label">title</label>
                    <input onChange = {event=>settitle(event.target.value)}  value={title}
                    type="text" className="form-control"/>
                 </div>

                <div className="mb-3">
                    <label  className="form-label">Price</label>
                    <input onChange = {event=>setprice(event.target.value)}  value={price}
                     type="text" className="form-control"  />
                </div>

                <div className="mb-3">
                    <label className="form-label">ID</label>
                    <input  onChange = {event=>setid(event.target.value)} value={id}
                     type="text" className="form-control"  />
                </div>


                <div className="mb-3 form-check">
                </div>
              <button 
              type="submit" className="btn btn-primary">Submit</button>

            </form>
            <ToastContainer /> 
        </>
    )
}
export default Adding