import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";



export const CartCard = ({product, quantity, cid, onDelete}) => {


    const handleDelete = (cid, pid, quantity) =>{
        onDelete(cid, pid, quantity)
    }


    return (
        <div className="flex h-40 bg-purple-heart-800 rounded-md text-purple-heart-200">
            <div className="h-40 w-40 flex items-center justify-center bg-white rounded-s-md">
            <img src={product.thumbnails[0]} alt={product.title} className="object-contain" />
            </div>
            <div className="flex flex-col px-5 w-full py-2 justify-evenly">
                <h2 className="text-xl">{product.title}</h2>
                <p className="text-sm">Price: ${product.price}</p>
                <p className="text-sm">Cantidad: {quantity}</p>
                <p className="text-sm">Product in stock: {product.stock}</p>
            </div>
            <div className="flex items-center">
            <div className="bg-purple-heart-200 w-0.5 h-32"></div>
            </div>
            <div className="w-52 px-5 py-2 items-center flex-col flex justify-center">
                <button onClick={()=>handleDelete(cid, product.id, quantity)}>
                <FontAwesomeIcon icon={faTrashCan} color="red" />
                </button>
                <p>SubTotal: ${product.price * quantity}</p>
            </div>
        </div>

    )
}