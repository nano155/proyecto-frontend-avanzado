import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { CreateProduct } from "../components/CreateProduct";
import { Button } from "../components/Button";
import { useAuthStore } from "../../hooks/useAuthStore";
import { ProductAll } from "../components/ProductAll";
import { UsersAll } from "../components/UsersAll";
import { useProductStore } from "../../hooks/useProductStore";
import Swal from "sweetalert2";
import { UpdateProduct } from "../components/UpdateProduct";
import { HashLoader } from "react-spinners";

export const ProductCreatePage = () => {
  const [validRole, setValidRole] = useState(null); // Cambiado a null para indicar que está en estado de carga
  const [createP, setCreateP] = useState(false);
  const [viewProducts, setViewProducts] = useState(false);
  const [viewUserList, setViewUserList] = useState(false);
  const [viewUpdate, setViewUpdate] = useState(false);
  const { user, status, users } = useAuthStore();
  const { products, errorProductMessage, successMessage, selectProduct, clearMessage, isLoading } = useProductStore();

  useEffect(() => {
    if (status === 'authenticated' && user && user.role) {
      if (user.role === 'admin' || user.role === 'premium') {
        setValidRole(true);
      } else {
        setValidRole(false);
      }
    } else if (status === 'not-authenticated') {
      setValidRole(false);
    }
  }, [user, status]);

  const filteredProducts =
    user?.role === "admin"
      ? products
      : products?.filter((product) => product.owner === user.uid);

  const openViewCreateProduct = () => {
    setCreateP(!createP);
    setViewProducts(false);
    setViewUserList(false);
    setViewUpdate(false);
  };

  const openViewProducts = () => {
    setViewProducts(!viewProducts);
    setCreateP(false);
    setViewUserList(false);
    setViewUpdate(false);
  };

  const openViewUser = () => {
    setViewUserList(!viewUserList);
    setViewProducts(false);
    setCreateP(false);
    setViewUpdate(false);
  };

  const openViewUpdateProduct = async (id) => {
    await selectProduct(id);
    setViewUpdate(!viewUpdate);
    setViewUserList(false);
    setViewProducts(false);
    setCreateP(false);
  };

  useEffect(() => {
    if (errorProductMessage !== undefined) {
      Swal.fire({
        title: 'Error',
        text: errorProductMessage,
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
  }, [errorProductMessage, successMessage, clearMessage]);

  if (validRole === null) {
    return <div className="flex flex-col w-full items-center h-screen justify-center">
      <HashLoader
        color="#ef01ff"
        size={30}
      />
    </div>; // Mostrar indicador de carga mientras se verifica el usuario
  }

  if (validRole === false) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="flex flex-col gap-6 py-4 gradie">
      <Button action={openViewCreateProduct} name={'Crear nuevo Producto'} />
      {createP ?
        isLoading ?
          <div className="flex flex-col w-full items-center">
            <HashLoader
              color="#ef01ff"
              size={30}
            />
          </div>
          :
          <CreateProduct setCreateP={setCreateP} /> : null}
      <Button action={openViewProducts} name={'Ver lista de Productos'} />
      {viewProducts &&
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 my-2 mx-5">
          {filteredProducts?.map(product => (
            <ProductAll key={product.id} {...product} handleEdit={openViewUpdateProduct} />
          ))}
        </div>
      }
      {
        viewUpdate ? (
          isLoading ? (
            <div className="flex flex-col w-full items-center">
              <HashLoader color="#ef01ff" size={30} />
            </div>
          ) : (
            <UpdateProduct setViewUpdate={() => setViewUpdate(false)} />
          )
        ) : null
      }
      {user?.role === 'admin' && <Button action={openViewUser} name={'Ver lista de Usuarios'} />}
      {viewUserList && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 my-2 mx-5">
          {users.map(user => (
            <UsersAll key={user.id} {...user} />
          ))}
        </div>
      )}
      <div className="spinner" role="status">
        <svg aria-hidden="true" className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
          <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
        </svg>
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
};
