import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  contacts: [],
  onlineContacts: [],
  isLoading: false,
  error: null,
  searchQuery: '',
};

const contactsSlice = createSlice({
  name: 'contacts',
  initialState,
  reducers: {
    setContacts: (state, action) => {
      state.contacts = action.payload;
    },
    addContact: (state, action) => {
      state.contacts.push(action.payload);
    },
    updateContact: (state, action) => {
      const index = state.contacts.findIndex(
        contact => contact.id === action.payload.id
      );
      if (index !== -1) {
        state.contacts[index] = { ...state.contacts[index], ...action.payload };
      }
    },
    removeContact: (state, action) => {
      state.contacts = state.contacts.filter(
        contact => contact.id !== action.payload
      );
    },
    setOnlineContacts: (state, action) => {
      state.onlineContacts = action.payload;
    },
    updateContactOnlineStatus: (state, action) => {
      const { contactId, isOnline } = action.payload;
      
      // Update in contacts list
      const contactIndex = state.contacts.findIndex(
        contact => contact.id === contactId
      );
      if (contactIndex !== -1) {
        state.contacts[contactIndex].isOnline = isOnline;
      }
      
      // Update online contacts list
      if (isOnline && !state.onlineContacts.includes(contactId)) {
        state.onlineContacts.push(contactId);
      } else if (!isOnline) {
        state.onlineContacts = state.onlineContacts.filter(id => id !== contactId);
      }
    },
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
    setContactsLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setContactsError: (state, action) => {
      state.error = action.payload;
    },
    clearContactsError: (state) => {
      state.error = null;
    },
  },
});

export const {
  setContacts,
  addContact,
  updateContact,
  removeContact,
  setOnlineContacts,
  updateContactOnlineStatus,
  setSearchQuery,
  setContactsLoading,
  setContactsError,
  clearContactsError,
} = contactsSlice.actions;

export default contactsSlice.reducer;
