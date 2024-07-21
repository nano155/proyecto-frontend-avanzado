import { Link, useNavigate} from "react-router-dom"
import { useAuthStore } from "../../hooks/useAuthStore"


export const Navbar = () => {
    const {status, user, startLogout} = useAuthStore()
    const navigate = useNavigate()

    const handleLogout = () =>{
        startLogout()
        navigate('auth/login')
    }
  return (
    <>
    <div className="w-full items-center flex bg-gradient-to-tr p-4 from-purple-heart-300 via-purple-heart-400 to-purple-heart-500 justify-between text-purple-heart-50">
        <div className="flex">
        <h3 className="font-bold">
            Tecno-Shop
        </h3>
        {
            (user?.role === 'admin' || user?.role === 'premium') && <p className="ml-5 font-semibold"><Link to='/product/create' >Listado Productos</Link></p> 
            
        }
        </div>
        <div className="flex items-center">
                <div className="mr-3 font-semibold">
                    {
                    status === 'authenticated'
                    ?
                    user?.validateEmail
                    ?
                    <Link to="/products" className="cursor-pointer">Entrar</Link>
                    :
                    <p>Valida tu correo</p>
                    :
                    <p>Ingresa en login.</p>
                    }
                </div>
            <button onClick={status === 'authenticated' ? handleLogout : null} className="bg-purple-heart-700 py-1 px-3 rounded-lg font-medium">{(status === 'authenticated')? 'Logout': <Link to={'/auth/login'}>login</Link>}</button>
        </div>

    </div>
    </>
  )
}