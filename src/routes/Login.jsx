import styled from "styled-components";
import { mobile } from "../responsive";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { Link as L, useNavigate } from "react-router-dom";
import { addProducts } from "../redux/cartSlice";
import { addList } from "../redux/wishlistSlice";
import { setOrders } from "../redux/orderSlice";
import {
  getCardDbAfterLogin,
  getWishlistAfterLogin,
  getOrdersAfterLogin,
} from "../apiCalls";
import { clearCart } from "../redux/cartSlice";
import { deleteAll } from "../redux/wishlistSlice";
import { clearOrders } from "../redux/orderSlice";
import { logOut, loginFailure } from "../redux/userSlice";
import { loginSucess, loginStart, init } from "../redux/userSlice";
import { login } from "../apiCalls";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
    url("https://images.pexels.com/photos/6984650/pexels-photo-6984650.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940")
      center;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 25%;
  padding: 20px;
  background-color: white;
  ${mobile({ width: "75%" })}
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 10px 0;
  padding: 10px;
`;

const Button = styled.button`
  width: 40%;
  border: none;
  padding: 15px 20px;
  background-color: teal;
  color: white;
  cursor: pointer;
  margin-bottom: 10px;
  &:disabled {
    cursor: not-allowed;
  }
`;

const Link = styled.div`
  margin: 5px 0px;
  font-size: 12px;
  text-decoration: underline;
  cursor: pointer;
`;
const Error = styled.span`
  color: red;
`;

const Login = () => {
  const { isFetshing, error, currentUser } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(init());
    if (currentUser) {
      navigate("/");
    }
  }, []);

  const reduxLogin = async (e, email, password) => {
    e.preventDefault();
    dispatch(loginStart());
    try {
      const res = await login(email, password);

      if (res.request.status === 200) {
        dispatch(loginSucess(res.data));
        const id = res.data._id
        const token = res.data.token

        const res1 = await getCardDbAfterLogin(id,token);
        const res2 = await getWishlistAfterLogin(id,token);
        const res3 = await getOrdersAfterLogin(id,token);

        dispatch(addProducts(res1.data.products));
        dispatch(addList(res2.data.products));
        dispatch(setOrders(res3.data[0].orders));
        navigate("/");
      }
      dispatch(loginFailure());
    } catch {
      dispatch(loginFailure());
      dispatch(logOut());
      dispatch(clearCart());
      dispatch(deleteAll());
      dispatch(clearOrders());
      dispatch(loginFailure());
    }
  };

  return (
    <Container>
      <Wrapper>
        <Title>SIGN IN</Title>
        <Form>
          <Input
            placeholder="email"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <Input
            placeholder="password"
            type="password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <Button
            onClick={(e) => reduxLogin(e, email, password)}
            disabled={isFetshing}
          >
            LOGIN
          </Button>
          {error ? <Error>something went wrong ....</Error> : null}
          <Link as={L}to='/forgot-password'>DO NOT YOU REMEMBER THE PASSWORD?</Link>
          <Link as={L} to="/register">
            CREATE A NEW ACCOUNT
          </Link>
        </Form>
      </Wrapper>
    </Container>
  );
};

export default Login;
