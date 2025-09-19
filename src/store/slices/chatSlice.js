import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  conversations: [],
  currentConversation: null,
  messages: {},
  isLoading: false,
  error: null,
  typingUsers: [],
};

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    setConversations: (state, action) => {
      state.conversations = action.payload;
    },
    addConversation: (state, action) => {
      state.conversations.push(action.payload);
    },
    updateConversation: (state, action) => {
      const index = state.conversations.findIndex(
        conv => conv.id === action.payload.id
      );
      if (index !== -1) {
        state.conversations[index] = { ...state.conversations[index], ...action.payload };
      }
    },
    setCurrentConversation: (state, action) => {
      state.currentConversation = action.payload;
    },
    addMessage: (state, action) => {
      const { conversationId, message } = action.payload;
      if (!state.messages[conversationId]) {
        state.messages[conversationId] = [];
      }
      state.messages[conversationId].push(message);
    },
    setMessages: (state, action) => {
      const { conversationId, messages } = action.payload;
      state.messages[conversationId] = messages;
    },
    updateMessage: (state, action) => {
      const { conversationId, messageId, updates } = action.payload;
      const messages = state.messages[conversationId];
      if (messages) {
        const messageIndex = messages.findIndex(msg => msg.id === messageId);
        if (messageIndex !== -1) {
          messages[messageIndex] = { ...messages[messageIndex], ...updates };
        }
      }
    },
    setTypingUsers: (state, action) => {
      state.typingUsers = action.payload;
    },
    addTypingUser: (state, action) => {
      if (!state.typingUsers.includes(action.payload)) {
        state.typingUsers.push(action.payload);
      }
    },
    removeTypingUser: (state, action) => {
      state.typingUsers = state.typingUsers.filter(userId => userId !== action.payload);
    },
    setChatLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setChatError: (state, action) => {
      state.error = action.payload;
    },
    clearChatError: (state) => {
      state.error = null;
    },
  },
});

export const {
  setConversations,
  addConversation,
  updateConversation,
  setCurrentConversation,
  addMessage,
  setMessages,
  updateMessage,
  setTypingUsers,
  addTypingUser,
  removeTypingUser,
  setChatLoading,
  setChatError,
  clearChatError,
} = chatSlice.actions;

export default chatSlice.reducer;
