import React, { useState } from "react";
import styled from "styled-components";
import { Link as L, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { mobile } from "../responsive";
import { createLink } from "../apiCalls";
import Loading from "../components/Loading";
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
  margin: 5px 5px 0 0;
  font-size: 12px;
  text-decoration: underline;
  cursor: pointer;
`;
const Row = styled.div`
  display: flex;
  justify-content: start;
  align-items: center;
`;
const Error = styled.span`
  color: red;
`;
const Success = styled.div`
  color: green;
`;

function ForgotPassword() {
  const { currentUser } = useSelector((state) => state.user);
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [email, setEmail] = useState("");
  const submitEmail = async (e) => {
    e.preventDefault();
    try {
      setIsFetching(true);

      const res = await createLink(email);
      if (res.request.status === 200) {
        setError(false);
        setIsFetching(false);
        return setSuccess(true);
      }
    } catch (e) {
      console.log(e);
      setIsFetching(false);
      setError(true);
      setSuccess(false);
    }
  };

  return (
    <Loading>
      <Container>
        <Wrapper>
          <Title>FORGOT PASSWORD?</Title>
          <Form>
            <Input
              placeholder="email"
              type="password"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />

            <Button disabled={isFetching} onClick={submitEmail}>
              SUBMIT
            </Button>
            {error && <Error>something went wrong ....</Error>}
            {success && (
              <Success>
                we've sent a transaction email, check your email.{" "}
              </Success>
            )}
            <Row>
              <Link as={L} to="/login">
                LOGIN
              </Link>
              <Link as={L} to="/register">
                REGISTER
              </Link>
            </Row>
          </Form>
        </Wrapper>
      </Container>
    </Loading>
  );
}

export default ForgotPassword;
