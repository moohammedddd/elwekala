import { useEffect, useState } from "react";
import swal from "sweetalert2";
import "../Login/Style/update.css";
import { Link, useNavigate } from "react-router-dom";

 function Update (){

    
    const [products,setProduct]=useState([])

    const api_url = "http://localhost:1000/products";
     // start fetch
    const featch = ()=>{
        fetch(api_url)
        .then((Response) => Response.json())
        .then((data)=>setProduct(data))
    }
    useEffect(()=>{
        featch()
    },[])
    //end featch 

    //start delete 
    
    const deleteProduct = (productId) => {
        swal.fire({
            title: `Are you sure you want to delete this product?`,  // يمكنك تعديل العنوان كما ترغب
            showCancelButton: true,
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`${api_url}/${productId}`, {
                    method: "DELETE",
                })
                .then((response) => response.json())
                .then(() => {
                    // هنا يمكنك إعادة تحميل البيانات بعد حذف المنتج
                    featch(); // استدعاء دالة fetch لإعادة تحميل المنتجات
                })
                .catch((error) => {
                    console.error("Error deleting product:", error);
                });
            }
        });
    };
    


    const ProductArray=products.map((product)=>{
        return(
            <tr key={product.id}>
                <td>{product.id}</td>
                <td>{product.title}</td>
                <td>{product.price}$</td>
                
                <td>
                    <div className="  buttons ">
                        <button className="col-lg-2 btn btn-danger -sm p-2 me-2 operation"
                        onClick={()=>deleteProduct(product.id)}
                        > delete
                        </button>

                        {/* <button className="col-lg-2  btn btn-info -sm me-2  operation" > view
                        </button> */}

                        <Link className=" col-lg-2 btn btn-primary -sm me-2 operation" to={`/edit/${product.id}`}> edit
                        </Link>
                      </div>
                </td>
            </tr>
            

        )
    })



    return(
        <>
            <div className="update-page">
            <Link className=" col-lg-2 btn btn-primary -sm me-2 add-button" to="/adding"> Add product
            </Link>
                <div className="container d-flex justify-content-center">
                  <table className="table m-3 trying  m-auto ">
                      <thead>
                            <tr>
                                 <th scope="col">id</th>
                                 <th scope="col">title</th>
                                 <th scope="col">price</th>
                                 <th scope="col ">operation</th>
                             </tr>
                     </thead>

                     <tbody>
                           {ProductArray}
                    </tbody>

                 </table>
                  
                 </div>
            </div>
       </>
    )
 }
 export default Update;