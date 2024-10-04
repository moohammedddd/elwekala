import { useContext } from "react"
import { productContext } from "./App"
import  { ApiContext } from "./Login/Api"
// import ApiContext from "./Login/Api"

function Context(props){
    const value = useContext(ApiContext)
console.log(value)
    return(
        <>
        <h1>{value[1].name}</h1>
        
        
        </>
    )
}
export default Context
