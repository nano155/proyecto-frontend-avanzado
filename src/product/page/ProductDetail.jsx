import { useNavigate, useParams } from "react-router-dom"
import { useProductStore } from "../../hooks/useProductStore"
import { useEffect, useState } from "react"
import { ProductDetailCard } from "../components/ProductDetailCard"
import { HashLoader } from "react-spinners"
import Swal from "sweetalert2"
import { useCartStore } from "../../hooks/useCartStore"

export const ProductDetail = () => {
    const { id } = useParams()
    const [chargeUser, setChargeUser] = useState(true)
    const navigate = useNavigate()
    const { selectProduct, selectedProduct, isLoading } = useProductStore()
    const {addProduct, errorMessageCart, successMessageCart}=useCartStore()

    const initialCharge = async (id) =>{
        await selectProduct(id)
        setTimeout(() => {
            setChargeUser(false)
        }, 500);
    }

    useEffect(() => {
        if (errorMessageCart !== undefined) {
          Swal.fire({
            title: 'Error',
            text: errorMessageCart,
            icon: 'error',
          })
        }
    
        if (successMessageCart !== undefined) {
          Swal.fire({
            title: 'Success!',
            text: successMessageCart,
            icon: 'success',
          }).then(() => {
            navigate('/products');
        });
    }     
      // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [errorMessageCart, successMessageCart]);


    useEffect(() => {
        if (id) {
          initialCharge(id)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id])

    const handleAddToCart = async (cid, pid, quantity) => {
        await addProduct(cid, pid, quantity);
    };

    return (
        <div className="flex justify-center items-center h-screen">
             <div className="flex justify-center items-center h-screen">
            {
                isLoading || chargeUser ?
                <div className="flex flex-col w-full items-center">
            <HashLoader
              color="#ef01ff"
              size={30}
            />
          </div>
          : <ProductDetailCard product={selectedProduct} addProduct={handleAddToCart} /> 
            }
        </div>
        </div>
    )
}
