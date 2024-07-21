import { Navigate, Route, Routes } from "react-router-dom";
import { ProductPage } from "../page/ProductPage";
import { ProductCreatePage } from "../page/ProductCreatePage";
import { useSelector } from "react-redux";
import { NavbarProducts } from "../components/NavbarProducts";


export const ProductRoutes = () => {
  const { user } = useSelector((state) => state.auth);

  
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
            <Route path="*" element={<Navigate to="/all" replace />} />
          </Routes>
      }
    </>
  );
};