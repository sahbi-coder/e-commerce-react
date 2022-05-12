import Product from "./routes/Product";
import Home from "./routes/Home";
import ProductList from "./routes/ProductList";
import Cart from "./routes/Cart";
import Login from "./routes/Login";
import Register from "./routes/Register";
import About from "./routes/About";
import Contact from "./routes/Contact";
import Categories from "./routes/Categories";


import { useEffect} from "react";
import {  Routes, Route,useLocation,useNavigate } from "react-router-dom";
import {useSelector} from 'react-redux'
import Dashboard  from "./routes/Dashboard";
function App() {
  
  const currentUser = useSelector(store=>store.user.currentUser)



 
  


  return (
  
     
        <Routes>
          <Route exact path="/" element={<Home />}/>
            <Route  path="/product/:id" element={<Product />} />
            <Route path="/products/:category" element={<ProductList />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={!currentUser?<Login />:<Home/>} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/categories" element={<Categories />} />
            <Route path="/user" element={<Dashboard />} />
         
        </Routes>
   
   
  );
}

export default App;
