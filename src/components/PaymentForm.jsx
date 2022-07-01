import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useState,useEffect } from "react";
import styled from "styled-components";
import { getCardDb, postOrder } from "../apiCalls";
import { useSelector } from "react-redux";
import { userRequest } from "../requestMethods";
import{useNavigate} from 'react-router-dom'

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Form = styled.form`
  height: 50vh;
  width: 50vw;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  align-items: stretch;
  max-width: 550px;
`;
const Address = styled.textarea`
  width: 100%;
  resize: vertical;
  margin: 10px 0;
`;
const CountryCode = styled.input`
  width: 100%;
  margin: 10px 0;
`;

const PhoneNumber = styled.input`
  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    display: none;
  }
  width: 100%;
  margin: 10px 0;
`;
const Label = styled.label`
  width: 100%;
  text-align: start;
  font-size: 9px;
`;
const Button = styled.button`
  width: 100%;
  border: none;
  color: white;
  background-color: black;
  padding: 5px;
  border-radius: 5px;
  margin: 10px 0;
  cursor: pointer;
`;
const FormGroup = styled.fieldset`
  width: 100%;
  padding: 10px;
`;
const FormRow = styled.div`
  width: 100%;
`;
const CARD_OPTIONS = {
  iconStyle: "solid",
  style: {
    base: {
      iconColor: "#c4f0ff",
      color: "#fff",
      fontWeight: 500,
      fontFamily: "Roboto, Open Sans, Segoe UI, sans-serif",
      fontSize: "16px",
      fontSmoothing: "antialiased",
      ":-webkit-autofill": { color: "#fce883" },
      "::placeholder": { color: "#87bbfd" },
    },
    invalid: {
      iconColor: "#ffc7ee",
      color: "#ffc7ee",
    },
  },
};

export default function PaymentForm() {
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate()
  const {user ,order}= useSelector((state) => state);
  const stripe = useStripe();
  const elements = useElements();


  useEffect(()=>{
    if(!order.orderToAdd){
      navigate('/payment/form')
    }

  },[])


  const handleSubmit = async (e) => {
    e.preventDefault();

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
    });

    if (!error) {
      try {
        const { id } = paymentMethod;
        const response = await userRequest.post("/payments", {
          amount: 1000,
          id,
        });

        if (response.data.success) {
          console.log("Successful payment");
          setSuccess(true);

         
        }
      } catch (error) {
        console.log("Error", error);
      }
    } else {
      console.log(error.message);
      setError(error);
    }
  };

  return (
    <Container>
      {!success ? (
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <FormRow>
              <CardElement options={CARD_OPTIONS} />
            </FormRow>
          </FormGroup>

          {error && (
            <div>
              <h2>{error.message}</h2>
            </div>
          )}
          <Button>Pay</Button>
        </Form>
      ) : (
        <div>
          <h2>you 've paid with success</h2>
        </div>
      )}
    </Container>
  );
}
