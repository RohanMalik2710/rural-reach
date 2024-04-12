import { createSlice } from '@reduxjs/toolkit';

const initialState = JSON.parse(localStorage.getItem('cart')) ?? [];

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart(state, action) {
            const itemToAdd = action.payload;
            const existingItem = state.find(item => item.id === itemToAdd.id);
            if (existingItem) {
                existingItem.quantity += 1; // Increase quantity if item already exists
            } else {
                state.push({ ...itemToAdd, quantity: 1 }); // Add new item with quantity 1
            }
        },
        deleteFromCart(state, action) {
            const itemId = action.payload.id;
            const existingItem = state.find(item => item.id === itemId);
            if (existingItem) {
                if (existingItem.quantity > 1) {
                    existingItem.quantity -= 1; // Decrease quantity by 1 if greater than 1
                } else {
                    return state.filter(item => item.id !== itemId); // Remove item if quantity becomes zero
                }
            }
        }
    }
});

export const { addToCart, deleteFromCart } = cartSlice.actions;

export default cartSlice.reducer;
