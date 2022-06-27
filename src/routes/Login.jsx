import styled from "styled-components";
import { mobile } from "../responsive";
import { useSelector, useDispatch } from "react-redux";
import { init } from "../redux/userSlice";
import { useState, useEffect } from "react";
import { Link as L, useNavigate } from "react-router-dom";
import { addList } from "../redux/wishlistSlice";
import {
  loginSucess,
  loginStart,
  loginFailure
 
} from "../redux/userSlice";
import { addProducts } from "../redux/cartSlice";
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
  }, []);
  useEffect(() => {
    if (currentUser) {
      navigate("/");
    }
  }, [currentUser]);

  const reduxLogin = async (email,password)=>{

    dispatch(loginStart());
    const res = await login( email, password);
    if(res){
      
      dispatch(loginSucess(res[0]));
      dispatch(addProducts(res[1].products));
      dispatch(addList(res[2].products));
      navigate("/");
      return
    }
    dispatch(loginFailure())
  }

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
            type='password'
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <Button
            onClick={() => reduxLogin(email,password)}
            disabled={isFetshing}
          >
            LOGIN
          </Button>
          {error ? <Error>something went wrong ....</Error> : null}
          <Link>DO NOT YOU REMEMBER THE PASSWORD?</Link>
          <Link as={L} to="/register">
            CREATE A NEW ACCOUNT
          </Link>
        </Form>
      </Wrapper>
    </Container>
  );
};

export default Login;
