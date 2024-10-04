import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const API_URL = "http://localhost:1000/cart";

export const fetchCart = createAsyncThunk("cart/fetchCart", async () => {
  const response = await fetch(API_URL);
  const data = await response.json();
  return data;
});

export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async ({ product, quantity }) => {
    const fetchResponse = await fetch(`${API_URL}?id=${product.id}`);
    const existingProducts = await fetchResponse.json();

    if (existingProducts.length > 0) {
      const existingProduct = existingProducts[0];
      const updatedProduct = {
        ...existingProduct,
        quantity, // تحديث الكمية مباشرة
      };

      const updateResponse = await fetch(`${API_URL}/${existingProduct.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedProduct),
      });

      const data = await updateResponse.json();
      return data;
    } else {
      // إذا كان المنتج جديد ولم يكن موجودًا في السلة مسبقًا
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...product, quantity }), // تمرير جميع تفاصيل المنتج مع الكمية
      });
      const data = await response.json();
      return data;
    }
  }
);

export const removeFromCart = createAsyncThunk("cart/removeFromCart", async (id) => {
  await fetch(`${API_URL}/${id}`, {
    method: 'DELETE',
  });
  return id;
});

export const clearCart = createAsyncThunk("cart/clearCart", async (_, { getState }) => {
  const state = getState();
  const productIds = state.cart.products.map(product => product.id);
  await Promise.all(productIds.map(id => fetch(`${API_URL}/${id}`, { method: 'DELETE' })));
  return productIds;
});

export const cartSlice = createSlice({
  name: "cartSlice",
  initialState: {
    products: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.products = action.payload;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        const findData = state.products.find((product) => product.id === action.payload.id);
        if (findData) {
          findData.quantity = action.payload.quantity; // تحديث الكمية المضافة
        } else {
          state.products.push(action.payload); // إضافة المنتج الجديد مع الكمية
        }
      })
      .addCase(removeFromCart.fulfilled, (state, action) => {
        state.products = state.products.filter(product => product.id !== action.payload);
      })
      .addCase(clearCart.fulfilled, (state) => {
        state.products = [];
      });
  },
});

export default cartSlice.reducer;
