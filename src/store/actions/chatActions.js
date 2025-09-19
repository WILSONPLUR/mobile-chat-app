import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  setConversations,
  addConversation,
  addMessage,
  setMessages,
  setChatLoading,
  setChatError,
} from '../slices/chatSlice';

// Async thunk for fetching conversations
export const fetchConversations = createAsyncThunk(
  'chat/fetchConversations',
  async (_, { dispatch, rejectWithValue }) => {
    try {
      dispatch(setChatLoading(true));
      
      // Replace this with your actual API call
      const response = await fetch('/api/conversations');
      
      if (!response.ok) {
        throw new Error('Failed to fetch conversations');
      }
      
      const conversations = await response.json();
      dispatch(setConversations(conversations));
      dispatch(setChatLoading(false));
      return conversations;
    } catch (error) {
      const errorMessage = error.message || 'Failed to fetch conversations';
      dispatch(setChatError(errorMessage));
      dispatch(setChatLoading(false));
      return rejectWithValue(errorMessage);
    }
  }
);

// Async thunk for fetching messages
export const fetchMessages = createAsyncThunk(
  'chat/fetchMessages',
  async (conversationId, { dispatch, rejectWithValue }) => {
    try {
      dispatch(setChatLoading(true));
      
      // Replace this with your actual API call
      const response = await fetch(`/api/conversations/${conversationId}/messages`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch messages');
      }
      
      const messages = await response.json();
      dispatch(setMessages({ conversationId, messages }));
      dispatch(setChatLoading(false));
      return messages;
    } catch (error) {
      const errorMessage = error.message || 'Failed to fetch messages';
      dispatch(setChatError(errorMessage));
      dispatch(setChatLoading(false));
      return rejectWithValue(errorMessage);
    }
  }
);

// Async thunk for sending a message
export const sendMessage = createAsyncThunk(
  'chat/sendMessage',
  async ({ conversationId, messageText, messageType = 'text' }, { dispatch, rejectWithValue }) => {
    try {
      // Replace this with your actual API call
      const response = await fetch(`/api/conversations/${conversationId}/messages`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text: messageText,
          type: messageType,
          timestamp: new Date().toISOString(),
        }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to send message');
      }
      
      const newMessage = await response.json();
      dispatch(addMessage({ conversationId, message: newMessage }));
      return newMessage;
    } catch (error) {
      const errorMessage = error.message || 'Failed to send message';
      dispatch(setChatError(errorMessage));
      return rejectWithValue(errorMessage);
    }
  }
);

// Async thunk for creating a new conversation
export const createConversation = createAsyncThunk(
  'chat/createConversation',
  async ({ participantIds, conversationName }, { dispatch, rejectWithValue }) => {
    try {
      // Replace this with your actual API call
      const response = await fetch('/api/conversations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          participants: participantIds,
          name: conversationName,
        }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to create conversation');
      }
      
      const newConversation = await response.json();
      dispatch(addConversation(newConversation));
      return newConversation;
    } catch (error) {
      const errorMessage = error.message || 'Failed to create conversation';
      dispatch(setChatError(errorMessage));
      return rejectWithValue(errorMessage);
    }
  }
);
