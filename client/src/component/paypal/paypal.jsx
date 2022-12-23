import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js"
export default function Paypal() {

    return (
        <div>
            <PayPalScriptProvider options={{ "client-id": "AYrox442NewfZqiXcX7yZb--shdkU4da4N22dksjWiLPSEbkGf36HtwMLSc3BHifxVPssu9lrn2dnm7g" }}>
                <PayPalButtons
                    createOrder={(data, actions) => {
                        return actions.order.create({
                            purchase_units: [
                                {
                                    amount: {
                                        value: "1.99",
                                    },
                                },
                            ],
                        });
                    }}
                    onApprove={(data, actions) => {
                        return actions.order.capture().then((details) => {
                            const name = details.payer.name.given_name;
                            alert(`Transaction completed by ${name}`);
                        });
                    }}
                />
            </PayPalScriptProvider>
        </div>
    )
}