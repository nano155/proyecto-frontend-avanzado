import { Link, useNavigate } from "react-router-dom"
import { useAuthStore } from "../../hooks/useAuthStore"
import { useCartStore } from "../../hooks/useCartStore"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons"


export const NavbarProducts = () => {
    const { user, startLogout } = useAuthStore()
    const { cart } = useCartStore()
    const navigate = useNavigate()

    const handleLogout = () => {
        startLogout()
        navigate('auth/login')
    }
    return (
        <>
            <div className="w-full items-center flex bg-gradient-to-tr p-4 from-purple-heart-300 via-purple-heart-400 to-purple-heart-500 justify-between text-purple-heart-50">
                <div className="flex">
                    <Link to={'/'}>
                        <h3 className="font-bold">
                            Tecno-Shop
                        </h3>
                    </Link>
                    <Link to={'/products'} className="ml-6">
                        <h3 className="font-bold">
                            Productos
                        </h3>
                    </Link>
                    <Link to={'/product/tickets'} className="ml-6">
                        <h3 className="font-bold">
                            Tickets
                        </h3>
                    </Link>
                </div>
                <div className="flex items-center">
                    <p className="mr-6 font-bold">{user.name}</p>
                        <Link to={'/product/cart'}>
                    <div className="relative">
                        <button className="cart mr-6 font-bold focus:outline-none">
                        <FontAwesomeIcon icon={faShoppingCart} size="2x" />
                        </button>
                        {
                            cart && cart.products?.length > 0
                            ?
                            <div className="absolute flex justify-center items-center bottom-5 right-3 bg-red-500 rounded-full p-3 w-5 h-5">{cart.products.length}</div>
                            : null
                        }
                    </div>
                        </Link>
                    <button onClick={handleLogout} className="bg-purple-heart-700 py-1 px-3 rounded-lg font-medium"><Link to={'/auth/login'}>logout</Link></button>
                </div>

            </div>
        </>
    )
}
