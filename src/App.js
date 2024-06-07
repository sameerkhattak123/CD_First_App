import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { Outlet } from "react-router-dom";
import { Container } from "react-bootstrap";
import './App.css';
import Increment from "./Component/Increment";
import Navbar from "./Component/Navbar";

function App() {
  return (
    <>
  <Navbar/>
 
 
   
   <Outlet/>
  
   
   </>
  );
}

export default App;
