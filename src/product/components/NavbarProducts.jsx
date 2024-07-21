import { Link, useNavigate } from "react-router-dom"
import { useAuthStore } from "../../hooks/useAuthStore"


export const NavbarProducts = () => {
    const { user, startLogout } = useAuthStore()
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
                </div>
                <div className="flex items-center">
                    <p className="mr-4 font-bold">{user.name}</p>
                    <button onClick={handleLogout} className="bg-purple-heart-700 py-1 px-3 rounded-lg font-medium"><Link to={'/auth/login'}>logout</Link></button>
                </div>

            </div>
        </>
    )
}
