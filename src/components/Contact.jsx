import React from "react";
import styled from "styled-components";
import { mobile } from "../responsive";
import { useReducer, useState } from "react";
import { postContact } from "../apiCalls";
import Images from "../images";

const Container = styled.div`
  display: flex;
  min-height: 100vh;
  margin-top: 105px;
  ${mobile({ display: "flex", flexDirection: "column" })}
  width:100%;
  ${mobile({ width: "100vw" })}
`;
const Img = styled.img`
position: absolute;
  height: 100%;
  width: 100%;
  left:0;
  top:0;
  object-fit: cover;
`
const Left = styled.div`
  flex: 1;
  position: relative;
 
  ${mobile({ display: "none" })}
`;
const Right = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Title = styled.h4`
  font-size: 32px;
`;
const Form = styled.form`
  width: 70%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  ${mobile({ width: "90%" })}
  height:65vh;
  padding-left: 10px;
  max-height: 660px;
`;
const FormItem = styled.div`
  width: 90%;
  display: flex;
  flex-direction: column;
`;
const Label = styled.label``;
const Input = styled.input``;
const Button = styled.button`
  width: 30%;
  height: 50px;
  padding: 10px;
  color: white;
  cursor: pointer;
  background-color: black;
  margin-top: 10px;
  font-size: 18px;
  border: none;
`;
const Textarea = styled.textarea`
  max-width: 100%;
  min-width: 100%;
  min-height: 96px;
`;
const Success = styled.div`
  color: green;
`;
const Error = styled.div`
  color: red;
`;
const initialState = {
  name: "",
  lastName: "",
  email: "",
  message: "",
};
const reducer = (state, action) => {
  switch (action.type) {
    case "name":
      return { ...state, name: action.payload };

    case "last name":
      return { ...state, lastName: action.payload };

    case "email":
      return { ...state, email: action.payload };

    case "message":
      return { ...state, message: action.payload };
     default:
      return state 
  }
};
function Contact() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsFetching(true);
      const contactInfo = {
        name: `${state.name} ${state.lastName}`,
        email: state.email,
        message: state.message,
      };
   
      const res = await postContact(contactInfo);
     
      if (res.request.status === 200) {
        setIsFetching(false);
        setSuccess(true);
        return setError(false);
      }
      setError(true);
      setIsFetching(false);
      setSuccess(false);
    } catch {
      setError(true);
      setIsFetching(false);
      setSuccess(false);
    }
  };

  return (
    <Container>
      <Left>
        <Img src={Images.contact}></Img>
      </Left>
      <Right>
        <Form id="survey-form">
          <Title>Get in touch</Title>
          <FormItem>
            <Label id="name-label" htmlFor="name">
              Name:
            </Label>
            <Input
              id="first-name"
              type="text"
              placeholder="Your name"
              required
              onChange={(e) => {
                dispatch({ type: "name", payload: e.target.value });
              }}
            />
          </FormItem>

          <FormItem>
            <Label id="name-label" htmlFor="name">
              Last name:
            </Label>
            <Input
              id="last-name"
              type="text"
              placeholder="Your last name"
              required
              onChange={(e) => {
                dispatch({ type: "last name", payload: e.target.value });
              }}
            />
          </FormItem>
          <FormItem>
            <Label id="email-label" htmlFor="email">
              Email:
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="Your email"
              pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
              required
              onChange={(e) => {
                dispatch({ type: "email", payload: e.target.value });
              }}
            />
          </FormItem>
          <FormItem>
            <Label id="message-label" htmlFor="message">
              Message:
            </Label>
            <Textarea
              placeholder="Enter your message"
              id="message"
              onChange={(e) => {
                dispatch({ type: "message", payload: e.target.value });
              }}
            ></Textarea>
          </FormItem>
          {success && (
            <Success>thanks, we will respond as soon as possible.</Success>
          )}
          {error && <Error>oops! something went wrong.</Error>}
          <Button type="submit" id="submit" onClick={handleSubmit} disabled={isFetching}>
            submit
          </Button>
        </Form>
        `;
      </Right>
    </Container>
  );
}

export default Contact;
