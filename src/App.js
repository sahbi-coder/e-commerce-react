import Product from "./routes/Product";
import Home from "./routes/Home";
import Products from "./routes/Products";
import Cart from "./routes/Cart";
import Whishlist from "./routes/Whishlist";
import CartAndWhisshlist from "./routes/CartAndWhisshlist";
import Login from "./routes/Login";
import Register from "./routes/Register";
import About from "./routes/About";
import Contact from "./routes/Contact";
import Categories from "./routes/Categories";
import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Dashboard from "./routes/Dashboard";
import Payment from "./routes/Payment";
import OrderForm from "./components/OrderForm";
import StripeContainer from "./components/StripeContainer";
import ForgotPassword from "./routes/ForgotPassword";
import ConfirmPassword from "./routes/ConfirmPassword";

import "./App.css";
function App() {
  const currentUser = useSelector((store) => store.user.currentUser);

  return (
    <Routes>
      <Route exact path="/" element={<Home />} />
      <Route path="/product/:id" element={<Product />} />
      <Route path="/products/:category" element={<Products />} />

      <Route path="/" element={<CartAndWhisshlist />}>
        <Route path="cart" element={<Cart />} />
        <Route path="whishlist" element={<Whishlist />} />
      </Route>
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />

      <Route path="/payment" element={<Payment />}>
        <Route
          path="stripe"
          element={currentUser ? <StripeContainer /> : <Navigate to="/login" />}
        />
        <Route
          path="form"
          element={currentUser ? <OrderForm /> : <Navigate to="/login" />}
        />
      </Route>
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/categories" element={<Categories />} />
      <Route path="/user" element={<Dashboard />} />
      <Route path="/forgot-password/" element={<ForgotPassword />} />
      <Route path="/forgot-password/:id/:token" element={<ConfirmPassword />} />
    </Routes>
  );
}

export default App;
