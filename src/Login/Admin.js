import { Slide } from "react-toastify"
import Nav from "./Nav"
import Slider from "./Slider"
import { useState } from "react";
function Admin(){
    const [update, setupdate] = useState(true);
    return(
       
        <>
      <Nav></Nav>
      <Slider></Slider>
        </>
    )
}
export default Admin