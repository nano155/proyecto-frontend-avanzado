import { Navigate, Route, Routes } from "react-router-dom";
import { ProductPage } from "../page/ProductPage";
import { ProductCreatePage } from "../page/ProductCreatePage";
import { NavbarProducts } from "../components/NavbarProducts";
import { ProductDetail } from "../page/ProductDetail";
import { useAuthStore } from "../../hooks/useAuthStore";
import { CartPage } from "../page";
import { Ticketpage } from "../page/Ticketpage";


export const ProductRoutes = () => {
  const { user } = useAuthStore();

  
  const isEmailValidated = user && user.validateEmail;

  return (
    <>
    <NavbarProducts/>
      {
        !isEmailValidated && isEmailValidated !== undefined ?
          <Routes>
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
          :
          <Routes>
            <Route path="/create" element={<ProductCreatePage />} />
            <Route path="/all" element={<ProductPage />} />
            <Route path="/detail/:id" element={<ProductDetail />} />
            <Route path="/tickets" element={<Ticketpage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="*" element={<Navigate to="/all" replace />} />
          </Routes>
      }
    </>
  );
};