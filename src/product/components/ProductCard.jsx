import { Link } from "react-router-dom"
import { useCartStore } from "../../hooks/useCartStore"

export const ProductCard = ({product}) => {
  const {addProduct} = useCartStore()
  const { cart } = useCartStore()

  const handleAdd = async (cid, pid) =>{
    await addProduct(cid, pid)
  }

  return (
    <div className="flex flex-col bg-white shadow-lg rounded-lg overflow-hidden min-w-80 w-full">
    {/* Contenedor de Imagen */}
    <div className="w-full h-40 bg-gray-200">
      <img
        src={product.thumbnails[0]}
        alt={product.title}
        className="w-full h-full object-contain"
      />
    </div>

    {/* Contenedor de Información */}
    <div className="p-4 flex flex-col flex-grow">
      <h3 className="text-lg font-semibold mb-2 self-center">{product.title}</h3>
      <div className="flex justify-between items-center">  
      <div>
      <p className="text-gray-700 mb-1">Price: ${product.price}</p>
      <p className="text-gray-700 mb-4">Stock: {product.stock}</p>
      </div>
        <Link to={`/product/detail/${product.id}`}>
      <button className=" border border-purple-heart-600 px-4 rounded h-8">
        View Details
      </button>
        </Link> 
      </div>
      <button onClick={()=>handleAdd(cart.id, product.id)} className="bg-purple-heart-600 text-white py-2 px-4 rounded hover:bg-purple-800 transition-colors mt-4">
        Add to cart
      </button>
    </div>
  </div>
  )
}