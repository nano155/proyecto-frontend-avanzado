import { useEffect, useState } from "react"
import { useCartStore } from "../../hooks/useCartStore"
import { CartCard } from "../components/CartCard"
import Swal from "sweetalert2"
import { useNavigate } from "react-router-dom"

export const CartPage = () => {
    const { cart, startDeletedProductToCart, startCreateTicket, errorMessageCart, successMessageCart } = useCartStore()
    const navigate = useNavigate()
    const [products, setProducts] = useState([])
    const [totalPrice, setTotalPrice] = useState(0)

    const sumTotal = () => {
        let total = 0
        const subTotal = products.map(product => (
            product.quantity * product.product.price
        ))
        for (let i = 0; i < subTotal.length; i++) {
            const element = subTotal[i];
            total = ((total + element))
        }
        setTotalPrice(total)
    }

    useEffect(() => {
        if (cart) {
            setProducts(cart.products)
        } else {
            setTotalPrice(0)
        }
    }, [cart])

    useEffect(() => {
        if (products) {
            if (products.length > 0) {
                sumTotal()
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [products])

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
    const deletedProductToCart = (cid, pid, quantity) => {
        startDeletedProductToCart(cid, pid, quantity)
    }

    const createTicket = () => {
        startCreateTicket(cart.id)
    }
    return (
        <div className="flex flex-col mx-32 my-8 gap-4 bg-purple-heart-900 bg-opacity-80 p-10 rounded-lg">
            <h2 className="text-4xl font-bold text-purple-heart-200 mb-2">Shopping Cart</h2>
            {
                cart && products?.length > 0
                    ?
                    <>
                        {products?.map((productCart) => {
                            const { product, quantity } = productCart
                            return <CartCard key={product.id} product={product} quantity={quantity} cid={cart.id} onDelete={deletedProductToCart} />
                        })
                        }
                        <div className="flex justify-between items-center mt-4">
                            <h3 className="text-2xl font-bold text-purple-heart-200 mb-2">Total to buy: ${totalPrice}</h3>
                            <button className="rounded-md bg-green-400 px-3 py-2 text-green-800" onClick={createTicket}>
                                Proceed buy
                            </button>
                        </div>
                    </>
                    : <p className="text-purple-heart-200"> Cart is empty...</p>
            }
        </div>
    )
}