import tecnoShopApi from "../api/tecno-shop.api";


export const usePaymentStore = () =>{
    
    const createPaymentIntent = async (id) =>{
        try {
            const data = await tecnoShopApi.post(`payments/payment-intents/${id}`)

            console.log(data);
        } catch (error) {
            console.log(error);
        }
    }

    return {
        createPaymentIntent
    }
}