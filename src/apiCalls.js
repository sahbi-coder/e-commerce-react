import { publicRequest, userRequest } from "./requestMethods";

const getProductsApiCall = async (ctg, division) => {
  try {
    const res = await publicRequest.get(
      ctg ? `/products/?category=${ctg}&division=${division}` : "/products"
    );
    return res.data;
  } catch (e) {}
};
const removeFromDbCart = async (id, user) => {
  if (user.currentUser) {
    try {
      let res = await userRequest.get("/carts/find/" + user.currentUser._id);
      const temp = res.data.products.reduce((pre, acc) => {
        if (acc._id === id) {
          return pre;
        }
        pre.push(acc);
        return pre;
      }, []);
      const r = await userRequest.put("/carts/" + res.data._id, {
        ...res.data,
        products: temp,
      });

      return r.request.status;
    } catch {}
  }
};
const clearDbCart = async (user) => {
  if (user.currentUser) {
    try {
      const res = await userRequest.get("/carts/find/" + user.currentUser._id);

      const r = await userRequest.put("/carts/" + res.data._id, {
        ...res.data,
        products: [],
      });
      return r.request.status;
    } catch {}
  }
};
const addToAmountDb = async (id, user) => {
  try {
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
    return res.request.status;
  } catch (e) {}
};
const removeAmounfromDb = async (id, user) => {
  try {
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
    return res.request.status;
  } catch (e) {}
};
const login = async (email, password) => {
  
  
    return await publicRequest.post("/auth/login", {
      email,
      password,
    });
    
 
};
const handleCart = async (product, user, amount, size, color) => {
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

      return {
        ...productToAdd,
        _id: ress.data.products[ress.data.products.length - 1]._id,
      };
    } catch (e) {
      return;
    }
  }
  return;
};
async function getProduct(id) {
  return await publicRequest.get(`/products/find/${id}`);
  
}

const createAcount = async (state) => {
  Object.values(state).forEach((input) => {
    return !input && alert("you must fill all inputs");
  });
  if (state.password !== state.confPassword) {
    return alert("passwords do not confirm");
  }
  try {
     await publicRequest.post("/auth/register", {
      name: `${state.name} ${state.lastName}`,
      email: state.email,
      password: state.password,
    });
  } catch (e) {
    return alert("could not register please try again or later");
  }
 

  return await publicRequest.post("/auth/login", {
    password: state.password,
    email: state.email,
  });
};
const removeFromDbList = async (id, user) => {
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
      return await userRequest.put("/wishlists/" + res.data._id, {
        ...res.data,
        products: temp,
      });
    } catch {}
  }
};
const addToWhishlistDb = async (user, item) => {
  if (user&&user.currentUser) {
    try {
      const res = await userRequest.get(
        "/wishlists/find/" + user.currentUser._id
      );
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
    } catch (e) {
      console.log(e);
    }
  }
};
const getCardDb = async (userId) => {
  return await userRequest.get("/carts/find/" + userId);
};
const getWishlist = async (userId) => {
  return await userRequest.get("/wishlists/find/" + userId);
};
const postOrder = async (order) => {
  return await userRequest.post("/orders", order);
};
const createCart = async (userId) => {
  
    const res = await publicRequest.post("/carts", {
      userId,
      products: [],
    });

    return res;
  
};
const createWishlist = async (userId) => {
  
    const res = await publicRequest.post("/wishlists", {
      userId,
      products: [],
    });

    return res;
  
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
  createCart,
  createWishlist,
  getWishlist,

};
