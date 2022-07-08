import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useState, useEffect } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { userRequest } from "../requestMethods";
import { useNavigate, useLocation } from "react-router-dom";
import { addOrder } from "../redux/orderSlice";
import ReactLoading from "react-loading";
import { postOrder } from "../apiCalls";

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;
const Form = styled.form`
  width: 50vw;
  display: flex;
  justify-content: start;
  flex-direction: column;
  align-items: stretch;
  max-width: 550px;
`;

const Button = styled.button`
  width: 100%;
  border: none;

  padding: 5px;
  border-radius: 5px;
  margin: 10px 0;
  color: white;
  background-color: ${({ isFetching }) =>
    isFetching ? "rgb(53, 126, 221)" : "black"};
  cursor: ${({ isFetching }) => (isFetching ? "not-allowed" : "pointer")};
`;
const OuterButton = styled.button`
  width: 40vw;
  border: none;
  color: white;

  padding: 5px;
  border-radius: 5px;
  margin: 10px 0;
  background-color: ${({ isFetching }) =>
    isFetching ? "rgb(53, 126, 221)" : "black"};
  cursor: ${({ isFetching }) => (isFetching ? "not-allowed" : "pointer")};
`;
const FormGroup = styled.fieldset`
  width: 100%;
  padding: 10px;
  margin: 20px 0;
`;
const FormRow = styled.div`
  width: 100%;
`;
const Message = styled.div`
  text-align: center;
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
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { order } = useSelector((state) => state);
  const stripe = useStripe();
  const elements = useElements();
  const location = useLocation();
  const [isFetching, setIsFeching] = useState(false);

  useEffect(() => {
    if (!order.orderToAdd) {
      navigate("/payment/form");
    }
  }, []);
  useEffect(()=>{
    (async()=>{

      try{
        if(success&&success.success){
        const res = await postOrder(location.state.postParams.body,location.state.postParams.id)
      }
      }
      catch{
        navigate('/backup',{state:{
          body:location.state.postParams.body,
          id:location.state.postParams.id
        }})
      }
    })(success,navigate,location)
  },[success])

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsFeching(true);
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
    });

    if (!error) {
      try {
        const { id } = paymentMethod;
        const response = await userRequest.post("/payments", {
          amountArray: location.state.amountArray,
          id,
        });

        if (response.data.success) {
          console.log("Successful payment");
         
         
            setSuccess(response.data);           
            dispatch(addOrder());
            setError(null);
            setIsFeching(false);
          
        }
      } catch (error) {
        console.log("Error", error);
        console.log(location.state)
        setIsFeching(false);
      }
    } else {
      console.log(error.message);
      setError(error);
      setIsFeching(false);
    }
  };

  return (
    <Container>
      {isFetching && <ReactLoading type={"spin"} color="rgb(53, 126, 221)" />}
      {success && (
        <FormGroup style={{ border: "none" }}>
          <FormRow style={{ color: "green" }}>
            <Message>{success.message}</Message>
          </FormRow>
        </FormGroup>
      )}
      {!success && (
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <FormRow>
              <CardElement options={CARD_OPTIONS} />
            </FormRow>
          </FormGroup>

          {error && (
            <FormGroup>
              <FormRow>
                <Message style={{ color: "red" }}>
                  <h2>{error.message}</h2>
                </Message>
              </FormRow>
            </FormGroup>
          )}

          <Button disabled={isFetching} isFetching={isFetching}>
            Pay
          </Button>
        </Form>
      )}
      <OuterButton
        onClick={() => {
          navigate("/");
        }}
        disabled={isFetching}
        isFetching={isFetching}
      >
        continue shopping
      </OuterButton>
    </Container>
  );
}
