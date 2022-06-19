import styled from "styled-components";
import { mobile } from "../responsive";
import { useReducer, useEffect } from "react";
import { publicRequest, userRequest } from "../requestMethods";
import { useSelector, useDispatch } from "react-redux";
import {
  loginFailure,
  init,
  loginSucess,
  signUpFailure,
  signUpStart,
  signUpSucess,
} from "../redux/userSlice";
import { useNavigate } from "react-router-dom";
const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
    url("https://images.pexels.com/photos/6984661/pexels-photo-6984661.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940")
      center;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 40%;
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
  flex-wrap: wrap;
`;

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 20px 10px 0px 0px;
  padding: 10px;
`;

const Agreement = styled.span`
  font-size: 12px;
  margin: 20px 0px;
`;

const Button = styled.button`
  width: 40%;
  border: none;
  padding: 15px 20px;
  background-color: teal;
  color: white;
  cursor: pointer;
`;

const Register = () => {
  const initialState = {
    name: "",
    lastName: "",
    email: "",
    password: "",
    confPassword: "",
  };
  const ACTIONS = {
    UPDATE_NAME: "update name",
    UPDATE_EMAIL: "update email",
    UPDATE_LASTNAME: "update lastname",
    UPDATE_PASSWORD: "update password",
    UPDATE_CONF_PASSWORD: "update conf password",
  };
  const reducer = (state, { type, payload }) => {
    switch (type) {
      case ACTIONS.UPDATE_NAME:
        return {
          ...state,
          name: payload,
        };
      case ACTIONS.UPDATE_LASTNAME:
        return {
          ...state,
          lastName: payload,
        };
      case ACTIONS.UPDATE_EMAIL:
        return {
          ...state,
          email: payload,
        };

      case ACTIONS.UPDATE_PASSWORD:
        return {
          ...state,
          password: payload,
        };
      case ACTIONS.UPDATE_CONF_PASSWORD:
        return {
          ...state,
          confPassword: payload,
        };
      default:
        return state;
    }
  };
  const [state, dispatsh] = useReducer(reducer, initialState);
  const reduxDiapatsh = useDispatch();
  const navigate = useNavigate();
  const { isFetshing, error, currentUser } = useSelector((state) => state.user);
  useEffect(() => {
    reduxDiapatsh(init());
  }, []);
  useEffect(() => {
    if (currentUser) {
      navigate("/");
    }
  }, [currentUser]);

  const createAcount = async (e) => {
    e.preventDefault();

    Object.values(state).forEach((input) => {
      return !input && alert("you must fill all inputs");
    });
    if (state.password !== state.confPassword) {
      return alert("passwords do not confirm");
    }
    try {
      reduxDiapatsh(signUpStart());
      await publicRequest.post("/auth/register", {
        name: `${state.name} ${state.lastName}`,
        email: state.email,
        password: state.password,
      });

      reduxDiapatsh(signUpSucess());
    } catch (e) {
      reduxDiapatsh(signUpFailure());
      return alert("could not register please try again");
    }
    try {
      let res = await publicRequest.post("/auth/login", {
        password: state.password,
        email: state.email,
      });
      const user = res.data;
      await userRequest.post("/carts", {
        userId: user._id,
        products: [],
      });
      await userRequest.post("/wishlists", {
        userId: user._id,
        products: [],
      });
      reduxDiapatsh(loginSucess({ user }));
      navigate("/user");
    } catch {
      reduxDiapatsh(loginFailure());
      navigate("/login");
    }
  };
  return (
    <Container>
      <Wrapper>
        <Title>CREATE AN ACCOUNT</Title>
        <Form>
          <Input
            placeholder="name"
            onChange={(e) => {
              dispatsh({ type: ACTIONS.UPDATE_NAME, payload: e.target.value });
            }}
          />
          <Input
            placeholder="last name"
            onChange={(e) => {
              dispatsh({
                type: ACTIONS.UPDATE_LASTNAME,
                payload: e.target.value,
              });
            }}
          />

          <Input
            placeholder="email"
            onChange={(e) => {
              dispatsh({ type: ACTIONS.UPDATE_EMAIL, payload: e.target.value });
            }}
          />
          <Input
            placeholder="password"
            onChange={(e) => {
              dispatsh({
                type: ACTIONS.UPDATE_PASSWORD,
                payload: e.target.value,
              });
            }}
          />
          <Input
            placeholder="confirm password"
            onChange={(e) => {
              dispatsh({
                type: ACTIONS.UPDATE_CONF_PASSWORD,
                payload: e.target.value,
              });
            }}
          />
          <Agreement>
            By creating an account, I consent to the processing of my personal
            data in accordance with the <b>PRIVACY POLICY</b>
          </Agreement>
          <Button onClick={createAcount}>CREATE</Button>
        </Form>
      </Wrapper>
    </Container>
  );
};

export default Register;
