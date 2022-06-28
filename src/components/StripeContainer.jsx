import { Elements } from "@stripe/react-stripe-js"
import { loadStripe } from "@stripe/stripe-js"
import React from "react"
import PaymentForm from "./PaymentForm"

const PUBLIC_KEY = "pk_test_51LFQwGDRpT6DL4GWBVVSmt02xIC57V9UkjqgFvH0Q6swVm4kIQJA5OLA6CwegQ6Ocm16B9RQvTAxFcnTR4I1N8BB00O82ExtST"

const stripeTestPromise = loadStripe(PUBLIC_KEY)

export default function StripeContainer() {
	return (
		<Elements stripe={stripeTestPromise} >
			<PaymentForm />
		</Elements>
	)
}