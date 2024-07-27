import { Navigate, Route, Routes } from "react-router-dom"
import { AuthRoutes } from "../auth/routes/AuthRoutes"
import { HomePage } from "../home/page/HomePage"
import { useEffect } from "react"
import { useAuthStore } from "../hooks/useAuthStore"
import { ProductRoutes } from "../product/routes/ProductRoutes"
import { useProductStore } from "../hooks/useProductStore"



export const AppRouter = () => {
    const { status, checkToken, user, getUsers } = useAuthStore()
    const { startLoadingProducts } = useProductStore()


    useEffect(() => {
        if (status === 'authenticated' && user.role) {
            if (user.role === 'admin') {
                getUsers()
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user, status])

    useEffect(() => {
        if(status === 'authenticated' && user.role){
            startLoadingProducts()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user])


    useEffect(() => {
        checkToken();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <>
            <Routes>
                <Route path="/" element={<HomePage />} />
                {
                    (status === 'authenticated')
                        ?
                        <>
                            <Route path="/product/*" element={<ProductRoutes />} />
                            <Route path="*" element={<Navigate to="/product/all" />} />
                        </>
                        :
                        <>
                            <Route path="/auth/*" element={<AuthRoutes />} />
                            <Route path="/*" element={<Navigate to={'/auth/login'} />} />
                        </>
                }
            </Routes>
        </>
    )

}
