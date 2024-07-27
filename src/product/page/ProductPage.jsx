import { useEffect, useState } from "react"
import { useProductStore } from "../../hooks/useProductStore"
import { ProductCard } from "../components/ProductCard"
import { HashLoader } from "react-spinners"
import { useCartStore } from "../../hooks/useCartStore"
import Swal from "sweetalert2"


export const ProductPage = () => {
  const { products, isLoading } = useProductStore()
  const [chargePage, setChargePage] = useState(true)
  const {errorMessageCart, successMessage} = useCartStore()

  const chargeProducts = () => {
    if (products) {
      setTimeout(() => {
        setChargePage(false)
      }, 500);
    }
  }

  useEffect(() => {
    if (errorMessageCart !== undefined) {
      Swal.fire({
        title: 'Error',
        text: errorMessageCart,
        icon: 'error',
      })
    }

    if (successMessage !== undefined) {
      Swal.fire({
        title: 'Success!',
        text: successMessage,
        icon: 'success',
      })
    }
  }, [errorMessageCart, successMessage]);

  useEffect(() => {
    chargeProducts()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])



  return (
    <>
      {
        isLoading || chargePage ?
          <div className="flex flex-col w-full items-center justify-center h-screen">
            <HashLoader
              color="#ef01ff"
              size={30}
            />
          </div>
          :
          <div className="xl:grid lg:grid xl:grid-cols-3 lg:grid-cols-2 lg:px-0 flex flex-col my-10 mx-24 gap-8 items-center w-3/4 px-40 ">

            {
              products?.map(product => (
                <ProductCard key={product.id} product={product}/>
              ))
            }
          </div>
      }
    </>
  )
}
