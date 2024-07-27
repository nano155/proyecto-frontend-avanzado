import { usePaymentStore } from "../../hooks/usePaymentStore"

export const TicketCard = ({purchaser, purchase_datetime, code, amount, id}) => {
    const {createPaymentIntent} = usePaymentStore()

    const handlePayment = (id) =>{
        createPaymentIntent(id)
    }
  return (
    <>
    <div className="ticket flex flex-col text-purple-heart-800 px-10 py-2 gap-2 justify-between rounded-2xl ">
    <h2 className="font-semibold text-xl">Comprador: {purchaser}</h2>
    <p className="font-normal">Fecha de la compra: {purchase_datetime}</p>
    <p className="font-normal">Codigo de la compra: {code}</p>
    <p className="font-normal">Total de la compra: ${amount}</p>
    <button onClick={()=>handlePayment(id)}>Create payment intent</button>
    </div>
    </>
  )
}