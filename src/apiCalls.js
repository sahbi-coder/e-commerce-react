import { publicRequest, userRequest } from "./requestMethods";
import {
  clearCart,
  removeOrder,
  start,
  success,
  failure,
  addAmount,
  removeAmount,
  addProducts,
  addProduct,
} from "./redux/cartSlice";
import { addList } from "./redux/wishlistSlice";
import {
  loginSucess,
  loginStart,
  loginFailure,
  signUpStart,
  signUpSucess,
  signUpFailure,
} from "./redux/userSlice";
import {deleteById} from './redux/wishlistSlice'
async function getProducts(ctg, division, setProducts) {
  try {
    const res = await publicRequest.get(
      ctg ? `/products/?category=${ctg}&division=${division}` : "/products"
    );
    setProducts(res.data);
  } catch (e) {
    console.log(e);
  }
}
const removeFromDbCart = async (id, user, dispatch) => {
  if (user.currentUser) {
    try {
      dispatch(start());
      let res = await userRequest.get("/carts/find/" + user.currentUser._id);
      const temp = res.data.products.reduce((pre, acc) => {
        if (acc._id === id) {
          console.log(id);
          return pre;
        }
        pre.push(acc);
        return pre;
      }, []);
      await userRequest.put("/carts/" + res.data._id, {
        ...res.data,
        products: temp,
      });
      dispatch(removeOrder(id));
      dispatch(success());
    } catch {
      dispatch(failure());
    }
  }
};
const clearDbCart = async (user, dispatch) => {
  if (user.currentUser) {
    try {
      let res = await userRequest.get("/carts/find/" + user.currentUser._id);

      await userRequest.put("/carts/" + res.data._id, {
        ...res.data,
        products: [],
      });
      dispatch(clearCart());
    } catch {}
  }
};
const addToAmountDb = async (id, user, dispatch) => {
  try {
    dispatch(start());
    const data = (await userRequest.get("/carts/find/" + user.currentUser._id))
      .data;

    const mp = data.products.reduce((pre, cur) => {
      if (cur._id === id) {
        const temp = [...pre];
        const innetTemp = { ...cur };
        innetTemp.amount += 1;
        temp.push(innetTemp);
        return temp;
      }
      const temp = [...pre];
      const innetTemp = { ...cur };

      temp.push(innetTemp);
      return temp;
    }, []);

    const res = await userRequest.put("/carts/" + data._id, {
      products: mp,
    });
    dispatch(addAmount(id));
    dispatch(success());
  } catch (e) {
    dispatch(failure());
  }
};
const removeAmounfromDb = async (id, user, dispatch) => {
  try {
    dispatch(start());
    const data = (await userRequest.get("/carts/find/" + user.currentUser._id))
      .data;

    const mp = data.products.reduce((pre, cur) => {
      if (cur._id === id && cur.amount > 1) {
        const temp = [...pre];
        const innetTemp = { ...cur };
        innetTemp.amount -= 1;
        temp.push(innetTemp);
        return temp;
      }
      const temp = [...pre];
      const innetTemp = { ...cur };

      temp.push(innetTemp);
      return temp;
    }, []);

    const res = await userRequest.put("/carts/" + data._id, {
      products: mp,
    });
    dispatch(removeAmount(id));
    dispatch(success());
  } catch (e) {
    dispatch(failure());
  }
};
const login = async (dispatch, email, password, navigate) => {
  try {
    dispatch(loginStart());
    let res1 = await publicRequest.post("/auth/login", {
      email,
      password,
    });
    const user = res1.data;
    let res2 = await userRequest.get("/carts/find/" + user._id);
    let res3 = await userRequest.get("/wishlists/find/" + user._id);
    dispatch(loginSucess(user));
    navigate("/");
    dispatch(addList(res3.data.products));
    dispatch(addProducts(res2.data.products));
  } catch (e) {
    dispatch(loginFailure());
  }
};
const handleCart = async (
  product,
  user,
  amount,
  size,
  color,
  dispatch,
  navigate
) => {
  if (user.currentUser) {
    const productToAdd = {
      productId: product._id,
      amount,
      size,
      color,
      price: product.price,
      img: product.img,
    };

    try {
      
      const res = await userRequest.get("/carts/find/" + user.currentUser._id);

      const userId = res.data._id;
      const ress = await userRequest.put("/carts/" + userId, {
        products: [...res.data.products, productToAdd],
      });

      dispatch(
        addProduct({
          ...productToAdd,
          _id: ress.data.products[ress.data.products.length - 1]._id,
        })
      );
    } catch (e) {
      console.log("error");
    }
  }

  navigate("/login");
};
async function getProduct(id, setProduct, setColor, setSize) {
  const res = await publicRequest.get(`/products/find/${id}`);
  setProduct(res.data);
  setColor(res.data.color[0]);
  setSize(res.data.size[0]);
}
const createAcount = async (e, state, navigate, reduxDiapatsh) => {
  e.preventDefault();

  Object.values(state).forEach((input) => {
    return !input && alert("you must fill all inputs");
  });
  if (state.password !== state.confPassword) {
    return alert("passwords do not confirm");
  }
  try {
    reduxDiapatsh(signUpStart());
    const res = await publicRequest.post("/auth/register", {
      name: `${state.name} ${state.lastName}`,
      email: state.email,
      password: state.password,
    });

    reduxDiapatsh(signUpSucess());
  } catch (e) {
    reduxDiapatsh(signUpFailure());
    return alert("could not register please try again");
  }
  try {
    reduxDiapatsh(loginStart());
    let ress = await publicRequest.post("/auth/login", {
      password: state.password,
      email: state.email,
    });
    const user = ress.data;
   
    reduxDiapatsh(loginSucess(user));

    await publicRequest.post("/carts", {
      userId: user._id,
      products: [],
    });
    await userRequest.post("/wishlists", {
      userId: user._id,
      products: [],
    });
    navigate("/user");
  } catch {
    reduxDiapatsh(loginFailure());
    navigate("/login");
  }
};
const removeFromDbList = async (id,user,dispatch) => {
  if (user.currentUser) {
    try {
      let res = await userRequest.get(
        "/wishlists/find/" + user.currentUser._id
      );

      const temp = res.data.products.reduce((pre, acc) => {
        if (acc._id === id) {
          return pre;
        }
        pre.push(acc);
        return pre;
      }, []);
      await userRequest.put("/wishlists/" + res.data._id, {
        ...res.data,
        products: temp,
      });
      dispatch(deleteById(id));
    } catch {}
  }
};
export {
  getProducts,
  removeFromDbCart,
  clearDbCart,
  addToAmountDb,
  removeAmounfromDb,
  login,
  handleCart,
  getProduct,
  createAcount,
  removeFromDbList
};
