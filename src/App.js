import Product from "./routes/Product";
import Home from "./routes/Home";
import ProductList from "./routes/ProductList";
import Cart from "./routes/Cart";
import Login from "./routes/Login";
import Register from "./routes/Register";


import { useEffect} from "react";
import {  Routes, Route,useLocation,useNavigate } from "react-router-dom";
import {useSelector} from 'react-redux'
function App() {
  
  const currentUser = useSelector(store=>store.user.currentUser)
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    if(currentUser&&location.pathname==='/login'){
      navigate('/')
    }
  
   
  }, [currentUser])
 
  


  return (
  
     
        <Routes>
          <Route exact path="/" element={<Home />}/>
            <Route  path="/product/:id" element={<Product />} />
            <Route path="/products/:category" element={<ProductList />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={!currentUser?<Login />:<Home/>} />
         
        </Routes>
   
   
  );
}

export default App;
