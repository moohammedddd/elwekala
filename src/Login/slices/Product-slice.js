import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// تصحيح التهجئة للدالة
export const fetchProducts = createAsyncThunk("productsSlice/fetchProducts",
    async () => {
        const res = await fetch("http://localhost:1000/products");
        const data = await res.json();
        return data;
    }
);

const productSlice = createSlice({
    initialState: {
        products: [], // تعيين الحالة الأولية ككائن يحتوي على مصفوفة للمنتجات
    },
    name: "productSlice",
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchProducts.fulfilled, (state, action) => {
            state.products = action.payload; // تحديث الحالة بدلاً من استبدالها بالكامل
        });
    }
});

export const {} = productSlice.actions;
export default productSlice.reducer;
