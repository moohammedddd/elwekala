import { useState, useEffect } from "react";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "./Api";
import "./Style/Login.css"
import Imge3 from "../Login/Imges/240_F_272023262_cRXnbWsakUsNhhTxXOZZPHNaMqPqmz6F.jpg";
import Imge2 from"../Login/Imges/manga.jpg"; 

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [update, setUpdate] = useState(false);
  const { isLoggedIn, setIsLoggedIn, isAdmin, setIsAdmin } = useAuth();
  const [login, setLogin] = useState(false);
  const navigate = useNavigate(); // Initialize the navigate function

  useEffect(() => {
    console.log('Update state changed:', update);
  }, [update]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validation()) {
      try {
        const response = await fetch(`http://localhost:1000/users?username=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}`);
        const data = await response.json();

        if (data.length > 0) {
          const user = data[0];

          if (user.role === 'admin') {
           
              setIsAdmin(true)
              setIsLoggedIn(true)
              navigate('/', { state: { message: `Welcome, ${username}`, type: 'success' } });
          } else {
            setIsLoggedIn(true)
            toast.success(`Welcome, ${username}`);
            navigate('/', { state: { message: `Welcome, ${username}`, type: 'success' } });
          }
        } else {
          toast.error('Invalid username or password');
        }
      } catch (error) {
        console.error('Error:', error);
        toast.error('An error occurred. Please try again.');
      }
    }
  };

  const validation = () => {
    let result = true;
    if (username === "" || username === null) {
      result = false;
      toast.warning('Please enter your username');
    }
    if (password === "" || password === null) {
      result = false;
      toast.warning('Please enter your password');
    }
    return result;
  };
  
  return (
    <>
      <div className='text-center'>
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

      <div className="temp">
      <div className="background">
        <div className="shape">
        <img src={Imge3} alt="logo" />
        <img src={Imge2} alt="logo" />
        </div>
        {/* <div className="shape"></div> */}
      </div>
      <div className="formm">

    
      <form  onSubmit={handleSubmit}>
        <h3>Login Here</h3>

        <label htmlFor="username">Username</label>
        <input
          type="text"
          placeholder="Email or Phone"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          id="username"
        />

        <label htmlFor="password">Password</label>
        <input
          type="password"
          placeholder="Password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <div className="social ">
        <button type="submit">Log In</button>
        <Link className="btn link" to="/register">
                    Create Account
                  </Link>
        </div>
        
        
      </form>
    </div>
    </div>
    </>
  );
}

export default Login;
