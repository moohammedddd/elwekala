import { Link } from "react-router-dom";
import "./Style/Nav.css";
import Logout from './Logout';
import Imge3 from "../Login/Imges/—Pngtree—a shopping cart with some_16159216.png";
import { useSelector } from "react-redux";
import { useAuth } from "./Api";
import { useLocation } from "react-router-dom";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect } from "react";

function Nav() {
  const { isLoggedIn, setIsLoggedIn, isAdmin, setIsAdmin,search,setSearch } = useAuth();
  const cart = useSelector((state) => state.cart.products || []);

  const location = useLocation();

  useEffect(() => {
    if (location.state?.message) {
      const { message, type } = location.state;

      if (type === 'success') {
        toast.success(message);
      } else if (type === 'error') {
        toast.error(message);
      }
      
      // Clear the state after displaying the toast to prevent repeated messages
      window.history.replaceState({}, document.title);
    }
  }, [location]);

  return (

     <>
  
      <nav className="navbar f-navbar navbar-expand-lg navbar-light sticky-top ">
        <div className="container">
          <div className="row w-100 text-center">
            <div className="col-12 col-lg-4 d-flex justify-content-center align-items-center mb-2 mb-lg-0 text-center">
              <div className="row w-100 text-center">
                <div className="col-6 text-center d-flex justify-content-center align-items-center mb-0 mb-lg-0">
                  <img className="logo" src={Imge3} alt="logo"></img>
                </div>
                <div className="col-6 text-center d-flex justify-content-center align-items-center mb-0 mb-lg-4">
                  <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                  >
                    <span className="navbar-toggler-icon"></span>
                  </button>
                </div>
              </div>
            </div>

            <div className="col-12 col-lg-4 d-flex justify-content-center align-items-center mb-2 mb-lg-0">
              <h1 className="main-title">Elwekala</h1>
            </div>

            <div className="col-12 col-lg-4 d-flex justify-content-center align-items-center">
              <form className="d-flex">
                <input
                  className="form-control me-2"
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                  onChange={(event)=>{
                    setSearch(event.target.value)
                            }}
                />
              </form>
            </div>
          </div>
        </div>
      </nav>

      <nav className="navbar l-navbar navbar-expand-lg navbar-light">
        <div className="container">
          <div className="collapse navbar-collapse justify-content-center align-items-center" id="navbarSupportedContent">
            <ul className="navbar-nav mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/cart">
                  Cart - {cart.length}
                </Link>
              </li>
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  id="navbarDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Dropdown
                </a>
                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                  <li>
                    <a className="dropdown-item" href="#">
                      Action
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Another action
                    </a>
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Something else here
                    </a>
                  </li>
                </ul>
              </li>

              {!isLoggedIn ? (
                <li className="nav-item">
                  <Link to="/login" className="nav-link">
                    Login
                  </Link>
                </li>
              ) : (
                <>
                  <li className="nav-item">
                  <Link 
                    to="/" 
                   className="nav-link" 
                 onClick={() => {
                       setIsLoggedIn(false); 
                       setIsAdmin(false); 
                        console.log('User logged out');
                        }}>
                           Logout
                    </Link>
                  </li>
                  
                  {isAdmin && (
                    <li className="nav-item">
                      <Link className="nav-link" to="/update">
                        Update
                      </Link>
                    </li>
                  )}
                </>
              )}
            </ul>
          </div>
        </div>
        
      </nav>
      </>

  );
}

export default Nav;
