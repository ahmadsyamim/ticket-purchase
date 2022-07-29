import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import productReducer from '../features/product/productSlice';
import orderReducer from '../features/order/orderSlice';

export const store = configureStore({
  reducer: {
    product: productReducer,
    order: orderReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
