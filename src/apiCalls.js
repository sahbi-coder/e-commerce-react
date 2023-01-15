import { publicRequest, userRequest, initilaRequest } from "./requestMethods";

const getProductsApiCall = async (ctg, division) => {
  return await publicRequest.get(
    ctg ? `/products/?category=${ctg}&division=${division}` : "/products"
  );
};
const removeFromDbCart = async (id, user) => {
  let res = await userRequest.get("/carts/find/" + user.currentUser._id);
  const temp = res.data.products.reduce((pre, acc) => {
    if (acc._id === id) {
      return pre;
    }
    pre.push(acc);
    return pre;
  }, []);
  const res1 = await userRequest.put("/carts/" + res.data._id, {
    ...res.data,
    products: temp,
  });

  return res1;
};
const clearDbCart = async (user) => {
  const res = await userRequest.get("/carts/find/" + user.currentUser._id);
  const res1 = await userRequest.put("/carts/" + res.data._id, {
    ...res.data,
    products: [],
  });
  return res1;
};
const addToAmountDb = async (id, user) => {
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
  return res;
};
const removeAmounfromDb = async (id, user) => {
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
  return res;
};
const login = async (email, password) => {
  return await publicRequest.post("/auth/login", {
    email,
    password,
  });
};
const handleCart = async (product, user, amount, size, color) => {
  const productToAdd = {
    productId: product._id,
    amount,
    size,
    color,
    price: product.price,
    img: product.img,
  };

  const res = await userRequest.get("/carts/find/" + user.currentUser._id);

  const userId = res.data._id;
  return await userRequest.put("/carts/" + userId, {
    products: [...res.data.products, productToAdd],
  });
};
async function getProduct(id) {
  return await publicRequest.get(`/products/find/${id}`);
}

const createAcount = async (state) => {
  return await publicRequest.post("/auth/register", {
    name: `${state.name} ${state.lastName}`,
    email: state.email,
    password: state.password,
  });
};
const removeFromDbList = async (id, user) => {
  let res = await userRequest.get("/wishlists/find/" + user.currentUser._id);

  const temp = res.data.products.reduce((pre, acc) => {
    if (acc._id === id) {
      return pre;
    }
    pre.push(acc);
    return pre;
  }, []);
  return await userRequest.put("/wishlists/" + res.data._id, {
    ...res.data,
    products: temp,
  });
};
const addToWhishlistDb = async (user, item) => {
  const res = await userRequest.get("/wishlists/find/" + user.currentUser._id);
  const products = res.data.products;
  const isInList = products.reduce((pre, acc) => {
    if (acc._id === item._id) {
      return true;
    }
    return pre;
  }, false);
  if (!isInList) {
    const r = await userRequest.put("/wishlists/" + res.data._id, {
      products: [...products, item],
    });

    return r;
  }
};
const getCardDb = async (userId) => {
  const res = await userRequest.get("/carts/find/" + userId);
  return res;
};
const getWishlist = async (userId) => {
  return await userRequest.get("/wishlists/find/" + userId);
};
const getOrders = async (userId) => {
  return await userRequest.get("/orders/find/" + userId);
};
const getCardDbAfterLogin = async (userId, token) => {
  const requestMethod = initilaRequest(token);
  return await requestMethod.get("/carts/find/" + userId);
};
const getWishlistAfterLogin = async (userId, token) => {
  const requestMethod = initilaRequest(token);
  return await requestMethod.get("/wishlists/find/" + userId);
};
const getOrdersAfterLogin = async (userId, token) => {
  const requestMethod = initilaRequest(token);
  return await requestMethod.get("/orders/find/" + userId);
};
const postOrder = async (order, id) => {
  return await userRequest.put("/orders/" + id, order);
};
const postContact = async (contact) => {
  return publicRequest.post("/contact", contact);
};
const createLink = async (email) => {
  return await publicRequest.post("/auth/forgot-password", { email });
};
const resetPassword = async (id,token,password) => {
  return await publicRequest.post(`/auth/forgot-password/${id}/${token}`, {
    id,
    token,
    password,
  });
};

export {
  getProductsApiCall,
  removeFromDbCart,
  clearDbCart,
  addToAmountDb,
  removeAmounfromDb,
  login,
  handleCart,
  getProduct,
  createAcount,
  removeFromDbList,
  addToWhishlistDb,
  getCardDb,
  postOrder,
  getWishlist,
  getOrders,
  getOrdersAfterLogin,
  getWishlistAfterLogin,
  getCardDbAfterLogin,
  postContact,
  createLink,
  resetPassword
};
