import { useEffect } from "react"
import { useProductStore } from "../../hooks/useProductStore"


export const ProductPage = () => {

  const {startLoadingProducts} = useProductStore()
  
  useEffect(() => {
  startLoadingProducts()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  
  return (
    <div>ProductPage</div>
  )
}
