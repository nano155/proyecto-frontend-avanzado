import { useDispatch, useSelector } from "react-redux";
import tecnoShopApi from "../api/tecno-shop.api";
import { clearMessage, onLoading, loadProducts, onCreateProduct, onDeleteProduct, onSelectProduct, onSendError, onUpdateProduct, clearSelectedProduct } from "../store/product/productSlice";

export const useProductStore = () => {
  const dispatch = useDispatch();
  const {products, errorProductMessage, successMessage, selectedProduct, isLoading} = useSelector(state => state.product)

  const startLoadingProducts = async () => {
    dispatch(onLoading());
    try {
      const {
        data: { paginationData },
      } = await tecnoShopApi.get("/products");
      const { products } = paginationData;
      dispatch(loadProducts(products));
    } catch (error) {
      console.log(error);
      dispatch(onSendError(error.response.data.error || "--"))

      setTimeout(() => {
        dispatch(clearMessage())
      }, 10);
    }
  };
 
  const createProduct = async (product, thumbnails) => {
    const {title, description, code, price, status, stock, category} = product;
    let dato = null;
    dispatch(onLoading());
    try {
        const {data} = await tecnoShopApi.post("products", {
            title,
            description,
            code,
            price,
            status,
            stock,
            category
        });

        if(thumbnails.length > 0) {
            const formData = new FormData();

            // Asegúrate de que el campo 'thumbnails' coincida con el backend
            thumbnails.forEach((file) => {
                formData.append('thumbnails', file); // Cambiado de 'file' a 'thumbnails'
            });

            if(thumbnails.length > 1) {
                dato = await tecnoShopApi.post(`products/uploads/${data.id}`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });
            } else {
                dato = await tecnoShopApi.post(`products/upload/${data.id}`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });
            }
            return dispatch(onCreateProduct(dato.data))
          }
          
          return dispatch(onCreateProduct(data))
        
    } catch (error) {
        console.log(error);
        dispatch(onSendError(error.response.data.error || "--"));
        setTimeout(() => {
            dispatch(clearMessage());
        }, 10);
    }
};

const deleteProduct = async (pid) =>{
  dispatch(onLoading());
  try {
    const {data:{id}} = await tecnoShopApi.delete(`products/${pid}`)
    dispatch(onDeleteProduct(id))
  } catch (error) {
    console.log(error);
        dispatch(onSendError(error.response.data.error || "--"));

        setTimeout(() => {
            dispatch(clearMessage());
        }, 10);
  }

}

const selectProduct = async (id) =>{
  dispatch(onLoading())
  try {
    const {data} = await tecnoShopApi.get(`products/${id}`)
    dispatch(onSelectProduct(data))
  } catch (error) {
    console.log(error);
        dispatch(onSendError(error.response.data.error || "--"));

        setTimeout(() => {
            dispatch(clearMessage());
        }, 10);
  }
}

const startClearSelectedProduct= () =>{
  dispatch(clearSelectedProduct())
}

const startUpdateProduct = async(id, productUp, thumbnails) =>{
  dispatch(onLoading())
  let dato = null;
  try {

    const {data} = await tecnoShopApi.put(`products/${id}`, productUp)
    if(thumbnails.length > 0) {
      const formData = new FormData();

      // Asegúrate de que el campo 'thumbnails' coincida con el backend
      thumbnails.forEach((file) => {
          formData.append('thumbnails', file); // Cambiado de 'file' a 'thumbnails'
      });

      if(thumbnails.length > 1) {
          dato = await tecnoShopApi.post(`products/uploads/${data.id}`, formData, {
              headers: {
                  'Content-Type': 'multipart/form-data'
              }
          });
      } else {
          dato = await tecnoShopApi.post(`products/upload/${data.id}`, formData, {
              headers: {
                  'Content-Type': 'multipart/form-data'
              }
          });
      }
      return dispatch(onUpdateProduct(dato.data))
    }
    return dispatch(onUpdateProduct(data))
  } catch (error) {
    console.log(error);
        dispatch(onSendError(error.response.data.error || "--"));

        setTimeout(() => {
            dispatch(clearMessage());
        }, 10);
  }
}
  
  return {
    startLoadingProducts,
    createProduct,
    deleteProduct,
    products,
    errorProductMessage,
    successMessage, 
    selectProduct,
    selectedProduct,
    startUpdateProduct,
    isLoading,
    startClearSelectedProduct

  };
      
    }


