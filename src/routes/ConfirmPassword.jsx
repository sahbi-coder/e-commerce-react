import { mobile } from "../responsive";
import { publicRequest } from "../requestMethods";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";

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
const Error = styled.span`
  color: red;
`;
const Row = styled.div`
  display: flex;
  justify-content: start;
  align-items: center;
`;
const Success = styled.div`
  color: green;
`;

function ConfirmPassword() {
  const [isFetching, setIsFetching] = useState();
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [password, setPassword] = useState("");
  const [confPassword, setConfPassword] = useState("");
  const { id, token } = useParams();

  const reg = /.{5,}/;

  const submitEmail = async (e) => {
    e.preventDefault();

    if (reg.test(password) && password === confPassword) {
      try {
        const res = await publicRequest.post(
          `/auth/forgot-password/${id}/${token}`,
          { id, token, password }
        );
        if (res.request.status === 200) {
          setSuccess(true);
          setError(false);
          return false;
        }
        setSuccess(false);
        setError(true);
      } catch {
        setSuccess(false);
        setError(true);
        return;
      }
    }
  };

  return (
    <Container>
      <Wrapper>
        <Title>RESET PASSWORD</Title>
        <Form>
          <Input
            placeholder="write password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            type="password"
          />
          <Input
            placeholder="confirm password"
            onChange={(e) => {
              setConfPassword(e.target.value);
            }}
            type="password"
          />

          <Button disabled={isFetching} onClick={submitEmail}>
            SUBMIT
          </Button>
          {error ? <Error>something went wrong ....</Error> : null}
          {success && (
            <Success>we've sent a transaction email, check your email. </Success>
          )}
        </Form>
      </Wrapper>
    </Container>
  );
}

export default ConfirmPassword;
