import { useDispatch, useSelector } from "react-redux";
import tecnoShopApi from "../api/tecno-shop.api";
import {
  clearCartMessage,
  loadingCart,
  loadInitialTicket,
  onAddProductToCart,
  onCreateTicket,
  onDeleteAllProducts,
  onDeleteProductToCart,
  onErrorCartMessage,
  onLoadingCart,
} from "../store/cart/cartSlice";
import { onUpdateStock, onUpdateStockForDelete } from "../store/product/productSlice";

const saveCartLocalStorage = (object, key ) => {
  localStorage.setItem(`${key}`, JSON.stringify(object));
};

export const useCartStore = () => {
  const dispatch = useDispatch();
  const { cart, errorMessageCart, successMessageCart, isLoadingCart, ticket } =
    useSelector((state) => state.cart);

  const loadCart = async (id) => {
    dispatch(onLoadingCart());
    try {
      const { data } = await tecnoShopApi.get(`carts/${id}`);
      saveCartLocalStorage(data, 'cart');
      dispatch(loadingCart(data));
    } catch (error) {
      console.log(error);
      dispatch(onErrorCartMessage(error.response.data.error || "--"));
      setTimeout(() => {
        dispatch(clearCartMessage());
      }, 10);
    }
  };
  const loadTickets = async (id) =>{
    dispatch(onLoadingCart())
    try {
      const {data} = await tecnoShopApi.get(`carts/tickets/${id}`)
      saveCartLocalStorage(data, 'ticket');
      dispatch(loadInitialTicket(data));
    } catch (error) {
      console.log(error);
    }
  }
  const addProduct = async (cid, pid, quantity) => {
    dispatch(onLoadingCart());
    try {
      if (quantity) {
        const { data } = await tecnoShopApi.put(
          `carts/${cid}/products/${pid}`,
          { quantity }
        );
        saveCartLocalStorage(data, 'cart');
        dispatch(
          onUpdateStock({
            id:pid,
            quantity,
          })
        );
        dispatch(onAddProductToCart(data));
        return setTimeout(() => {
          dispatch(clearCartMessage());
        }, 30);
      }
      const { data } = await tecnoShopApi.post(`carts/${cid}/products/${pid}`);
      saveCartLocalStorage(data, 'cart');
      dispatch(
        onUpdateStock({
            id:pid,
          quantity: 1,
        })
      );
      console.log(data);
      dispatch(onAddProductToCart(data));
      return setTimeout(() => {
        dispatch(clearCartMessage());
      }, 30);
    } catch (error) {
      console.log(error);
      dispatch(onErrorCartMessage(error.response.data.error || "--"));
      setTimeout(() => {
        dispatch(clearCartMessage());
      }, 10);
    }
  };
  const startDeletedProductToCart = async (cid, pid, quantity) =>{
    dispatch(onLoadingCart())
    try {
        const {data} = await tecnoShopApi.delete(`carts/${cid}/products/${pid}`)
        saveCartLocalStorage(data, 'cart');
        dispatch (onUpdateStockForDelete({
            id:pid,
            quantity,
          })
        );
        dispatch(onDeleteProductToCart(data))
        return setTimeout(() => {
          dispatch(clearCartMessage());
        }, 30);
    } catch (error) {
        console.log(error);
      dispatch(onErrorCartMessage(error.response.data.error || "--"));
      setTimeout(() => {
        dispatch(clearCartMessage());
      }, 10);
    }
  }

  const startCreateTicket = async (cid) =>{
    dispatch(onLoadingCart())
    let ticket = []
    try {
      const {data} = await tecnoShopApi.post(`carts/${cid}/purchase`)
      ticket.push(data)
      saveCartLocalStorage(ticket, 'ticket');
      dispatch(onCreateTicket(data))
      await tecnoShopApi.delete(`carts/${cid}`)
      dispatch(onDeleteAllProducts())
      localStorage.removeItem('cart')
      return setTimeout(() => {
        dispatch(clearCartMessage());
      }, 30);
    } catch (error) {
      console.log(error);
      dispatch(onErrorCartMessage(error.response.data.error || "--"));
      setTimeout(() => {
        dispatch(clearCartMessage());
      }, 10);
    }
  }

  return {
    loadCart,
    errorMessageCart,
    successMessageCart,
    cart,
    addProduct,
    isLoadingCart,
    startDeletedProductToCart,
    startCreateTicket,
    loadTickets,
    ticket
  };
};
