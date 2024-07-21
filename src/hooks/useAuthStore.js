import { useDispatch, useSelector } from "react-redux";
import tecnoShopApi from "../api/tecno-shop.api";
import {
  clearErrorMessage,
  onChangeRole,
  onChecking,
  onDeleteUser,
  onGetUsers,
  onLogin,
  onLogout,
} from "../store/auth/authSlice";

const getCookie = () => {
  const value = `${document.cookie}`;
  if (value) {
    return true;
  }
  return false;
};

export const useAuthStore = () => {
  const dispatch = useDispatch();
  const { status, user, errorMessage, users } = useSelector((state) => state.auth);

  const startLogin = async ({ email, password }) => {
    dispatch(onChecking());
    try {
      const {
        data: { userEntity },
      } = await tecnoShopApi.post("/users/login", { email, password });

      dispatch(
        onLogin({
          name: `${userEntity.first_name} ${userEntity.last_name}`,
          validate: userEntity.validateEmail,
          role: userEntity.role,
          id: userEntity.id,
        })
      );
    } catch (error) {
      console.log(error);
      dispatch(onLogout("Invalid Credentials"));

      setTimeout(() => {
        dispatch(clearErrorMessage());
      }, 10);
    }
  };

  const startRegister = async ({
    first_name,
    last_name,
    email,
    age,
    password,
  }) => {
    try {
      const data = await tecnoShopApi.post("/users/register", {
        first_name,
        last_name,
        email,
        age,
        password,
      });
      console.log(data);
    } catch (error) {
      console.log(error);
      dispatch(onLogout(error.response.data.error || "--"));

      setTimeout(() => {
        dispatch(clearErrorMessage());
      }, 10);
    }
  };
  const getUsers = async () => {
    try {
      const {data} = await tecnoShopApi.get('/users/get-users')
      dispatch(onGetUsers(data))
    } catch (error) {
      console.log(error);
    }
  }

  const deleteUser = async ()=>{

    try {
      const {data} = await tecnoShopApi.delete(`/users/delete-users`)
      dispatch(onDeleteUser(data))
    } catch (error) {
      console.log(error);
    }
  }

  const changeRole = async (uid) =>{
    try {
      const {data:{id}} = await tecnoShopApi.put(`/users/change-role/${uid}`)
      dispatch(onChangeRole(id))
    } catch (error) {
      console.log(error);
    }
  }

  const checkToken = async () => {
    const token = getCookie("token");
    // eslint-disable-next-line no-extra-boolean-cast
    if (!token) {
      dispatch(onLogout());
      return;
    }
    try {
      const { data } = await tecnoShopApi.get("users/renew-token");
      if (data.ok === false) {
        startLogout();
        dispatch(onLogout());
        return;
      }
      const { userEntity } = data;
      dispatch(
        onLogin({
          name: `${userEntity.first_name} ${userEntity.last_name}`,
          validate: userEntity.validateEmail,
          role: userEntity.role,
          id: userEntity.id,
        })
      );
    } catch (error) {
      console.log(error);
      startLogout();
      dispatch(onLogout());
    }
  };

  const startLogout = async () => {
    try {
      await tecnoShopApi.post("users/logout");
      dispatch(onLogout());
    } catch (error) {
      console.log(error);
      dispatch(onLogout());
    }
  };

  return {
    startLogin,
    startRegister,
    status,
    user,
    errorMessage,
    deleteUser,
    checkToken,
    startLogout,
    getUsers,
    changeRole,
    users
  };
};


