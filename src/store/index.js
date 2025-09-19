import { configureStore } from '@reduxjs/toolkit';
import authSlice from './slices/authSlice';
import chatSlice from './slices/chatSlice';
import contactsSlice from './slices/contactsSlice';

export const store = configureStore({
  reducer: {
    auth: authSlice,
    chat: chatSlice,
    contacts: contactsSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST'],
      },
    }),
});