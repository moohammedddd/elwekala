import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "./slices/Cart-slice";
import { ToastContainer, toast } from 'react-toastify'; // Import Toast components
import 'react-toastify/dist/ReactToastify.css'; // Import Toast CSS
import "./Style/Showdata.css";
import { Link } from "react-router-dom";
import { useAuth } from "./Api";

function Showdata() {
  const dispatch = useDispatch();
  const [products, setProduct] = useState([]);
  const [category, setCategory] = useState([]);
  const api_url = "http://localhost:1000/products";
  const [added, setAdded] = useState({});
  const [itemsToShow, setItemsToShow] = useState(8); 
  const [loadingMore, setLoadingMore] = useState(false);
  const {search,setSearch } = useAuth();



  const updateAdded = (id) => {
    setAdded((prev) => ({ ...prev, [id]: !prev[id] })); /* */
  };

  const fetchProducts = () => {
    fetch(api_url)
      .then((response) => response.json())
      .then((data) => setProduct(data));
  };

  const fetchCategories = () => {
    fetch(`${api_url}?_category=true`)
      .then((response) => response.json())
      .then((data) => {
        const uniqueCategories = [...new Set(data.map((item) => item.category))];
        setCategory(uniqueCategories);
      });
  };

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  const getProductCat = (catName) => {
    fetch(`${api_url}?category=${catName}`)
      .then((response) => response.json())
      .then((data) => setProduct(data));
  };

  const visibleProducts = products.slice(0, itemsToShow);

  const categoryArray = category.map((cat) => (
    <button 
      key={cat}
      className=" categ btn btn-primary col-12 col-lg p-2 m-2 w-50"
      onClick={() => getProductCat(cat)}
    >
      {cat}
    </button>
  ));

  const ProductArray = visibleProducts
  .filter((el) => {
    // تأكد من أن `title` موجود قبل تحويله إلى حروف صغيرة
    // if (el.title && props.search) {
      return search.toLowerCase() === ''
        ? true // عودة `true` إذا كانت `search` فارغة لتضمين كل المنتجات
        : el.title.toLowerCase().includes(search.toLowerCase());
    }
    // return false; // تجاهل العناصر التي لا تحتوي على `title`
  )
  
  
  
  
  .map((prod) => (
    <div className="one" key={prod.id}>
      <img src={prod.image} className="card-img-top" alt="product" />
      <div className="text">
        <h3>{prod.title}</h3>
        <p>{prod.description}</p>
      </div>
      <div className="info">
        <Link className="btn" href="#" to={`/${prod.id}`} >
          view detailes
          </Link>
        <button className="btn"
          onClick={() => {
            dispatch(addToCart({ product: prod, quantity: 1 }));
            toast.success(`${prod.title} has been added to the cart!`); // Show toast message
            updateAdded(prod.id); // Update the added state for this specific product
          }}
        >
          {added[prod.id] ? "Added to Cart" : "Add to Cart"}
        </button>
      </div>
    </div>
  ));

  const showMoreItems = () => {
    setLoadingMore(true);
    setTimeout(() => {
      setItemsToShow((prev) => prev + 4); // Load 6 more items
      setLoadingMore(false);
    }, 500); 
  };

  return (
    <div className="show">
      <h1 className="main-title text-center"> Our Products</h1>
      <div className="container">
        <div className="row d-flex justify-content-center">
        
          {categoryArray}
          <button
            className=" categ btn btn-primary col-12 col-lg p-2 m-2 w-50"
            onClick={() => fetchProducts()}
          >
            All
          </button>
        </div>
      </div>
      <div className="article">
        <div className="container">{ProductArray}</div>
      </div>
      {itemsToShow < products.length && (
          <div className="text-center mt-4">
            <button 
              className="btn btn-secondary" 
              onClick={showMoreItems}
              disabled={loadingMore} // Disable button while loading
            >
              {loadingMore ? "Loading..." : "Show More"}
            </button>
          </div>
          
        )}
      <ToastContainer /> 

    </div>
  );
}

export default Showdata;
