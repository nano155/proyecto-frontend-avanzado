import { useCartStore } from "../../hooks/useCartStore"
import { TicketCard } from "../components/TicketCard"

export const Ticketpage = () => {
    const {ticket} = useCartStore()

    
  return (
    <div className="w-full my-2 flex flex-col items-center gap-4">
        {
            ticket && ticket.length > 0 ?

            ticket.map(item =>(
                <TicketCard key={item.id} {...item}/>
            ))
            :
            <p> Tiquet is empty...</p>
        }
    </div>
  )
}