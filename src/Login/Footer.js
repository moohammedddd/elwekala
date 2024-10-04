import React from 'react';
import "../Login/Style/Footer.css"
import Imge3 from "../Login/Imges/AdobeStock_122608269_Preview.jpeg";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faTwitter, faLinkedin, faReact } from '@fortawesome/free-brands-svg-icons';
import { faHome } from '@fortawesome/free-solid-svg-icons';



function Footer() {
  return (
    <div className="footer">
      <div className="container">
        <div className="imge">
          {/* Make sure the path is correct or import the image */}
          <img src={Imge3} alt="logo" />
        </div>
        <div className="social ">
          <h2>We are social</h2>
        </div>
        <div className="icons ">
        <FontAwesomeIcon icon={faFacebookF} className="social-icon" />
        <FontAwesomeIcon icon={faTwitter} className="social-icon" />
        <FontAwesomeIcon icon={faHome} className="social-icon" />
        <FontAwesomeIcon icon={faLinkedin} className="social-icon" />
        </div>
        <div className="kasper">
          <p className="copyright">
            &copy; 2024 <span>Kasper</span> All Rights Reserved
          </p>
        </div>
      </div>
    </div>
  );
}

export default Footer;
