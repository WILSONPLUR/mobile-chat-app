import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  setContacts,
  addContact,
  updateContact,
  removeContact,
  setContactsLoading,
  setContactsError,
} from '../slices/contactsSlice';

// Async thunk for fetching contacts
export const fetchContacts = createAsyncThunk(
  'contacts/fetchContacts',
  async (_, { dispatch, rejectWithValue }) => {
    try {
      dispatch(setContactsLoading(true));
      
      // Replace this with your actual API call
      const response = await fetch('/api/contacts');
      
      if (!response.ok) {
        throw new Error('Failed to fetch contacts');
      }
      
      const contacts = await response.json();
      dispatch(setContacts(contacts));
      dispatch(setContactsLoading(false));
      return contacts;
    } catch (error) {
      const errorMessage = error.message || 'Failed to fetch contacts';
      dispatch(setContactsError(errorMessage));
      dispatch(setContactsLoading(false));
      return rejectWithValue(errorMessage);
    }
  }
);

// Async thunk for adding a contact
export const addNewContact = createAsyncThunk(
  'contacts/addNewContact',
  async (contactData, { dispatch, rejectWithValue }) => {
    try {
      // Replace this with your actual API call
      const response = await fetch('/api/contacts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(contactData),
      });
      
      if (!response.ok) {
        throw new Error('Failed to add contact');
      }
      
      const newContact = await response.json();
      dispatch(addContact(newContact));
      return newContact;
    } catch (error) {
      const errorMessage = error.message || 'Failed to add contact';
      dispatch(setContactsError(errorMessage));
      return rejectWithValue(errorMessage);
    }
  }
);

// Async thunk for updating a contact
export const updateExistingContact = createAsyncThunk(
  'contacts/updateExistingContact',
  async ({ contactId, updates }, { dispatch, rejectWithValue }) => {
    try {
      // Replace this with your actual API call
      const response = await fetch(`/api/contacts/${contactId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updates),
      });
      
      if (!response.ok) {
        throw new Error('Failed to update contact');
      }
      
      const updatedContact = await response.json();
      dispatch(updateContact(updatedContact));
      return updatedContact;
    } catch (error) {
      const errorMessage = error.message || 'Failed to update contact';
      dispatch(setContactsError(errorMessage));
      return rejectWithValue(errorMessage);
    }
  }
);

// Async thunk for deleting a contact
export const deleteContact = createAsyncThunk(
  'contacts/deleteContact',
  async (contactId, { dispatch, rejectWithValue }) => {
    try {
      // Replace this with your actual API call
      const response = await fetch(`/api/contacts/${contactId}`, {
        method: 'DELETE',
      });
      
      if (!response.ok) {
        throw new Error('Failed to delete contact');
      }
      
      dispatch(removeContact(contactId));
      return contactId;
    } catch (error) {
      const errorMessage = error.message || 'Failed to delete contact';
      dispatch(setContactsError(errorMessage));
      return rejectWithValue(errorMessage);
    }
  }
);
