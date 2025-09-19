// Contacts selectors
export const selectContacts = (state) => state.contacts;
export const selectContactsList = (state) => state.contacts.contacts;
export const selectOnlineContacts = (state) => state.contacts.onlineContacts;
export const selectContactsLoading = (state) => state.contacts.isLoading;
export const selectContactsError = (state) => state.contacts.error;
export const selectSearchQuery = (state) => state.contacts.searchQuery;

// Derived selectors
export const selectFilteredContacts = (state) => {
  const contacts = selectContactsList(state);
  const searchQuery = selectSearchQuery(state);
  
  if (!searchQuery.trim()) {
    return contacts;
  }
  
  return contacts.filter(contact =>
    contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    contact.email?.toLowerCase().includes(searchQuery.toLowerCase())
  );
};

export const selectOnlineContactsDetails = (state) => {
  const contacts = selectContactsList(state);
  const onlineContactIds = selectOnlineContacts(state);
  
  return contacts.filter(contact => onlineContactIds.includes(contact.id));
};

export const selectContactById = (contactId) => (state) => {
  return selectContactsList(state).find(contact => contact.id === contactId);
};
