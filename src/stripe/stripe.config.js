import { loadStripe } from "@stripe/stripe-js";
import { getEnvVariables } from "../helpers/getEnvVariables";

const {VITE_STRIPE_KEY} = getEnvVariables()
const stripePromise = loadStripe(VITE_STRIPE_KEY);



export default stripePromise;