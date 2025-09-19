// Chat selectors
export const selectChat = (state) => state.chat;
export const selectConversations = (state) => state.chat.conversations;
export const selectCurrentConversation = (state) => state.chat.currentConversation;
export const selectMessages = (state) => state.chat.messages;
export const selectTypingUsers = (state) => state.chat.typingUsers;
export const selectChatLoading = (state) => state.chat.isLoading;
export const selectChatError = (state) => state.chat.error;

// Derived selectors
export const selectCurrentConversationMessages = (state) => {
  const currentConversation = selectCurrentConversation(state);
  const messages = selectMessages(state);
  return currentConversation ? messages[currentConversation.id] || [] : [];
};

export const selectConversationById = (conversationId) => (state) => {
  return selectConversations(state).find(conv => conv.id === conversationId);
};

export const selectMessagesByConversationId = (conversationId) => (state) => {
  const messages = selectMessages(state);
  return messages[conversationId] || [];
};
