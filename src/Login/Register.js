import { useState } from "react"; 
import { useNavigate } from "react-router-dom"; // إضافة useNavigate
import Imge3 from "../Login/Imges/240_F_272023262_cRXnbWsakUsNhhTxXOZZPHNaMqPqmz6F.jpg";
import Imge2 from"../Login/Imges/manga.jpg"; 
import { toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';

function Register() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [update, setUpdate] = useState(false);
    const navigate = useNavigate(); // تهيئة useNavigate

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validation()) {
        fetch('http://localhost:1000/users', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json', // إضافة Content-Type
            },
            body: JSON.stringify({
                username: username,
                email: email,
                password: password
            })
        })
        .then(res => res.json())
        .then(json => {
            console.log(json);
          
            navigate('/login');
        })
        .catch(err => {
            console.error("فشل في التسجيل:", err);
            alert('فشل في التسجيل. حاول مرة أخرى.');
        });
    }
    }


    const validation = () => {
        let result = true;

        if (email === "" || email === null) {
            result = false;
            toast.warning('Please enter your email');
          }
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
            <div className="container mt-5">
               
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
        <h3>Create account</h3>

       
                    <div className="inputs">

        <label htmlFor="email">email</label>
        <input
        type="email"
        className="form-control"
        placeholder="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        
        ></input>

        <label htmlFor="username">Username</label>
        <input
           type="text"
           className="form-control"
           placeholder="username"
           value={username}
           onChange={(e) => setUsername(e.target.value)}
           
        />


        <label htmlFor="password">Password</label>
        <input
         type="password"
         className="form-control"
         placeholder="password"
         value={password}
         onChange={(e) => setPassword(e.target.value)}
       
        />
      
  </div>

        <div className="social-button ">
        <button type="submit">Submit</button>
    
        </div>
        
        
      </form>
    </div>
    </div>
            </div>
        </>
    );
}

export default Register;
