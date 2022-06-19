import React from "react";
import styled from "styled-components";
import { mobile } from "../responsive";
const Container = styled.div`
  display: flex;
  min-height: 100vh;
  margin-top:105px ;
  ${mobile({  display: "flex", flexDirection: "column" })}
  width:100%;
 ${mobile({width:'100vw'})}
`;
const Left = styled.div`
  flex: 1;
  background-image: url("https://source.unsplash.com/XedxN-f1CmE/640x800");
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  -webkit-backdrop-filter: blur(2px);
  backdrop-filter: blur(2px);
  ${mobile({  display: 'none'})}
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
  ${mobile({  width:'90%'})}
  height:65vh;
  padding-left: 10px;
  max-height: 660px;
`;
const FormItem = styled.div`
  width: 90%;
  display: flex;
  flex-direction: column;
 
`;
const Label = styled.label`

`;
const Input = styled.input`

`;
const Button = styled.button`
width:30%;
height: 50px;
padding: 10px;
color:white;
cursor: pointer;
background-color:black;
margin-top:10px;
font-size: 18px;
border:none;
`;
const Textarea = styled.textarea`
  max-width: 100%;
  min-width: 100%;
  min-height: 96px;
`;
function Contact() {
  return (
    <Container>
      <Left />
      <Right>
        <Form id="survey-form">
          <Title>Get in touch</Title>
          <FormItem>
            <Label id="name-label" for="name">
              Name:
            </Label>
            <Input
              id="first-name"
              type="text"
              placeholder="Your name"
              required
            />
          </FormItem>

          <FormItem>
            <Label id="name-label" for="name">
              Last name:
            </Label>
            <Input
              id="last-name"
              type="text"
              placeholder="Your last name"
              required
            />
          </FormItem>
          <FormItem>
            <Label id="email-label" for="email">
              Email:
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="Your email"
              pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
              required
            />
          </FormItem>
          <FormItem>
            <Label id="message-label" for="message">
              Message:
            </Label>
            <Textarea placeholder="Enter your message" id="message"></Textarea>
          </FormItem>
          <Button type="submit" id="submit">
            submit
          </Button>
        </Form>
      </Right>
    </Container>
  );
}

export default Contact;
